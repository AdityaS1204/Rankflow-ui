#!/usr/bin/env node

import { Command } from 'commander';
import * as p from '@clack/prompts';
import color from 'picocolors';
import fetch from 'node-fetch';
import fs from 'fs-extra';
import path from 'path';

const program = new Command();
const REGISTRY_URL = process.env.REGISTRY_URL || 'https://ui.rankflow.in/registry';

type FrameworkOptions = 'next' | 'vite' | 'default';

async function isTypeScriptProject(): Promise<boolean> {
    const cwd = process.cwd();
    return await fs.pathExists(path.join(cwd, 'tsconfig.json'));
}

async function getFramework(): Promise<FrameworkOptions> {
    const cwd = process.cwd();

    if (await fs.pathExists(path.join(cwd, 'next.config.js')) || await fs.pathExists(path.join(cwd, 'next.config.mjs'))) {
        return 'next';
    }

    if (await fs.pathExists(path.join(cwd, 'vite.config.js')) || await fs.pathExists(path.join(cwd, 'vite.config.ts'))) {
        return 'vite';
    }

    return 'default';
}

async function getTargetPath(framework: FrameworkOptions, type: string): Promise<string> {
    const cwd = process.cwd();
    
    // Default paths based on component type
    if (type === 'components:lib') {
        const paths: Record<FrameworkOptions, string> = {
            next: path.join(cwd, 'lib'),
            vite: path.join(cwd, 'src', 'lib'),
            default: path.join(cwd, 'lib')
        };
        return paths[framework] || paths.default;
    }

    const paths: Record<FrameworkOptions, string> = {
        next: path.join(cwd, 'components', 'ui'),
        vite: path.join(cwd, 'src', 'components', 'ui'),
        default: path.join(cwd, 'components', 'ui')
    };

    return paths[framework] || paths.default;
}

program
    .name('rankflow-ui')
    .description('CLI to add components to your project')
    .version('0.1.0');

program
    .command('list')
    .description('List all available components')
    .action(async () => {
        p.intro(`${color.bgCyan(color.black(' rankflow-ui '))}`);

        const s = p.spinner();
        s.start('Fetching registry...');

        try {
            const response = await fetch(`${REGISTRY_URL}/index.json`);
            if (!response.ok) throw new Error(`Failed to fetch registry index: ${response.status} ${response.statusText}`);

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                throw new Error(`Registry returned non-JSON response (${contentType}). Make sure ${REGISTRY_URL} is correct and accessible.`);
            }

            const registry = await response.json() as Array<{ name: string; title: string; description: string }>;
            s.stop('Registry fetched');

            const options = registry.map(item => ({
                value: item.name,
                label: item.title,
                hint: item.description
            }));

            p.log.info('Available components:');
            options.forEach(opt => {
                p.log.message(`${color.cyan(opt.label)}: ${color.dim(opt.hint)}`);
            });

            p.outro(`Run ${color.green('npx rankflow-ui add <component>')} to install one.`);
        } catch (err: any) {
            s.stop('Failed to fetch registry', 1);
            p.log.error(err.message);
            process.exit(1);
        }
    });

program
    .command('add')
    .description('Add a component to your project')
    .argument('<component>', 'Component name to add')
    .action(async (componentName: string) => {
        p.intro(`${color.bgCyan(color.black(' rankflow-ui '))}`);

        const framework = await getFramework();
        const isTS = await isTypeScriptProject();
        const installed = new Set<string>();
        const npmDependencies = new Set<string>();

        // Tracks where each component was installed to resolve imports
        const componentPaths = new Map<string, string>();

        async function fetchAndInstall(name: string) {
            if (installed.has(name)) return;
            
            const response = await fetch(`${REGISTRY_URL}/${name}.json`);
            if (!response.ok) {
                if (response.status === 404) throw new Error(`Component "${name}" not found in registry.`);
                throw new Error(`Failed to fetch component: ${response.status} ${response.statusText}`);
            }

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error(`Registry returned non-JSON response for ${name}.`);
            }

            const data = await response.json() as { 
                name: string; 
                type: string; 
                files: Array<{ path: string; content: string }>; 
                dependencies?: string[]; 
                registryDependencies?: string[] 
            };

            // Recursively install registry dependencies first
            if (data.registryDependencies) {
                for (const dep of data.registryDependencies) {
                    await fetchAndInstall(dep);
                }
            }

            const targetDir = await getTargetPath(framework, data.type);
            await fs.ensureDir(targetDir);

            for (const file of data.files) {
                let fileName = path.basename(file.path);
                
                // If it's a JS project, but the registry has .tsx/.ts, rename to .jsx/.js
                if (!isTS) {
                    if (fileName.endsWith('.tsx')) fileName = fileName.replace('.tsx', '.jsx');
                    else if (fileName.endsWith('.ts')) fileName = fileName.replace('.ts', '.js');
                }

                const destination = path.join(targetDir, fileName);
                
                // Fix imports: Specifically handle @/lib/utils -> relative path
                // This is a simple heuristic: if it's a lib component, we know its path
                let content = file.content;
                
                // If this is a UI component depending on utils, fix the import
                if (data.registryDependencies?.includes('utils')) {
                    const libDir = await getTargetPath(framework, 'components:lib');
                    const relativePathToLib = path.relative(targetDir, libDir).replace(/\\/g, '/');
                    const importPath = relativePathToLib.startsWith('.') ? relativePathToLib : `./${relativePathToLib}`;
                    
                    // Replace @/lib/utils or @/lib/ with the relative path
                    content = content.replace(/@\/lib\//g, `${importPath}/`);
                }

                await fs.writeFile(destination, content);
                p.log.success(`Created ${color.dim(path.relative(process.cwd(), destination))}`);
                
                if (data.type === 'components:lib') {
                    componentPaths.set(data.name, targetDir);
                }
            }

            if (data.dependencies) {
                data.dependencies.forEach(d => npmDependencies.add(d));
            }

            installed.add(name);
        }

        const s = p.spinner();
        s.start(`Adding ${componentName}...`);

        try {
            await fetchAndInstall(componentName);
            s.stop(`Installation complete for ${color.cyan(componentName)}.`);

            if (npmDependencies.size > 0) {
                const deps = Array.from(npmDependencies).join(' ');
                p.log.warn(`Next steps: Install required dependencies:`);
                p.log.message(`${color.green(`npm install ${deps}`)}`);
            }

            p.outro(`${color.bgGreen(color.black(' DONE '))} Enjoy your new component!`);
        } catch (err: any) {
            s.stop('Installation failed', 1);
            p.log.error(err.message);
            process.exit(1);
        }
    });

program.parse();

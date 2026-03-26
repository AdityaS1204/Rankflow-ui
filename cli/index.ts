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

async function getComponentsPath(framework: FrameworkOptions): Promise<string> {
    const cwd = process.cwd();

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
        const targetDir = await getComponentsPath(framework);

        const s = p.spinner();
        s.start(`Adding ${componentName}...`);

        try {
            const response = await fetch(`${REGISTRY_URL}/${componentName}.json`);
            if (!response.ok) {
                if (response.status === 404) throw new Error(`Component "${componentName}" not found in registry.`);
                throw new Error(`Failed to fetch component: ${response.status} ${response.statusText}`);
            }

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                throw new Error(`Registry returned non-JSON response for ${componentName}. This usually happens when the registry URL is incorrect or the server is returning an error page.`);
            }

            const componentData = await response.json() as { files: Array<{ path: string; content: string }>; dependencies?: string[] };
            s.stop(`Fetched ${componentName} source`);

            // Ensure target directory exists
            await fs.ensureDir(targetDir);

            for (const file of componentData.files) { 
                // Typically the registry stores it as "components/ui/Name.jsx"
                const fileName = path.basename(file.path);
                const destination = path.join(targetDir, fileName);

                await fs.writeFile(destination, file.content);
                p.log.success(`Created ${color.dim(fileName)}`);
            }

            p.log.info(`Installation complete for ${color.cyan(componentName)}.`);

            if (componentData.dependencies && componentData.dependencies.length > 0) {
                p.log.warn(`Next steps: Install required dependencies:`);
                p.log.message(`${color.green(`npm install ${componentData.dependencies.join(' ')}`)}`);
            }

            p.outro(`${color.bgGreen(color.black(' DONE '))} Enjoy your new component!`);
        } catch (err: any) {
            s.stop('Installation failed', 1);
            p.log.error(err.message);
            process.exit(1);
        }
    });

program.parse();

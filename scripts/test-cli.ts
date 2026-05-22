import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEST_DIR = path.join(__dirname, '../test-sandbox');
const CLI_DIR = path.join(__dirname, '../cli');

async function runTest() {
    console.log('🧪 Starting CLI Test Workflow...');

    // 1. Prepare Sandbox
    if (fs.existsSync(TEST_DIR)) {
        fs.rmSync(TEST_DIR, { recursive: true });
    }
    fs.mkdirSync(TEST_DIR, { recursive: true });
    
    // Create a dummy tsconfig to simulate TS project
    fs.writeFileSync(path.join(TEST_DIR, 'tsconfig.json'), '{}');
    
    // Create a dummy next.config.js
    fs.writeFileSync(path.join(TEST_DIR, 'next.config.js'), 'module.exports = {}');

    console.log('📦 Sandbox prepared at', TEST_DIR);

    // 2. Build CLI
    console.log('🔨 Building CLI...');
    execSync('npm run build', { cwd: CLI_DIR, stdio: 'inherit' });

    // 3. Run CLI Add using the path to the CLI's executable
    console.log('🚀 Running CLI add animated-border...');
    const cliPath = path.join(CLI_DIR, 'dist/index.js');
    
    try {
        // Point REGISTRY_URL to production
        execSync(`node "${cliPath}" add animated-border`, { 
            cwd: TEST_DIR, 
            stdio: 'inherit',
            env: { ...process.env, REGISTRY_URL: 'https://ui.rankflow.in/registry' }
        });

        console.log('✅ CLI command executed successfully.');

        // 4. Verify Files
        const componentPath = path.join(TEST_DIR, 'components/ui/animated-border.tsx');
        const utilsPath = path.join(TEST_DIR, 'lib/utils.ts');

        if (fs.existsSync(componentPath)) {
            console.log('📄 Component created at', componentPath);
            const content = fs.readFileSync(componentPath, 'utf8');
            // Find the line that imports cn
            const lines = content.split('\n');
            const importLine = lines.find(l => l.includes('import { cn } from'));
            
            if (importLine && importLine.includes('../../lib/utils')) {
                console.log('🔗 Import path correctly resolved to relative path:', importLine.trim());
            } else {
                console.warn('⚠️  Import path was not resolved or import not found. Content:', importLine);
            }
        } else {
            console.error('❌ Component file missing!');
        }

        if (fs.existsSync(utilsPath)) {
            console.log('📄 Utils created at', utilsPath);
        } else {
            console.error('❌ Utils file missing!');
        }

    } catch (err) {
        console.error('❌ Test failed:', err);
    }

    console.log('\n✨ Test workflow complete. Check the "test-sandbox" folder for results.');
}

runTest();

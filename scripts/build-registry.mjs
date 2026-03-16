import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { registry } from '../registry/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REGISTRY_PATH = path.join(__dirname, '../public/registry');

// Create registry output directory if it doesn't exist
if (!fs.existsSync(REGISTRY_PATH)) {
    fs.mkdirSync(REGISTRY_PATH, { recursive: true });
}

async function buildRegistry() {
    console.log('🚀 Building registry...');

    const fullRegistry = [];

    for (const item of registry) {
        const componentData = {
            ...item,
            files: [],
        };

        for (const filePath of item.files) {
            const fullPath = path.join(__dirname, '..', filePath);

            if (fs.existsSync(fullPath)) {
                const content = fs.readFileSync(fullPath, 'utf8');
                const fileName = path.basename(filePath);
                componentData.files.push({
                    path: `components/ui/${fileName}`,
                    content,
                });
            } else {
                console.warn(`⚠️  Warning: File not found at ${fullPath}`);
            }
        }

        // Write individual component JSON
        const outputPath = path.join(REGISTRY_PATH, `${item.name}.json`);
        fs.writeFileSync(outputPath, JSON.stringify(componentData, null, 2));

        // Add lightweight entry to the index (no file contents)
        fullRegistry.push({
            name: item.name,
            title: item.title,
            description: item.description,
            dependencies: item.dependencies,
            tags: item.tags,
        });

        console.log(`✅ Built ${item.name}`);
    }

    // Write index.json
    fs.writeFileSync(
        path.join(REGISTRY_PATH, 'index.json'),
        JSON.stringify(fullRegistry, null, 2)
    );

    console.log('✨ Registry build complete!');
}

buildRegistry().catch((err) => {
    console.error('❌ Registry build failed:', err);
    process.exit(1);
});

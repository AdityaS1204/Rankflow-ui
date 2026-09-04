import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import crypto from 'crypto';
import { registry } from '../../registry/index';

// Safety Guarded Directory Cleanup
async function safeCleanup(targetDir: string) {
  if (
    targetDir &&
    typeof targetDir === 'string' &&
    path.basename(targetDir).startsWith('rankflow-test-sandbox-') &&
    targetDir !== os.tmpdir() &&
    targetDir.length > 15
  ) {
    if (await fs.pathExists(targetDir)) {
      await fs.remove(targetDir);
    }
  }
}

describe('CLI Component Installation (Safe Sandbox)', () => {
  let sandboxDir: string;

  beforeEach(async () => {
    // 1. Create uniquely isolated sandbox directory in OS temp
    const uniqueId = crypto.randomBytes(6).toString('hex');
    sandboxDir = path.join(os.tmpdir(), `rankflow-test-sandbox-${uniqueId}`);
    await fs.ensureDir(sandboxDir);

    // 2. Setup a lightweight Next.js skeleton (< 10 KB, 0 node_modules)
    await fs.writeJson(path.join(sandboxDir, 'package.json'), {
      name: 'test-sandbox-app',
      version: '0.1.0',
      dependencies: {
        react: '^19.0.0',
        'react-dom': '^19.0.0',
      },
    });

    await fs.writeJson(path.join(sandboxDir, 'tsconfig.json'), {
      compilerOptions: {
        baseUrl: '.',
        paths: {
          '@/*': ['./*'],
        },
      },
    });

    await fs.writeFile(
      path.join(sandboxDir, 'next.config.mjs'),
      'export default {};\n'
    );
  });

  afterEach(async () => {
    // 3. Guaranteed safe cleanup of only this isolated sandbox
    await safeCleanup(sandboxDir);
  });

  it('installs a registry component and its target files into the correct directory', async () => {
    // Pick the spotlight-card or animated-border component
    const componentToInstall = registry.find((c) => c.name === 'spotlight-card') || registry[0];
    expect(componentToInstall).toBeDefined();

    const rootDir = path.resolve(__dirname, '../../');

    // Simulate CLI installation writing component to components/ui/
    const targetDir = path.join(sandboxDir, 'components', 'ui');
    await fs.ensureDir(targetDir);

    for (const filePath of componentToInstall.files) {
      const sourcePath = path.join(rootDir, filePath);
      const fileName = path.basename(filePath);
      const destPath = path.join(targetDir, fileName);

      const content = await fs.readFile(sourcePath, 'utf8');
      await fs.writeFile(destPath, content, 'utf8');

      // Verify file written
      expect(await fs.pathExists(destPath)).toBe(true);

      const writtenContent = await fs.readFile(destPath, 'utf8');
      expect(writtenContent).toBe(content);
      expect(writtenContent.length).toBeGreaterThan(0);
    }
  });

  it('creates lib/utils.ts when utils dependency is added', async () => {
    const utilsEntry = registry.find((c) => c.name === 'utils');
    expect(utilsEntry).toBeDefined();

    const rootDir = path.resolve(__dirname, '../../');
    const libDir = path.join(sandboxDir, 'lib');
    await fs.ensureDir(libDir);

    const sourcePath = path.join(rootDir, utilsEntry!.files[0]);
    const destPath = path.join(libDir, 'utils.ts');

    const content = await fs.readFile(sourcePath, 'utf8');
    await fs.writeFile(destPath, content, 'utf8');

    expect(await fs.pathExists(destPath)).toBe(true);
    const writtenContent = await fs.readFile(destPath, 'utf8');
    expect(writtenContent).toContain('clsx');
    expect(writtenContent).toContain('twMerge');
  });

  it('verifies safe cleanup leaves no orphaned test directories', async () => {
    const checkDir = sandboxDir;
    expect(await fs.pathExists(checkDir)).toBe(true);
    await safeCleanup(checkDir);
    expect(await fs.pathExists(checkDir)).toBe(false);
  });
});

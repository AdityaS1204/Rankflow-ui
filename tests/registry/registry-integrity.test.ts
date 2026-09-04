import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { registry } from '../../registry/index';

describe('Registry Integrity & Schema Tests', () => {
  it('should have a non-empty registry', () => {
    expect(registry).toBeDefined();
    expect(Array.isArray(registry)).toBe(true);
    expect(registry.length).toBeGreaterThan(0);
  });

  it('should ensure all components have required metadata', () => {
    const names = new Set<string>();

    for (const item of registry) {
      expect(item.name, `Item missing name: ${JSON.stringify(item)}`).toBeTruthy();
      expect(typeof item.name).toBe('string');
      expect(item.name).toMatch(/^[a-z0-9-]+$/); // kebab-case

      // Check unique names
      expect(names.has(item.name), `Duplicate component name found: "${item.name}"`).toBe(false);
      names.add(item.name);

      expect(item.title, `Item "${item.name}" missing title`).toBeTruthy();
      expect(item.description, `Item "${item.name}" missing description`).toBeTruthy();
      expect(Array.isArray(item.files), `Item "${item.name}" missing files array`).toBe(true);
      expect(item.files.length, `Item "${item.name}" has empty files list`).toBeGreaterThan(0);
    }
  });

  it('should ensure all referenced source files exist on disk', () => {
    const rootDir = path.resolve(__dirname, '../../');
    const missingFiles: { component: string; file: string }[] = [];

    for (const item of registry) {
      for (const filePath of item.files) {
        const fullPath = path.join(rootDir, filePath);
        if (!fs.existsSync(fullPath)) {
          missingFiles.push({ component: item.name, file: filePath });
        }
      }
    }

    expect(missingFiles, `Missing source files in registry: ${JSON.stringify(missingFiles, null, 2)}`).toHaveLength(0);
  });

  it('should ensure dependencies are valid array of strings', () => {
    for (const item of registry) {
      if (item.dependencies) {
        expect(Array.isArray(item.dependencies), `Dependencies for "${item.name}" must be an array`).toBe(true);
        for (const dep of item.dependencies) {
          expect(typeof dep).toBe('string');
          expect(dep.trim().length).toBeGreaterThan(0);
        }
      }
      if (item.registryDependencies) {
        expect(Array.isArray(item.registryDependencies), `Registry dependencies for "${item.name}" must be an array`).toBe(true);
      }
    }
  });
});

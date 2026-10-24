import { readdirSync } from 'node:fs';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const virtualModuleId = 'virtual:client-logos';
const resolvedVirtualModuleId = `\0${virtualModuleId}`;
const supportedImageExtensions = new Set([
  '.avif',
  '.bmp',
  '.gif',
  '.ico',
  '.jpeg',
  '.jpg',
  '.png',
  '.svg',
  '.tif',
  '.tiff',
  '.webp'
]);
const projectDirectory = dirname(fileURLToPath(import.meta.url));
const logoDirectory = join(projectDirectory, 'public', 'logo');

function clientLogosPlugin() {
  return {
    name: 'client-logos',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    load(id) {
      if (id !== resolvedVirtualModuleId) {
        return;
      }

      const logos = readdirSync(logoDirectory, { withFileTypes: true })
        .filter((entry) => entry.isFile() && supportedImageExtensions.has(extname(entry.name).toLowerCase()))
        .map((entry) => ({
          file: entry.name,
          name: entry.name.replace(/\.[^.]+$/, '')
        }))
        .sort((first, second) => first.file.localeCompare(second.file));

      return `export default ${JSON.stringify(logos)};`;
    },
    configureServer(server) {
      server.watcher.add(logoDirectory);
    },
    handleHotUpdate({ file, server }) {
      if (dirname(file) !== logoDirectory) {
        return;
      }

      const virtualModule = server.moduleGraph.getModuleById(resolvedVirtualModuleId);
      if (virtualModule) {
        server.moduleGraph.invalidateModule(virtualModule);
      }
      server.ws.send({ type: 'full-reload' });
    }
  };
}

export default defineConfig({
  plugins: [clientLogosPlugin()]
});

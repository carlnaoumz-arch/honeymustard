import {defineConfig} from 'vite';import {fileURLToPath,URL} from 'node:url';
export default defineConfig({
 plugins:[{name:'prerendered-preview',configurePreviewServer(server){server.middlewares.use((req,_res,next)=>{const url=new URL(req.url||'/', 'http://localhost');if(['/menu','/locations','/sources'].includes(url.pathname)){req.url=url.pathname+'/index.html'+url.search}next()})}}],
 resolve:{alias:{'@':fileURLToPath(new URL('./src',import.meta.url)),'@tanstack/react-router':fileURLToPath(new URL('./src/preview-router.ts',import.meta.url))}},esbuild:{jsx:'automatic'},build:{outDir:'dist'}
});

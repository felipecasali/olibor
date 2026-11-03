// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://olibor.com.br',
  output: 'static',
  adapter: vercel(),
  trailingSlash: 'ignore',
  integrations: [sitemap({ filter: (page) => !page.includes('/api/') })],
  // URLs do WordPress antigo → novas rotas (preserva SEO e links externos)
  redirects: {
    '/fale-conosco': '/contato',
    '/orcamento': '/contato#orcamento',
    '/gaxetas': '/produtos/gaxeta',
    '/politica-de-cookies-br': '/privacidade',
  },
});

# olibor.com.br

Site institucional da Olibor Borrachas e Retentores, migrado do WordPress para um site estático gerenciado como código.

- **Stack:** Astro 5 (saída estática) + função serverless para o formulário de orçamento
- **Design system:** Olibor (tokens em `src/styles/tokens.css`)
- **Hospedagem:** Vercel · **Versionamento:** GitHub (deploy automático a cada push na `main`)

## Estrutura

```
src/
  data/            ← conteúdo editável (JSON)
    site.json        empresa, contato, menu, áreas de atuação, clientes
    produtos.json    linha de produtos (gera /produtos/<slug>)
    materiais.json   elastômeros e faixas térmicas
  pages/           ← uma rota por arquivo
    api/orcamento.ts  função serverless do formulário
  components/      ← Header, Footer, PageBanner, CTABanner
  layouts/Base.astro ← <head>, SEO, animações
  styles/
    tokens.css       tokens do design system Olibor (não editar à mão)
    global.css       estilos de componentes
public/img/        ← logo e imagens
```

## Desenvolvimento

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # gera .vercel/output
```

## Deploy (uma vez)

1. Criar o repositório no GitHub e fazer push desta pasta.
2. Em vercel.com → **Add New Project** → importar o repositório (preset Astro detectado automaticamente).
3. Em **Settings → Environment Variables**, definir `RESEND_API_KEY`, `ORCAMENTO_TO`, `ORCAMENTO_FROM` (ver `.env.example`). Sem a chave, o formulário cai para envio por e-mail (mailto).
4. Em **Settings → Domains**, adicionar `olibor.com.br` e `www.olibor.com.br` e apontar o DNS conforme a Vercel indicar (registro A `76.76.21.21` ou CNAME `cname.vercel-dns.com`).

Depois disso, cada push na `main` publica o site; cada pull request gera uma URL de pré-visualização.

## Redirecionamentos do WordPress

Definidos em `astro.config.mjs`: `/fale-conosco`, `/orcamento`, `/gaxetas`, `/politica-de-cookies-br`.

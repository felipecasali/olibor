# Instruções para o Claude — site Olibor

## Como editar conteúdo
- Texto institucional, contatos, menu, áreas e clientes: `src/data/site.json`.
- Produtos: `src/data/produtos.json` (cada item gera `/produtos/<slug>`; o slug não deve mudar depois de publicado).
- Certificações: `src/data/certificacoes.json` (certificado vigente, histórico, Política da Qualidade). Imagens em `public/img/certificados/` (1400 px + versão `-560`). Na renovação: mover o vigente para `historico`, atualizar `vigente` e as imagens. Não publicar imagens de certificados vencidos.
- Materiais: `src/data/materiais.json` (`min`/`max` em °C; `null` = sob especificação).
- Páginas: `src/pages/*.astro`. Nova página → adicionar ao `nav` em `site.json` se for para o menu.
- Imagens: `public/img/`, sempre otimizadas (WebP, ≤ 1600 px de largura).
- Áreas de atuação (`site.json` → `areas`): cada item tem `nome`, `foto` e `alt`. A foto fica em `public/img/areas/<foto>.webp` (1200 px) e `<foto>-640.webp` (640 px). Alimenta o carrossel da home (`AreasCarousel.astro`), a página Áreas de atuação e o select do formulário.

## Regras do design system Olibor
- Cores, espaçamentos, raios e sombras só via variáveis de `src/styles/tokens.css`. Não editar esse arquivo à mão: ele é cópia do design system.
- Verde `--olibor-green-800` = primário/superfícies; vermelho `--color-accent` = única cor de ação.
- Tipografia: Barlow (corpo) + Barlow Condensed (títulos, nav, botões, eyebrows em caixa alta).
- Sem gradientes decorativos, glassmorphism, emoji, cards com borda colorida à esquerda (exceto acordeão de materiais).
- Hover de botão escurece um passo da rampa; nunca opacidade.
- Animações: revelação por scroll (`data-reveal`), contadores (`data-count`), parallax (`data-parallax`); respeitar o interruptor do rodapé e `prefers-reduced-motion`.

## Texto
- Português do Brasil, voz institucional na 1ª pessoa do plural, registro técnico antes do comercial.
- Unidades: `-30 °C a +100 °C`, vírgula decimal. Marcas: `NBR ISO 9001:2015`, `Viton®`.

## Fluxo
- Rodar `npm run build` antes de cada commit; o build deve passar sem erros.
- Commits pequenos e descritivos em português; push na `main` publica na Vercel.

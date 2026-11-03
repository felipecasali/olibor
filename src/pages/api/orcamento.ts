import type { APIRoute } from 'astro';

// Função serverless (Vercel). Envia o pedido de orçamento por e-mail via Resend.
// Variáveis de ambiente (Vercel → Settings → Environment Variables):
//   RESEND_API_KEY   chave da API Resend
//   ORCAMENTO_TO     destinatário (padrão: olibor@olibor.com.br)
//   ORCAMENTO_FROM   remetente verificado no Resend (ex.: "Site Olibor <site@olibor.com.br>")
// Sem RESEND_API_KEY a rota responde 503 e o formulário oferece envio por e-mail (mailto).
export const prerender = false;

const esc = (s: unknown) =>
  String(s ?? '').slice(0, 4000).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export const POST: APIRoute = async ({ request }) => {
  let d: Record<string, string>;
  try {
    d = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'json' }), { status: 400 });
  }
  if (d.website) return new Response(JSON.stringify({ ok: true }), { status: 200 }); // honeypot
  if (!d.empresa || !d.nome || !d.mensagem || !/^\S+@\S+\.\S+$/.test(d.email || '')) {
    return new Response(JSON.stringify({ ok: false, error: 'campos' }), { status: 422 });
  }

  const key = import.meta.env.RESEND_API_KEY ?? process.env.RESEND_API_KEY;
  if (!key) return new Response(JSON.stringify({ ok: false, error: 'email-nao-configurado' }), { status: 503 });
  const to = import.meta.env.ORCAMENTO_TO ?? process.env.ORCAMENTO_TO ?? 'olibor@olibor.com.br';
  const from = import.meta.env.ORCAMENTO_FROM ?? process.env.ORCAMENTO_FROM ?? 'Site Olibor <onboarding@resend.dev>';

  const rows = [
    ['Empresa', d.empresa], ['Contato', d.nome], ['E-mail', d.email], ['Telefone', d.telefone],
    ['Produto', d.produto], ['Material', d.material], ['Quantidade', d.quantidade], ['Área', d.area],
  ];
  const html = `<h2>Pedido de orçamento — site</h2><table cellpadding="6">${rows
    .map(([k, v]) => `<tr><td><b>${k}</b></td><td>${esc(v)}</td></tr>`)
    .join('')}</table><p><b>Especificação</b></p><p>${esc(d.mensagem).replace(/\n/g, '<br>')}</p>`;

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [to], reply_to: d.email, subject: `Orçamento — ${String(d.empresa).slice(0, 80)}`, html }),
  });
  if (!r.ok) return new Response(JSON.stringify({ ok: false, error: 'envio' }), { status: 502 });
  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
};

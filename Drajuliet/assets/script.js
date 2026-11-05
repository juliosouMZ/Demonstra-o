const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton?.addEventListener('click', () => {
  const opened = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(opened));
});
document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

const form = document.getElementById('contactForm');
form?.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const nome = (data.get('nome') || '').trim();
  const email = (data.get('email') || '').trim();
  const telefone = (data.get('telefone') || '').trim();
  const modalidade = data.get('modalidade') || '';
  const mensagem = (data.get('mensagem') || '').trim();
  const texto = [
    'Olá, Juliet! Gostaria de informações sobre o atendimento.',
    '',
    `Nome: ${nome}`,
    `E-mail: ${email}`,
    `WhatsApp: ${telefone || 'Não informado'}`,
    `Preferência: ${modalidade}`,
    `Mensagem: ${mensagem || 'Não informada'}`
  ].join('\\n');
  const whatsapp = '5535196571639';
  document.getElementById('formFeedback').textContent = 'Abrindo o WhatsApp para você concluir o envio…';
  window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(texto)}`, '_blank', 'noopener');
});
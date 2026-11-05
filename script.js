const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? '×' : '☰';
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  if (menuButton) menuButton.textContent = '☰';
}));
document.getElementById('year').textContent = new Date().getFullYear();

const phone = document.getElementById('telefone');
phone?.addEventListener('input', () => {
  let digits = phone.value.replace(/\D/g, '').slice(0, 11);
  if (digits.length > 2) digits = `(${digits.slice(0,2)}) ${digits.slice(2)}`;
  if (digits.length > 10) digits = digits.replace(/(\d{5})(\d{4})$/, '$1-$2');
  else if (digits.length > 9) digits = digits.replace(/(\d{4})(\d{4})$/, '$1-$2');
  phone.value = digits;
});

document.getElementById('leadForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const nome = String(data.get('nome') || '').trim();
  const telefone = String(data.get('telefone') || '').trim();
  const faixa = String(data.get('faixa') || '');
  const interesse = String(data.get('interesse') || '');
  const mensagem = String(data.get('mensagem') || '').trim();
  if (!nome || !telefone || !faixa || !interesse) {
    document.getElementById('formStatus').textContent = 'Preencha os campos obrigatórios para continuar.';
    return;
  }
  const text = [
    'Olá! Gostaria de solicitar uma avaliação.',
    '',
    `Nome: ${nome}`,
    `WhatsApp: ${telefone}`,
    `Faixa etária: ${faixa}`,
    `Assunto: ${interesse}`,
    mensagem ? `Mensagem: ${mensagem}` : ''
  ].filter(Boolean).join('\n');
  const url = `https://wa.me/5511993025589?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
  document.getElementById('formStatus').textContent = 'Seu WhatsApp será aberto com a mensagem preenchida.';
});

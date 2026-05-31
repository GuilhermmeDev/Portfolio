function tMouse(e, c) {
  const r = c.getBoundingClientRect();
  c.style.setProperty('--x', (e.clientX - r.left) + 'px');
  c.style.setProperty('--y', (e.clientY - r.top) + 'px');
}

const revealEls = document.querySelectorAll('.tl-item, .tech-item, .fade-up');

if (!('IntersectionObserver' in window)) {
  revealEls.forEach(el => el.classList.add('visible'));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en, i) => {
      if (en.isIntersecting) setTimeout(() => en.target.classList.add('visible'), i * 65);
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => io.observe(el));
}

document.querySelectorAll('.tech-item').forEach((el, i) => {
  el.style.transitionDelay = (i % 8 * 40) + 'ms';
});

let expanded = false;
function toggleExpand() {
  expanded = !expanded;
  const btn = document.getElementById('expandBtn');
  document.querySelectorAll('.tech-extra').forEach((el, i) => {
    if (expanded) {
      el.classList.add('expanded');
      setTimeout(() => { el.style.transitionDelay = (i * 35) + 'ms'; el.classList.add('visible'); }, 30);
    } else {
      el.classList.remove('visible', 'expanded');
    }
  });
  btn.classList.toggle('open', expanded);
  btn.innerHTML = expanded
    ? `<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 15l-6-6-6 6"/></svg> Mostrar menos`
    : `<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg> Ver todas as tecnologias`;
}

// Theme toggle
const html = document.documentElement;
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

function toggleTheme() {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.style.transition = 'background 0.35s ease, color 0.35s ease';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  setTimeout(() => { html.style.transition = ''; }, 400);
}

function copyEmail() {
  const email = 'guilherme.dev.morais@gmail.com';
  navigator.clipboard.writeText(email).then(() => {
    const footerBtn = document.getElementById('copyBtn');
    if (footerBtn) {
      const prev = footerBtn.innerHTML;
      footerBtn.textContent = '✓ Copiado!';
      footerBtn.classList.add('copied');
      setTimeout(() => { footerBtn.innerHTML = prev; footerBtn.classList.remove('copied'); }, 2200);
    }
    const navBtn = document.getElementById('navCta');
    if (navBtn) {
      const prev = navBtn.textContent;
      navBtn.textContent = '✓ E-mail copiado!';
      navBtn.classList.add('copied');
      setTimeout(() => { navBtn.textContent = prev; navBtn.classList.remove('copied'); }, 2200);
    }
  }).catch(() => {
    window.prompt('Copie o e-mail:', email);
  });
}

document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mobileMenu').classList.toggle('open');
});

function closeMobile() {
  document.getElementById('mobileMenu').classList.remove('open');
}

document.addEventListener('DOMContentLoaded', () => {
  const label = document.querySelector('#years_exp');
  label.textContent = '+' + (new Date().getFullYear() - 2022);

  const span = document.querySelector('#current_year');
  span.textContent = new Date().getFullYear();
});

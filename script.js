const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#primary-nav');
const contactForm = document.querySelector('[data-contact-form]');
const interestSelect = contactForm?.querySelector('select[name="interest"]');

const closeNavigation = () => {
  header?.classList.remove('is-open');
  document.body.classList.remove('nav-open');
  navToggle?.setAttribute('aria-expanded', 'false');
  navToggle?.setAttribute('aria-label', 'Open navigation');
};

navToggle?.addEventListener('click', () => {
  const isOpen = header.classList.toggle('is-open');
  document.body.classList.toggle('nav-open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNavigation));

window.addEventListener('scroll', () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 40);
}, { passive: true });

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px' });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = new Date().getFullYear();
});

document.querySelectorAll('[data-interest]').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    if (interestSelect) interestSelect.value = trigger.dataset.interest;
  });
});

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const name = `${data.get('firstName')} ${data.get('lastName')}`.trim();
  const subject = `Website inquiry: ${data.get('interest')}`;
  const body = [
    `Hi Patrick,`,
    ``,
    `I'm ${name} and I'm interested in ${data.get('interest')}.`,
    ``,
    data.get('message') ? String(data.get('message')) : `I'd like to schedule a conversation.`,
    ``,
    `Email: ${data.get('email')}`,
    data.get('phone') ? `Phone: ${data.get('phone')}` : null,
  ].filter(Boolean).join('\n');

  window.location.href = `mailto:doan.patrickp@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

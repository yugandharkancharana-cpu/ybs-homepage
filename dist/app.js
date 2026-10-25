'use strict';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reducedMotion && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('js-motion');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), {threshold: .08});
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
document.getElementById('year').textContent = new Date().getFullYear();
const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  menuButton.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  mobileNav.hidden = expanded;
});
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mobileNav.hidden = true; menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Open navigation');
}));
const tabs = [...document.querySelectorAll('[data-filter]')];
function selectCategory(tab, focus = false) {
  tabs.forEach(t => { const active = t === tab; t.classList.toggle('active', active); t.setAttribute('aria-selected', String(active)); t.tabIndex = active ? 0 : -1; });
  document.querySelectorAll('.service-card').forEach(card => {
    card.hidden = tab.dataset.filter !== 'all' && card.dataset.category !== tab.dataset.filter;
    if (!card.hidden) card.classList.add('visible');
  });
  if (focus) tab.focus();
}
tabs.forEach((tab, index) => {
  tab.tabIndex = index === 0 ? 0 : -1;
  tab.addEventListener('click', () => selectCategory(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); selectCategory(tabs[next], true); }
  });
});
const serviceDetails = {
 registration: ['REGISTRATION & SETUP', 'An idea deserves a strong start.', 'Get support with the foundations of your business, with a scope suited to the entity and registrations you need.', ['Company incorporation support: Pvt Ltd, LLP, or OPC', 'Business registration and licence guidance', 'Document collection and milestone tracking']],
 compliance: ['LEGAL & COMPLIANCE', 'Keep your business on track.', 'Find professional support for ongoing requirements and the protection of your business.', ['GST and statutory filing support', 'Trademark and intellectual property support', 'Company secretarial and legal services']],
 finance: ['FINANCE & ACCOUNTING', 'Make your numbers work for you.', 'Bring more structure to your financial records with accounting professionals coordinated through YBS.', ['Bookkeeping and accounting support', 'GST and TDS return services', 'Financial reporting support']],
 brand: ['BRAND & MARKETING', 'Make your next impression count.', 'Give your business a considered identity and a clearer way to connect with its audience.', ['Brand identity and design', 'Marketing collateral and pitch decks', 'Digital marketing support']],
 technology: ['WEB & TECHNOLOGY', 'Build what comes next.', 'Explore design and development support for your next digital project.', ['Business websites and landing pages', 'E-commerce experiences', 'Web and mobile application development']],
 people: ['PEOPLE & OPERATIONS', 'Support the team behind the business.', 'Get help setting up the people processes your growing business needs.', ['HR and payroll setup', 'PF and ESI registration support', 'Employee onboarding support']]
};
const dialog = document.getElementById('service-dialog');
let lastTrigger;
function openDetails(data, trigger, books = false) {
  lastTrigger = trigger;
  document.getElementById('dialog-label').textContent = data[0];
  document.getElementById('dialog-title').textContent = data[1];
  document.getElementById('dialog-description').textContent = data[2];
  document.getElementById('dialog-list').replaceChildren(...data[3].map(text => { const li = document.createElement('li'); li.textContent = text; return li; }));
  const action = dialog.querySelector('.button');
  action.hidden = books;
  dialog.querySelector('.dialog-note').textContent = books ? 'This is a product direction preview. Books is in development; selected access and final capabilities will be confirmed by YBS.' : 'Scope, pricing, and timelines are confirmed for your requirements.';
  dialog.showModal();
}
document.querySelectorAll('[data-service]').forEach(button => button.addEventListener('click', () => openDetails(serviceDetails[button.dataset.service], button)));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
dialog.addEventListener('close', () => lastTrigger?.focus());
document.getElementById('books-details-button').addEventListener('click', event => {
 event.preventDefault(); openDetails(['YBS BOOKS / PRODUCT PREVIEW', 'Your books, in one connected flow.', 'Books is being developed as an integrated YBS module, bringing everyday sales, purchase, and accounting workflows together.', ['Sales flow: sales order → invoice → customer receipt', 'Purchase flow: purchase order → vendor bill → payment', 'Customer and vendor records, items, and service catalogue', 'Financial reporting and role-based access']], event.currentTarget, true);
});
const previews = {
 projects: {title: 'Your next milestone', kicker: 'PROJECT TRACKER', name: 'Company registration', description: 'From an idea to officially in business.', badge: 'In progress', progress: '66%', milestones: [['✓','Documents','done'],['✓','Name approval','done'],['3','Filing','current'],['4','Incorporation','']], bottom: 'Your YBS expert is taking care of the next step.'},
 documents: {title: 'A little input. A big step forward.', kicker: 'YOUR NEXT ACTION', name: 'Documents for your registration', description: 'Keep your project moving with the right details.', badge: 'Needs you', progress: '50%', milestones: [['✓','Identity','done'],['✓','Address','done'],['3','Business details','current'],['4','Review','']], bottom: 'Your workspace keeps the next action visible.'},
 deadlines: {title: 'Know what’s coming up', kicker: 'COMPLIANCE VIEW', name: 'Upcoming business filings', description: 'Illustrative compliance planning workflow.', badge: 'Upcoming', progress: '33%', milestones: [['✓','Review','done'],['2','Prepare','current'],['3','File',''],['4','Complete','']], bottom: 'See your upcoming requirements in one place.'}
};
document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => {
 document.querySelectorAll('[data-view]').forEach(b => { const active = b === button; b.classList.toggle('active', active); b.setAttribute('aria-pressed', String(active)); });
 const data = previews[button.dataset.view];
 ['title','kicker','name','description','badge'].forEach(key => document.getElementById('preview-' + key).textContent = data[key]);
 document.getElementById('preview-progress').style.width = data.progress;
 const milestones = document.getElementById('preview-milestones'); milestones.replaceChildren();
 data.milestones.forEach((item, index) => { if (index) milestones.appendChild(document.createElement('i')); const span = document.createElement('span'); span.className = item[2]; span.textContent = item[0]; const small = document.createElement('small'); small.textContent = item[1]; span.appendChild(small); milestones.appendChild(span); });
 const bottom = document.getElementById('preview-bottom'); bottom.replaceChildren(); const avatar = document.createElement('span'); avatar.className = 'tiny-avatar'; avatar.textContent = 'Y'; bottom.append(avatar, document.createTextNode(data.bottom)); const arrow = document.createElement('span'); arrow.textContent = '↗'; bottom.append(arrow);
}));
document.querySelectorAll('[data-view]').forEach(b => b.setAttribute('aria-pressed', String(b.classList.contains('active'))));
if (!reducedMotion && window.matchMedia('(pointer: fine)').matches) {
 const art = document.querySelector('.hero-art');
 art.addEventListener('pointermove', event => { const rect = art.getBoundingClientRect(); art.style.setProperty('--ry', ((event.clientX - rect.left) / rect.width - .5) * 8 + 'deg'); art.style.setProperty('--rx', -((event.clientY - rect.top) / rect.height - .5) * 6 + 'deg'); });
 art.addEventListener('pointerleave', () => { art.style.setProperty('--ry', '0deg'); art.style.setProperty('--rx', '0deg'); });
}

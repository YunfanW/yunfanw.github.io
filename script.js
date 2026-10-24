const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
toggle.addEventListener('click', () => {
  const expanded = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('is-open', !expanded);
});
nav.addEventListener('click', event => {
  if (event.target.closest('a')) {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    toggle.focus();
  }
});
// Preserve links to the former single-page sections.
const legacyPages = { '#research': 'research.html', '#teaching': 'teaching.html' };
if (document.body.dataset.page === 'home' && legacyPages[window.location.hash]) {
  window.location.replace(legacyPages[window.location.hash]);
}

// Keep the displayed age consistent with the birthday supplied by Yunfan.
const catAge = document.querySelector('[data-cat-age]');
if (catAge) {
  const [year, month, day] = catAge.dataset.catAge.split('-').map(Number);
  const today = new Date();
  let age = today.getFullYear() - year;
  if (today.getMonth() + 1 < month || (today.getMonth() + 1 === month && today.getDate() < day)) age -= 1;
  const ageWords = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'];
  if (age >= 0) catAge.textContent = catAge.dataset.catAgeFormat === 'words' ? (ageWords[age] || String(age)) : String(age);
}

// Theme toggle, mobile nav, simple modal and contact form handler
document.addEventListener('DOMContentLoaded', () => {
  // Theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const stored = localStorage.getItem('theme');
  if ((stored === 'dark') || (!stored && prefersDark)) document.documentElement.classList.add('dark');

  function setTheme(dark){
    if(dark) document.documentElement.classList.add('dark'); else document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
    if(themeToggle) themeToggle.textContent = dark ? '☀️' : '🌙';
    if(themeToggle) themeToggle.setAttribute('aria-pressed', String(dark));
  }
  setTheme(localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && prefersDark));
  if(themeToggle){
    themeToggle.addEventListener('click', () => setTheme(!document.documentElement.classList.contains('dark')));
  }

  // Mobile nav
  const navToggle = document.querySelector('.nav-toggle');
  const primaryNav = document.getElementById('primary-navigation');
  if(navToggle && primaryNav){
    navToggle.addEventListener('click', ()=>{
      const visible = primaryNav.getAttribute('data-visible') === 'true';
      primaryNav.setAttribute('data-visible', String(!visible));
      navToggle.setAttribute('aria-expanded', String(!visible));
    });
  }

  // Project modal (simple)
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  const closeBtn = modal?.querySelector('.modal-close');
  document.querySelectorAll('[data-project]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-project');
      openModal(id);
    });
  });
  function openModal(id){
    if(!modal) return;
    modalBody.innerHTML = `<p class="muted">Details for project ${id}. Replace this with real content and screenshots for each project.</p>`;
    modal.setAttribute('aria-hidden','false');
  }
  function closeModal(){
    if(!modal) return;
    modal.setAttribute('aria-hidden','true');
  }
  closeBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e)=>{ if(e.target===modal) closeModal(); });
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeModal(); });

  // Contact form (demo only)
  const contactForm = document.getElementById('contact-form');
  const status = document.getElementById('contact-status');
  if(contactForm){
    contactForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      // Basic UI feedback — implement real submit with server or service
      status.classList.remove('visually-hidden');
      status.textContent = 'Thanks — message sent (demo).';
      contactForm.reset();
      setTimeout(()=> status.classList.add('visually-hidden'), 4000);
    });
  }
});

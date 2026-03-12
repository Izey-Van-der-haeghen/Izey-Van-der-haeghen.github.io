// Google Analytics - only loaded after cookie consent
function loadGA() {
  if (document.getElementById('ga-script')) return;
  var s = document.createElement('script');
  s.id = 'ga-script';
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=G-8ER7RD2CPX';
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', 'G-8ER7RD2CPX');
}
if (localStorage.getItem('cookies-accepted') === 'true') { loadGA(); }

// Scroll reveal
var reveals = document.querySelectorAll('.reveal');
var observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });
reveals.forEach(function(el) { observer.observe(el); });

// Nav shadow on scroll
var nav = document.querySelector('nav');
if (nav) {
  window.addEventListener('scroll', function() {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  });
}

// Mobile menu toggle
var menuToggle = document.getElementById('menuToggle');
var navLinks = document.getElementById('navLinks');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', function() {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
}

// Language picker
var langBtn = document.getElementById('langBtn');
var langDropdown = document.getElementById('langDropdown');
if (langBtn && langDropdown) {
  langBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    langDropdown.classList.toggle('open');
  });
  document.addEventListener('click', function() { langDropdown.classList.remove('open'); });
}

// Form AJAX submit
var contactForm = document.getElementById('contactForm');
var submitBtn = document.getElementById('submitBtn');
var formSuccess = document.getElementById('formSuccess');
if (contactForm && submitBtn && formSuccess) {
  var submitText = submitBtn.textContent;
  var sendingText = submitBtn.getAttribute('data-sending') || 'Sending...';
  var errorText = submitBtn.getAttribute('data-error') || 'Something went wrong. Please try again or send a WhatsApp.';

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = sendingText;
    fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { 'Accept': 'application/json' }
    }).then(function(res) {
      if (res.ok) {
        contactForm.style.display = 'none';
        formSuccess.classList.add('show');
      } else {
        submitBtn.disabled = false;
        submitBtn.textContent = submitText;
        alert(errorText);
      }
    }).catch(function() {
      submitBtn.disabled = false;
      submitBtn.textContent = submitText;
      alert(errorText);
    });
  });
}

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var item = btn.parentElement;
    var isActive = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(function(i) { i.classList.remove('active'); });
    if (!isActive) item.classList.add('active');
  });
});

// Cookie consent
(function() {
  var cookieBanner = document.getElementById('cookieBanner');
  var cookieAccept = document.getElementById('cookieAccept');
  var cookieDecline = document.getElementById('cookieDecline');
  var cookieSettings = document.getElementById('cookieSettings');

  if (!cookieBanner) return;

  if (!localStorage.getItem('cookies-accepted')) {
    cookieBanner.classList.add('show');
  }

  if (cookieAccept) {
    cookieAccept.addEventListener('click', function() {
      localStorage.setItem('cookies-accepted', 'true');
      cookieBanner.classList.remove('show');
      loadGA();
    });
  }

  if (cookieDecline) {
    cookieDecline.addEventListener('click', function() {
      localStorage.setItem('cookies-accepted', 'false');
      cookieBanner.classList.remove('show');
    });
  }

  // Cookie settings button in footer - re-shows the banner
  if (cookieSettings) {
    cookieSettings.addEventListener('click', function() {
      localStorage.removeItem('cookies-accepted');
      cookieBanner.classList.add('show');
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });
  }
})();

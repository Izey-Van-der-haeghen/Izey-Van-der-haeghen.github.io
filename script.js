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

function revokeGA() {
  var gaScript = document.getElementById('ga-script');
  if (gaScript) gaScript.remove();
  window.dataLayer = [];
  window.gtag = function(){};
  // Remove GA cookies
  document.cookie.split(';').forEach(function(c) {
    var name = c.trim().split('=')[0];
    if (name.indexOf('_ga') === 0) {
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.' + location.hostname;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    }
  });
}

try { if (localStorage.getItem('cookies-accepted') === 'true') { loadGA(); } } catch(e) {}

// Scroll reveal
var reveals = document.querySelectorAll('.reveal');
var observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
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
    var isOpen = menuToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Language picker
var langBtn = document.getElementById('langBtn');
var langDropdown = document.getElementById('langDropdown');
if (langBtn && langDropdown) {
  langBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    var isOpen = langDropdown.classList.toggle('open');
    langBtn.setAttribute('aria-expanded', isOpen);
  });
  document.addEventListener('click', function() {
    langDropdown.classList.remove('open');
    langBtn.setAttribute('aria-expanded', 'false');
  });
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
    document.querySelectorAll('.faq-item').forEach(function(i) {
      i.classList.remove('active');
      i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });
    if (!isActive) {
      item.classList.add('active');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

// Cookie consent + WhatsApp float position
(function() {
  var cookieBanner = document.getElementById('cookieBanner');
  var cookieAccept = document.getElementById('cookieAccept');
  var cookieDecline = document.getElementById('cookieDecline');
  var cookieSettings = document.getElementById('cookieSettings');
  var waFloat = document.querySelector('.wa-float');

  if (!cookieBanner) return;

  function updateWaPosition() {
    if (!waFloat) return;
    requestAnimationFrame(function() {
      if (cookieBanner.classList.contains('show')) {
        var bannerHeight = cookieBanner.offsetHeight;
        waFloat.style.bottom = (bannerHeight + 16) + 'px';
      } else {
        waFloat.style.bottom = '';
      }
    });
  }

  function hideBanner() {
    cookieBanner.classList.remove('show');
    updateWaPosition();
  }

  function showBanner() {
    cookieBanner.classList.add('show');
    updateWaPosition();
  }

  try { if (!localStorage.getItem('cookies-accepted')) { showBanner(); } } catch(e) { showBanner(); }

  if (cookieAccept) {
    cookieAccept.addEventListener('click', function() {
      try { localStorage.setItem('cookies-accepted', 'true'); } catch(e) {}
      hideBanner();
      loadGA();
    });
  }

  if (cookieDecline) {
    cookieDecline.addEventListener('click', function() {
      try { localStorage.setItem('cookies-accepted', 'false'); } catch(e) {}
      hideBanner();
      revokeGA();
    });
  }

  if (cookieSettings) {
    cookieSettings.addEventListener('click', function() {
      try { localStorage.removeItem('cookies-accepted'); } catch(e) {}
      showBanner();
    });
  }

  // Recalculate on resize (banner height may change)
  window.addEventListener('resize', updateWaPosition);
})();

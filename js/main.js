
// Enhanced Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('nav-open');
  });

  // Close menu when clicking on a link
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('nav-open');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('nav-open');
    }
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('nav-open');
    }
  });
}

// Scroll Reveal Animation with Mobile Hover Effect
const observerOptions = {
  threshold: 0.3,
  rootMargin: '0px 0px -100px 0px'
};

// Detect if device is mobile/touch or screen width is mobile size
const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
         ('ontouchstart' in window) || 
         (navigator.maxTouchPoints > 0) ||
         window.innerWidth <= 768;
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // Add hover effect on mobile when scrolled into view
      if (isMobileDevice()) {
        setTimeout(() => {
          entry.target.classList.add('mobile-hover');
        }, 300);
      }
    } else {
      // Remove hover effect when scrolled out of view on mobile
      if (isMobileDevice()) {
        entry.target.classList.remove('mobile-hover');
      }
    }
  });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.service-card, .portfolio-item, .stat-item').forEach(el => {
  observer.observe(el);
});

// Additional scroll-based hover trigger for better mobile experience
let scrollTimeout;
window.addEventListener('scroll', () => {
  if (!isMobileDevice()) return;
  
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    const viewportHeight = window.innerHeight;
    const scrollTop = window.pageYOffset;
    
    document.querySelectorAll('.service-card, .portfolio-item').forEach(el => {
      const rect = el.getBoundingClientRect();
      const elementTop = rect.top + scrollTop;
      const elementBottom = elementTop + rect.height;
      const viewportTop = scrollTop;
      const viewportBottom = scrollTop + viewportHeight;
      
      // Check if element is in the middle 60% of viewport
      const isInViewport = elementTop < viewportBottom - (viewportHeight * 0.2) && 
                          elementBottom > viewportTop + (viewportHeight * 0.2);
      
      if (isInViewport) {
        el.classList.add('mobile-hover');
      } else {
        el.classList.remove('mobile-hover');
      }
    });
  }, 50);
});

// Animated Counter for Stats
function animateCounter(element) {
  const target = parseFloat(element.getAttribute('data-target'));
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;
  const isDecimal = target % 1 !== 0;

  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = isDecimal ? target.toFixed(1) : target;
    }
  };

  updateCounter();
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-number').forEach(stat => {
        animateCounter(stat);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
  statsObserver.observe(statsSection);
}

// Smooth Scroll Enhancement
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 70;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Enhanced Navbar Background on Scroll
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  // Hide navbar on scroll down, show on scroll up
  if (currentScroll > lastScroll && currentScroll > 200) {
    navbar.style.transform = 'translateY(-100%)';
  } else {
    navbar.style.transform = 'translateY(0)';
  }
  
  lastScroll = currentScroll;
});

// Parallax Effect for Hero Particles
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const particles = document.querySelectorAll('.particle');
  
  particles.forEach((particle, index) => {
    const speed = (index + 1) * 0.3;
    particle.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

console.log('SocialFACE - Premium Experience Loaded ✨');

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add('visible');
  } else {
    scrollToTopBtn.classList.remove('visible');
  }
});

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
// Contact Modal Functionality
const contactModal = document.getElementById('contactModal');
const modalClose = document.querySelector('.modal-close');
const contactForm = document.getElementById('contactForm');

// Open modal when clicking consultation buttons
document.addEventListener('click', (e) => {
  if (e.target.closest('a[href="#contact"]') || 
      e.target.textContent.includes('Schedule a Consultation') ||
      e.target.textContent.includes('Get Started')) {
    e.preventDefault();
    openModal();
  }
});

// Close modal functions
modalClose.addEventListener('click', closeModal);
contactModal.addEventListener('click', (e) => {
  if (e.target === contactModal) {
    closeModal();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && contactModal.classList.contains('active')) {
    closeModal();
  }
});

function openModal() {
  contactModal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  setTimeout(() => {
    contactModal.classList.add('active');
  }, 10);
}

function closeModal() {
  contactModal.classList.remove('active');
  setTimeout(() => {
    contactModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }, 300);
}

// Form submission
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);
  
  // Show success message (you can replace this with actual form submission)
  alert('Thank you for your message! We\'ll get back to you within 24 hours.');
  
  // Reset form and close modal
  contactForm.reset();
  closeModal();
  
  // Here you would typically send the data to your server
  console.log('Form data:', data);
});

// Phone number formatting
const phoneInput = document.getElementById('phoneNumber');
phoneInput.addEventListener('input', (e) => {
  let value = e.target.value.replace(/\D/g, '');
  if (value.length >= 10) {
    value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  }
  e.target.value = value;
});
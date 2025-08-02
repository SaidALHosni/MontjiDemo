// Modern Montji Interactive Scripts
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      menuToggle.innerHTML = navMenu.classList.contains('active') ? '✕' : '☰';
    });
  }

  // Navbar Scroll Effect
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Card Hover Effects
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // Toast Notification Example
  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  // Add to Cart Animation
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const card = this.closest('.card');
      const cardImg = card.querySelector('.card-img');
      const clone = cardImg.cloneNode(true);
      
      clone.style.position = 'fixed';
      clone.style.width = '100px';
      clone.style.height = '100px';
      clone.style.objectFit = 'cover';
      clone.style.borderRadius = '50%';
      clone.style.zIndex = '1000';
      clone.style.top = cardImg.getBoundingClientRect().top + 'px';
      clone.style.left = cardImg.getBoundingClientRect().left + 'px';
      clone.style.transition = 'all 0.5s cubic-bezier(0.5, 0, 0, 1)';
      
      document.body.appendChild(clone);
      
      setTimeout(() => {
        clone.style.top = '20px';
        clone.style.right = '20px';
        clone.style.left = 'auto';
        clone.style.width = '40px';
        clone.style.height = '40px';
        clone.style.opacity = '0.5';
      }, 0);
      
      setTimeout(() => {
        clone.remove();
        showToast('Item added to cart!', 'success');
      }, 500);
    });
  });

  // Lazy Loading Images
  const lazyImages = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.onload = () => {
          img.classList.add('loaded');
        };
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });

  lazyImages.forEach(img => imageObserver.observe(img));

  // Form Validation Example
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const inputs = this.querySelectorAll('input[required], select[required], textarea[required]');
      let isValid = true;
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          input.classList.add('error');
          isValid = false;
        } else {
          input.classList.remove('error');
        }
      });
      
      if (!isValid) {
        e.preventDefault();
        showToast('Please fill all required fields', 'error');
      }
    });
  });

  // Search Functionality
  const searchInput = document.querySelector('.search-input');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      // Implement search logic here
      console.log('Searching for:', this.value);
    });
  }

  // Floating Action Button
  const fab = document.createElement('button');
  fab.className = 'fab';
  fab.innerHTML = '🛒';
  fab.addEventListener('click', () => {
    // Open cart or perform action
    showToast('Cart opened!', 'info');
  });
  document.body.appendChild(fab);

  // Initialize animations
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
  });
});
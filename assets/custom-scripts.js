// Modern Theme Enhancements

// Smooth scroll to top button
const scrollToTop = () => {
  const button = document.createElement('button');
  button.innerHTML = '↑';
  button.className = 'scroll-to-top';
  button.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #2D3142;
    color: white;
    border: none;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1000;
  `;
  
  document.body.appendChild(button);
  
  window.addEventListener('scroll', () => {
    button.style.opacity = window.scrollY > 300 ? '1' : '0';
  });
  
  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
};

// Enhanced product image zoom
const initProductZoom = () => {
  const productImages = document.querySelectorAll('.product__media img');
  
  productImages.forEach(img => {
    img.addEventListener('mousemove', (e) => {
      const { left, top, width, height } = img.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      img.style.transformOrigin = `${x * 100}% ${y * 100}%`;
    });
    
    img.addEventListener('mouseenter', () => {
      img.style.transform = 'scale(1.5)';
      img.style.transition = 'transform 0.3s ease';
    });
    
    img.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1)';
    });
  });
};

// Lazy loading images
const initLazyLoading = () => {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
};

// Enhanced mobile menu
const initMobileMenu = () => {
  const menuButton = document.querySelector('.header__menu-toggle');
  const menu = document.querySelector('.menu-drawer');
  
  if (menuButton && menu) {
    menuButton.addEventListener('click', () => {
      menu.classList.toggle('active');
      document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });
  }
};

// Product quick view
const initQuickView = () => {
  const quickViewButtons = document.querySelectorAll('.quick-view-button');
  
  quickViewButtons.forEach(button => {
    button.addEventListener('click', async (e) => {
      e.preventDefault();
      const productId = button.dataset.productId;
      
      try {
        const response = await fetch(`/products/${productId}.js`);
        const product = await response.json();
        
        // Create and show quick view modal
        const modal = document.createElement('div');
        modal.className = 'quick-view-modal';
        modal.innerHTML = `
          <div class="quick-view-content">
            <button class="close-button">×</button>
            <div class="product-info">
              <h2>${product.title}</h2>
              <p class="price">${product.price}</p>
              <div class="description">${product.description}</div>
              <button class="add-to-cart">Add to Cart</button>
            </div>
          </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal functionality
        modal.querySelector('.close-button').addEventListener('click', () => {
          modal.remove();
        });
      } catch (error) {
        console.error('Error loading product:', error);
      }
    });
  });
};

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
  scrollToTop();
  initProductZoom();
  initLazyLoading();
  initMobileMenu();
  initQuickView();
}); 
// ============================
// All Scripts Merged in One DOMContentLoaded
// ============================
document.addEventListener('DOMContentLoaded', function () {

  // ============================
  // Fade-in Animation on Scroll
  // ============================
  function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in');

    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  }

  window.addEventListener('load', animateOnScroll);
  window.addEventListener('scroll', animateOnScroll);


  // ============================
  // Smooth Scrolling for Links
  // ============================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });


  // ============================
  // Form Submission Handler
  // ============================
  const form = document.getElementById("my-form");

  async function handleSubmit(event) {
    event.preventDefault();
    const status = document.getElementById("my-form-status");
    const data = new FormData(event.target);

    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: { 'Accept': 'application/json' }
    }).then(response => {
      if (response.ok) {
        status.innerHTML = "Thanks for your submission!";
        form.reset();
      } else {
        response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
            status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
          } else {
            status.innerHTML = "Oops! There was a problem submitting your form";
          }
        });
      }
    }).catch(() => {
      status.innerHTML = "Oops! There was a problem submitting your form";
    });
  }

  form.addEventListener("submit", handleSubmit);


  // ============================
  // Mobile Menu (Hamburger)
  // ============================
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuLinks = mobileMenu.querySelectorAll('a');

  function handleResponsive() {
    if (window.innerWidth > 768) {
      mobileMenu.classList.remove('active');
      const icon = hamburgerBtn.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  }

  // Initial check
  handleResponsive();
  window.addEventListener('resize', handleResponsive);

  // Toggle mobile menu
  hamburgerBtn.addEventListener('click', function () {
    if (window.innerWidth <= 768) {
      mobileMenu.classList.toggle('active');
      const icon = hamburgerBtn.querySelector('i');

      if (mobileMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    }
  });

  // Close on link click
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', function () {
      mobileMenu.classList.remove('active');
      const icon = hamburgerBtn.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    });
  });

  // Close when clicking outside
  document.addEventListener('click', function (event) {
    const isClickInsideMenu = mobileMenu.contains(event.target);
    const isClickOnHamburger = hamburgerBtn.contains(event.target);

    if (!isClickInsideMenu && !isClickOnHamburger && mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
      const icon = hamburgerBtn.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
      const icon = hamburgerBtn.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });

});
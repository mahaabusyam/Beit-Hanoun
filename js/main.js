/*responsive*/
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger-btn");
  const navMenu = document.querySelector(".nav-menu");
  const navbar = document.querySelector(".navbar");
  
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });
  
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });
  
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const fadeCards = document.querySelectorAll(".hidden-card");
  
  const observerOptions = {
    root: null,
    threshold: 0.2
  };
  
  const cardObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show-card");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  fadeCards.forEach(card => {
    cardObserver.observe(card);
  });
});
/*about section*/
document.addEventListener("DOMContentLoaded", () => {
  const statCards = document.querySelectorAll(".stat-card");
  const statNumbers = document.querySelectorAll(".stat-number");
  
  const animateCounter = (element) => {
    const target = +element.getAttribute("data-target");
    const duration = 2000;
    const startTime = performance.now();
    
    const updateNumber = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(easeOutProgress * target);
      
      element.innerText = currentValue.toLocaleString("en-US");
      
      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        element.innerText = target.toLocaleString("en-US");
      }
    };
    
    requestAnimationFrame(updateNumber);
  };
  
  const observerOptions = {
    threshold: 0.2
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statCards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add("visible");
          }, index * 150);
        });
        
        statNumbers.forEach(num => animateCounter(num));
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  const targetSection = document.querySelector(".about-section");
  
  if (targetSection) {
    observer.observe(targetSection);
  }
});
/*dashboard section*/
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");
  const speed = 60;
  
  const startCounter = (counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText.replace(/,/g, "");
      const inc = Math.ceil(target / speed);
      
      if (count < target) {
        counter.innerText = (count + inc).toLocaleString("en-US");
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target.toLocaleString("en-US");
      }
    };
    
    updateCount();
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });
  
  counters.forEach(counter => {
    observer.observe(counter);
  });
});

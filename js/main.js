// Main JavaScript file for Nidhi Mechanical Works website

;(() => {
  // Initialize AOS (Animate On Scroll) if available
  if (typeof AOS !== "undefined" && typeof AOS.init === "function") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    })
  }

  // DOM Elements
  const header = document.getElementById("header")
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const mobileMenu = document.querySelector(".mobile-menu")
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")
  const themeToggle = document.getElementById("theme-toggle")
  const scrollTopButton = document.querySelector(".scroll-top-button")
  const floatingMenuToggle = document.querySelector(".menu-toggle-button")
  const floatingMenu = document.querySelector(".floating-menu")
  const currentYearSpan = document.getElementById("current-year")

  // Set current year
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear()
  }

  // Header scroll effect
  function handleScroll() {
    if (window.scrollY > 50) {
      header?.classList.add("scrolled")
    } else {
      header?.classList.remove("scrolled")
    }

    // Show/hide scroll to top button
    if (window.scrollY > 300) {
      scrollTopButton?.classList.add("visible")
    } else {
      scrollTopButton?.classList.remove("visible")
    }
  }

  // Mobile menu toggle
  function toggleMobileMenu() {
    const isActive = mobileMenu?.classList.contains("active")

    if (isActive) {
      mobileMenu.classList.remove("active")
      mobileMenuToggle?.classList.remove("active")
      document.body.style.overflow = ""
    } else {
      mobileMenu?.classList.add("active")
      mobileMenuToggle?.classList.add("active")
      document.body.style.overflow = "hidden"
    }
  }

  // Close mobile menu
  function closeMobileMenu() {
    mobileMenu?.classList.remove("active")
    mobileMenuToggle?.classList.remove("active")
    document.body.style.overflow = ""
  }

  // Theme toggle functionality
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme")
    const newTheme = currentTheme === "dark" ? "light" : "dark"

    document.documentElement.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)

    // Update theme toggle icon
    const icon = themeToggle?.querySelector("i")
    if (icon) {
      if (newTheme === "dark") {
        icon.className = "fas fa-sun"
      } else {
        icon.className = "fas fa-moon"
      }
    }
  }

  // Initialize theme
  function initTheme() {
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const theme = savedTheme || (prefersDark ? "dark" : "light")

    document.documentElement.setAttribute("data-theme", theme)

    // Update theme toggle icon
    const icon = themeToggle?.querySelector("i")
    if (icon) {
      if (theme === "dark") {
        icon.className = "fas fa-sun"
      } else {
        icon.className = "fas fa-moon"
      }
    }
  }

  // Floating menu toggle
  function toggleFloatingMenu() {
    floatingMenu?.classList.toggle("active")
  }

  // Scroll to top
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // Smooth scroll for anchor links
  function handleAnchorClick(e) {
    const href = e.target.getAttribute("href")

    if (href && href.startsWith("#")) {
      e.preventDefault()
      const target = document.querySelector(href)

      if (target) {
        const headerHeight = header?.offsetHeight || 80
        const targetPosition = target.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    }
  }
  
     // Stats counter animation
    const statValues = document.querySelectorAll('.stat-value');
    let statsAnimated = false;

    function animateStats() {
        if (statsAnimated) return;
        
        statValues.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 5000; // 5 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const counter = setInterval(() => {
                current += increment;
                
                if (current >= target) {
                    stat.textContent = target + (target === 99 ? '%' : '+');
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(current) + (target === 99 ? '%' : '+');
                }
            }, 16);
        });
        
        statsAnimated = true;
    }

    // Check if stats section is in viewport
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(statsSection);
    }

  // Wait for DOM to load
  document.addEventListener("DOMContentLoaded", () => {
    const statsSection = document.querySelector(".stats-section");

    if (statsSection) {
      const observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateStats();
              observer.disconnect(); // Run only once
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(statsSection);
    }
  });
  
  // Testimonials slider
  function initTestimonials() {
    const slides = document.querySelectorAll(".testimonial-slide")
    const dots = document.querySelectorAll(".testimonial-dot")
    const prevBtn = document.querySelector(".testimonial-prev")
    const nextBtn = document.querySelector(".testimonial-next")
    let currentSlide = 0
    let autoplayInterval

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index)
      })

      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index)
      })
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length
      showSlide(currentSlide)
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length
      showSlide(currentSlide)
    }

    function startAutoplay() {
      autoplayInterval = setInterval(nextSlide, 5000)
    }

    function stopAutoplay() {
      clearInterval(autoplayInterval)
    }

    // Event listeners
    nextBtn?.addEventListener("click", () => {
      stopAutoplay()
      nextSlide()
      startAutoplay()
    })

    prevBtn?.addEventListener("click", () => {
      stopAutoplay()
      prevSlide()
      startAutoplay()
    })

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        stopAutoplay()
        currentSlide = index
        showSlide(currentSlide)
        startAutoplay()
      })
    })

    // Initialize
    if (slides.length > 0) {
      showSlide(0)
      startAutoplay()
    }
  }

  // Modal functionality
  function initModals() {
    const modals = document.querySelectorAll(".modal")
    const modalTriggers = document.querySelectorAll("[data-modal]")
    const modalCloses = document.querySelectorAll(".modal-close")

    function openModal(modalId) {
      const modal = document.getElementById(modalId)
      if (modal) {
        modal.classList.add("active")
        document.body.style.overflow = "hidden"
      }
    }

    function closeModal(modalId) {
      const modal = document.getElementById(modalId)
      if (modal) {
        modal.classList.remove("active")
        document.body.style.overflow = ""
      }
    }

    // Modal triggers
    modalTriggers.forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault()
        const modalId = trigger.getAttribute("data-modal") + "-modal"
        openModal(modalId)
      })
    })

    // Modal close buttons
    modalCloses.forEach((close) => {
      close.addEventListener("click", () => {
        const modal = close.closest(".modal")
        if (modal) {
          modal.classList.remove("active")
          document.body.style.overflow = ""
        }
      })
    })

    // Close modal on backdrop click
    modals.forEach((modal) => {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.remove("active")
          document.body.style.overflow = ""
        }
      })
    })

    // Close modal on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        modals.forEach((modal) => {
          if (modal.classList.contains("active")) {
            modal.classList.remove("active")
            document.body.style.overflow = ""
          }
        })
      }
    })

    // Make closeModal function global for inline onclick handlers
    window.closeModal = closeModal
  }

  // MM to Inch Converter
  function initConverter() {
    const mmInput = document.getElementById("mm-input")
    const inchInput = document.getElementById("inch-input")

    function mmToInch(mm) {
      return mm * 0.03937
    }

    function inchToMm(inch) {
      return inch * 25.4
    }

    mmInput?.addEventListener("input", (e) => {
      const mmValue = Number.parseFloat(e.target.value)
      if (!isNaN(mmValue)) {
        inchInput.value = mmToInch(mmValue).toFixed(4)
      } else {
        inchInput.value = ""
      }
    })

    inchInput?.addEventListener("input", (e) => {
      const inchValue = Number.parseFloat(e.target.value)
      if (!isNaN(inchValue)) {
        mmInput.value = inchToMm(inchValue).toFixed(4)
      } else {
        mmInput.value = ""
      }
    })
  }

  // Intersection Observer for animations
  function initIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animate stats when they come into view
          if (entry.target.id === "stats-section") {
            animateStats()
          }

          // Add animation classes
          entry.target.classList.add("animate-in")
        }
      })
    }, observerOptions)

    // Observe elements
    const elementsToObserve = document.querySelectorAll(".feature-card, .product-card, .service-card, #stats-section")
    elementsToObserve.forEach((el) => observer.observe(el))
  }

  // Form validation and submission
  function initForms() {
    const forms = document.querySelectorAll("form")

    forms.forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault()

        // Basic form validation
        const requiredFields = form.querySelectorAll("[required]")
        let isValid = true

        requiredFields.forEach((field) => {
          if (!field.value.trim()) {
            isValid = false
            field.classList.add("error")
          } else {
            field.classList.remove("error")
          }
        })

        if (isValid) {
          // Show success message
          showNotification("Thank you for your message. We will get back to you soon!", "success")
          form.reset()
        } else {
          showNotification("Please fill in all required fields.", "error")
        }
      })
    })
  }

  // Notification system
  function showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.textContent = message

    // Add styles
    Object.assign(notification.style, {
      position: "fixed",
      top: "20px",
      right: "20px",
      padding: "15px 20px",
      borderRadius: "5px",
      color: "white",
      zIndex: "9999",
      maxWidth: "300px",
      fontSize: "14px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    })

    // Set background color based on type
    switch (type) {
      case "success":
        notification.style.backgroundColor = "#10b981"
        break
      case "error":
        notification.style.backgroundColor = "#ef4444"
        break
      default:
        notification.style.backgroundColor = "#3b82f6"
    }

    document.body.appendChild(notification)

    // Remove after 5 seconds
    setTimeout(() => {
      notification.remove()
    }, 5000)
  }

  // Lazy loading for images
  function initLazyLoading() {
    const images = document.querySelectorAll("img[data-src]")

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          img.classList.remove("lazy")
          imageObserver.unobserve(img)
        }
      })
    })

    images.forEach((img) => imageObserver.observe(img))
  }

  // Event Listeners
  window.addEventListener("scroll", handleScroll)
  window.addEventListener("resize", () => {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
      closeMobileMenu()
    }
  })

  // Mobile menu
  mobileMenuToggle?.addEventListener("click", toggleMobileMenu)
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu)
  })

  // Theme toggle
  themeToggle?.addEventListener("click", toggleTheme)

  // Floating menu
  floatingMenuToggle?.addEventListener("click", toggleFloatingMenu)

  // Scroll to top
  scrollTopButton?.addEventListener("click", scrollToTop)

  // Anchor links
  document.addEventListener("click", (e) => {
    if (e.target.tagName === "A" && e.target.getAttribute("href")?.startsWith("#")) {
      handleAnchorClick(e)
    }
  })

  // Close floating menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".floating-buttons")) {
      floatingMenu?.classList.remove("active")
    }
  })

  // Initialize everything when DOM is loaded
  document.addEventListener("DOMContentLoaded", () => {
    initTheme()
    initTestimonials()
    initModals()
    initConverter()
    initIntersectionObserver()
    initForms()
    initLazyLoading()

    // Initial scroll check
    handleScroll()
  })

  // Handle page visibility change
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      // Pause animations when page is not visible
      document.body.classList.add("page-hidden")
    } else {
      // Resume animations when page becomes visible
      document.body.classList.remove("page-hidden")
    }
  })

  // Service Worker registration (if available)
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW registered: ", registration)
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError)
        })
    })
  }
})()

// Utility functions available globally
window.NidhiMechanical = {
  // Smooth scroll to element
  scrollTo: (elementId) => {
    const element = document.getElementById(elementId)
    if (element) {
      const headerHeight = document.getElementById("header")?.offsetHeight || 80
      const targetPosition = element.offsetTop - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  },

  // Open WhatsApp chat
  openWhatsApp: (message = "") => {
    const defaultMessage = "Hello, I'm interested in your products. Could you provide more information?"
    const whatsappMessage = message || defaultMessage
    const url = `https://wa.me/919173832830?text=${encodeURIComponent(whatsappMessage)}`
    window.open(url, "_blank")
  },

  // Format phone number for display
  formatPhone: (phone) => phone.replace(/(\d{2})(\d{5})(\d{5})/, "+$1 $2 $3"),

  // Validate email
  validateEmail: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  },

  // Convert MM to Inches
  mmToInch: (mm) => mm * 0.03937,

  // Convert Inches to MM
  inchToMm: (inch) => inch * 25.4,
}

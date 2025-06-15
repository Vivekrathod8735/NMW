(() => {
  // Initialize contact functionality
  function initContact() {
    initFAQ()
    initContactForm()
    initFileUpload()
    initFormValidation()
    initURLParams()
  }

  // FAQ functionality
  function initFAQ() {
    const faqItems = document.querySelectorAll(".faq-item")

    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question")
      const answer = item.querySelector(".faq-answer")
      const icon = question.querySelector("i")

      question.addEventListener("click", () => {
        const isOpen = item.classList.contains("active")

        // Close all other FAQ items
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("active")
            const otherAnswer = otherItem.querySelector(".faq-answer")
            const otherIcon = otherItem.querySelector(".faq-question i")
            otherAnswer.style.maxHeight = "0"
            otherIcon.className = "fas fa-plus"
          }
        })

        // Toggle current item
        if (isOpen) {
          item.classList.remove("active")
          answer.style.maxHeight = "0"
          icon.className = "fas fa-plus"
        } else {
          item.classList.add("active")
          answer.style.maxHeight = answer.scrollHeight + "px"
          icon.className = "fas fa-minus"
        }
      })
    })
  }

  // Placeholder functions — implement as needed
  function initContactForm() {
    console.log("Contact form initialized.")
  }

  function initFileUpload() {
    console.log("File upload initialized.")
  }

  function initFormValidation() {
    console.log("Form validation initialized.")
  }

  function initURLParams() {
    console.log("URL parameters parsed.")
  }

const faqStyles = `
  .faq-item {
    background: var(--bg-secondary);
    border-radius: 10px;
    margin-bottom: 15px;
    padding: 15px 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    cursor: pointer;
    transition: all 0.3s ease;
    color: var(--text-primary);
  }

  .faq-item.active {
    background: var(--bg-accent);
    border-left: 4px solid var(--primary-color);
  }

  .faq-question {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 900;
    font-size: 16px;
    color: var(--text-primary);
  }

  .faq-question i {
    transition: transform 0.3s ease;
    color: var(--primary-color);
  }

  .faq-answer {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
    font-size: 15px;
    line-height: 1.5;
    margin-top: 10px;
    color: var(--text-secondary);
  }

  .faq-item.active .faq-question i {
    transform: rotate(180deg);
    color: var(--secondary-color);
  }
`
  // Inject styles into document
  const styleTag = document.createElement("style")
  styleTag.textContent = faqStyles
  document.head.appendChild(styleTag)

  // Initialize on DOMContentLoaded
  document.addEventListener("DOMContentLoaded", () => {
    initContact()
  })
})()(() => {
  // FAQ functionality
  function initFAQ() {
    const faqItems = document.querySelectorAll(".faq-item");
    
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question");
      const answer = item.querySelector(".faq-answer");
      const icon = question.querySelector("i");
      
      question.addEventListener("click", () => {
        const isOpen = item.classList.contains("active");
        
        // Close all other FAQ items
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("active");
            const otherAnswer = otherItem.querySelector(".faq-answer");
            const otherIcon = otherItem.querySelector(".faq-question i");
            otherAnswer.style.maxHeight = "0";
            otherIcon.className = "fas fa-plus";
          }
        });
        
        // Toggle current item
        if (isOpen) {
          item.classList.remove("active");
          answer.style.maxHeight = "0";
          icon.className = "fas fa-plus";
        } else {
          item.classList.add("active");
          answer.style.maxHeight = answer.scrollHeight + "px";
          icon.className = "fas fa-minus";
        }
      });
      
      // Initialize with collapsed state
      answer.style.maxHeight = "0";
    });
  }
  
  // Wait for DOM to load before running
  document.addEventListener("DOMContentLoaded", () => {
    initFAQ();
  });
})();
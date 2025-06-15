(() => {
  function initContact() {
    initFAQ();
    initURLParams();
  }

  // FAQ toggle logic
  function initFAQ() {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question");
      const answer = item.querySelector(".faq-answer");
      const icon = question.querySelector("i");

      question.addEventListener("click", () => {
        const isOpen = item.classList.contains("active");

        // Close others
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("active");
            const otherAnswer = otherItem.querySelector(".faq-answer");
            const otherIcon = otherItem.querySelector(".faq-question i");
            otherAnswer.style.maxHeight = "0";
            otherIcon.className = "fas fa-plus";
          }
        });

        // Toggle current
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

      // Collapse all by default
      answer.style.maxHeight = "0";
    });
  }

  // FAQ styles
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
  `;

  // Inject styles
  const styleTag = document.createElement("style");
  styleTag.textContent = faqStyles;
  document.head.appendChild(styleTag);

  // Start everything on DOM load
  document.addEventListener("DOMContentLoaded", () => {
    initContact();
  });
})();

    // Initialize EmailJS
    emailjs.init("an5kvMl59Frj9-7yW");

    document.getElementById("contact-form").addEventListener("submit", function(e) {
      e.preventDefault();

      const statusEl = document.getElementById("status");

      // Collect form data
      const formData = {
        from_name: this.from_name.value,
        reply_to: this.reply_to.value,
        phone: this.phone.value,
        message: this.message.value,
      };

      // WhatsApp message
      const whatsappText = `Hello!%0AMy Name: ${formData.from_name}%0AEmail: ${formData.reply_to}%0APhone: ${formData.phone}%0AMessage: ${formData.message}`;
      const whatsappURL = `https://wa.me/918735890374?text=${whatsappText}`;

      // Send email using EmailJS
      emailjs.send("service_37wvtrd", "template_dm1bv7m", formData)
        .then(function(response) {
          console.log("✅ SUCCESS!", response.status, response.text);
          statusEl.textContent = "Message sent successfully!";
          // Open WhatsApp
          window.open(whatsappURL, "_blank");
        }, function(error) {
          console.error("❌ FAILED...", error);
          statusEl.textContent = "Something went wrong. Please try again.";
        });
    });
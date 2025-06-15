// Gallery JavaScript functionality

;(() => {
  let lightbox = null
  let currentImageIndex = 0
  let galleryImages = []
  let isVideoModalOpen = false

  // Initialize gallery functionality
  function initGallery() {
    initImageGallery()
    initVideoGallery()
    initGalleryFilters()
    initLoadMore()
  }

  // Image gallery with lightbox
  function initImageGallery() {
    const galleryItems = document.querySelectorAll(".gallery-item")
    galleryImages = Array.from(galleryItems)

    galleryItems.forEach((item, index) => {
      item.addEventListener("click", (e) => {
        e.preventDefault()
        openLightbox(index)
      })
    })

    createLightbox()
  }

  // Create lightbox modal
  function createLightbox() {
    lightbox = document.createElement("div")
    lightbox.className = "lightbox-modal"
    lightbox.innerHTML = `
            <div class="lightbox-overlay">
                <div class="lightbox-container">
                    <button class="lightbox-close" aria-label="Close lightbox">
                        <i class="fas fa-times"></i>
                    </button>
                    <button class="lightbox-prev" aria-label="Previous image">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <button class="lightbox-next" aria-label="Next image">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                    <div class="lightbox-content">
                        <img class="lightbox-image" src="/placeholder.svg" alt="">
                        <div class="lightbox-info">
                            <h3 class="lightbox-title"></h3>
                            <p class="lightbox-category"></p>
                        </div>
                    </div>
                    <div class="lightbox-counter">
                        <span class="current-image">1</span> / <span class="total-images">1</span>
                    </div>
                </div>
            </div>
        `

    // Add lightbox styles
    const lightboxStyles = `
            .lightbox-modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 9999;
                background-color: rgba(0, 0, 0, 0.9);
            }
            
            .lightbox-modal.active {
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .lightbox-overlay {
                position: relative;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .lightbox-container {
                position: relative;
                max-width: 90%;
                max-height: 90%;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            
            .lightbox-content {
                position: relative;
                text-align: center;
            }
            
            .lightbox-image {
                max-width: 100%;
                max-height: 80vh;
                object-fit: contain;
                border-radius: 8px;
            }
            
            .lightbox-info {
                margin-top: 20px;
                color: white;
            }
            
            .lightbox-title {
                font-size: 1.5rem;
                margin-bottom: 5px;
                color: white;
            }
            
            .lightbox-category {
                color: #ccc;
                margin: 0;
            }
            
            .lightbox-close,
            .lightbox-prev,
            .lightbox-next {
                position: absolute;
                background: rgba(255, 255, 255, 0.2);
                border: none;
                color: white;
                font-size: 1.5rem;
                padding: 15px;
                border-radius: 50%;
                cursor: pointer;
                transition: background-color 0.3s ease;
                z-index: 10001;
            }
            
            .lightbox-close:hover,
            .lightbox-prev:hover,
            .lightbox-next:hover {
                background: rgba(255, 255, 255, 0.3);
            }
            
            .lightbox-close {
                top: 20px;
                right: 20px;
            }
            
            .lightbox-prev {
                left: 20px;
                top: 50%;
                transform: translateY(-50%);
            }
            
            .lightbox-next {
                right: 20px;
                top: 50%;
                transform: translateY(-50%);
            }
            
            .lightbox-counter {
                position: absolute;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                color: white;
                background: rgba(0, 0, 0, 0.5);
                padding: 10px 20px;
                border-radius: 20px;
                font-size: 0.9rem;
            }
            
            @media (max-width: 768px) {
                .lightbox-close,
                .lightbox-prev,
                .lightbox-next {
                    padding: 10px;
                    font-size: 1.2rem;
                }
                
                .lightbox-close {
                    top: 10px;
                    right: 10px;
                }
                
                .lightbox-prev {
                    left: 10px;
                }
                
                .lightbox-next {
                    right: 10px;
                }
                
                .lightbox-counter {
                    bottom: 10px;
                    padding: 8px 16px;
                    font-size: 0.8rem;
                }
            }
        `

    // Add styles to head
    const styleSheet = document.createElement("style")
    styleSheet.textContent = lightboxStyles
    document.head.appendChild(styleSheet)

    document.body.appendChild(lightbox)

    // Event listeners
    lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox)
    lightbox.querySelector(".lightbox-prev").addEventListener("click", showPrevImage)
    lightbox.querySelector(".lightbox-next").addEventListener("click", showNextImage)
    lightbox.querySelector(".lightbox-overlay").addEventListener("click", (e) => {
      if (e.target === e.currentTarget) {
        closeLightbox()
      }
    })

    // Keyboard navigation
    document.addEventListener("keydown", handleKeydown)
  }

  // Open lightbox
  function openLightbox(index) {
    currentImageIndex = index
    updateLightboxContent()
    lightbox.classList.add("active")
    document.body.style.overflow = "hidden"
  }

  // Close lightbox
  function closeLightbox() {
    lightbox.classList.remove("active")
    document.body.style.overflow = ""
  }

  // Show previous image
  function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length
    updateLightboxContent()
  }

  // Show next image
  function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length
    updateLightboxContent()
  }

  // Update lightbox content
  function updateLightboxContent() {
    const currentItem = galleryImages[currentImageIndex]
    const img = currentItem.querySelector("img")
    const info = currentItem.querySelector(".gallery-info")

    const lightboxImage = lightbox.querySelector(".lightbox-image")
    const lightboxTitle = lightbox.querySelector(".lightbox-title")
    const lightboxCategory = lightbox.querySelector(".lightbox-category")
    const currentCounter = lightbox.querySelector(".current-image")
    const totalCounter = lightbox.querySelector(".total-images")

    lightboxImage.src = img.src
    lightboxImage.alt = img.alt

    if (info) {
      lightboxTitle.textContent = info.querySelector("h3")?.textContent || ""
      lightboxCategory.textContent = info.querySelector("p")?.textContent || ""
    }

    currentCounter.textContent = currentImageIndex + 1
    totalCounter.textContent = galleryImages.length
  }

  // Handle keyboard navigation
  function handleKeydown(e) {
    if (!lightbox.classList.contains("active") && !isVideoModalOpen) return

    switch (e.key) {
      case "Escape":
        if (lightbox.classList.contains("active")) {
          closeLightbox()
        } else if (isVideoModalOpen) {
          closeVideoModal()
        }
        break
      case "ArrowLeft":
        if (lightbox.classList.contains("active")) {
          showPrevImage()
        }
        break
      case "ArrowRight":
        if (lightbox.classList.contains("active")) {
          showNextImage()
        }
        break
    }
  }

  // Video gallery functionality
  function initVideoGallery() {
    const videoPlayBtns = document.querySelectorAll(".video-play-btn")

    videoPlayBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault()
        const videoUrl = btn.getAttribute("data-video")
        openVideoModal(videoUrl)
      })
    })
  }

  // Open video modal
  function openVideoModal(videoUrl) {
    const videoModal = document.getElementById("video-modal")
    const videoFrame = document.getElementById("video-frame")

    if (videoModal && videoFrame) {
      videoFrame.src = videoUrl
      videoModal.style.display = "flex"
      isVideoModalOpen = true
      document.body.style.overflow = "hidden"
    }
  }

  // Close video modal
  function closeVideoModal() {
    const videoModal = document.getElementById("video-modal")
    const videoFrame = document.getElementById("video-frame")

    if (videoModal && videoFrame) {
      videoFrame.src = ""
      videoModal.style.display = "none"
      isVideoModalOpen = false
      document.body.style.overflow = ""
    }
  }

  // Gallery filters
  function initGalleryFilters() {
    const filterButtons = document.querySelectorAll(".filter-button")
    const galleryItems = document.querySelectorAll(".gallery-item")

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.getAttribute("data-filter")

        // Update active button
        filterButtons.forEach((btn) => btn.classList.remove("active"))
        button.classList.add("active")

        // Filter gallery items
        galleryItems.forEach((item) => {
          const category = item.getAttribute("data-category")

          if (filter === "all" || category === filter) {
            item.style.display = "block"
            item.style.animation = "fadeIn 0.5s ease-in-out"
          } else {
            item.style.display = "none"
          }
        })

        // Update gallery images array for lightbox
        galleryImages = Array.from(
          document.querySelectorAll('.gallery-item[style*="block"], .gallery-item:not([style])'),
        )
      })
    })
  }

  // Load more functionality
  function initLoadMore() {
    const loadMoreBtn = document.getElementById("load-more")
    let currentlyVisible = 12 // Initial number of visible items

    if (loadMoreBtn) {
      loadMoreBtn.addEventListener("click", () => {
        const hiddenItems = document.querySelectorAll(".gallery-item.hidden")
        const itemsToShow = Array.from(hiddenItems).slice(0, 6)

        itemsToShow.forEach((item) => {
          item.classList.remove("hidden")
          item.style.animation = "fadeInUp 0.5s ease-in-out"
        })

        currentlyVisible += itemsToShow.length

        // Hide load more button if no more items
        if (hiddenItems.length <= 6) {
          loadMoreBtn.style.display = "none"
        }
      })
    }
  }

  // Touch/swipe support for mobile
  function initTouchSupport() {
    let startX = 0
    let startY = 0
    let endX = 0
    let endY = 0

    lightbox.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
    })

    lightbox.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX
      endY = e.changedTouches[0].clientY

      const deltaX = endX - startX
      const deltaY = endY - startY

      // Check if it's a horizontal swipe
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          showPrevImage()
        } else {
          showNextImage()
        }
      }
    })
  }

  // Initialize when DOM is loaded
  document.addEventListener("DOMContentLoaded", () => {
    initGallery()
    initTouchSupport()

    // Close video modal when clicking close button
    const videoModalClose = document.querySelector("#video-modal .modal-close")
    if (videoModalClose) {
      videoModalClose.addEventListener("click", closeVideoModal)
    }

    // Close video modal when clicking outside
    const videoModal = document.getElementById("video-modal")
    if (videoModal) {
      videoModal.addEventListener("click", (e) => {
        if (e.target === videoModal) {
          closeVideoModal()
        }
      })
    }
  })

  // Add CSS animations
  const animationStyles = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .gallery-item.hidden {
            display: none;
        }
        
        .filter-button {
            padding: 10px 20px;
            margin: 5px;
            border: 2px solid var(--primary-color);
            background: transparent;
            color: var(--primary-color);
            border-radius: 25px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 500;
        }
        
        .filter-button:hover,
        .filter-button.active {
            background: var(--primary-color);
            color: white;
        }
        
        .gallery-filter {
            text-align: center;
            margin-bottom: 40px;
        }
        
        .gallery-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }
        
        .gallery-item {
            position: relative;
            overflow: hidden;
            border-radius: 10px;
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        
        .gallery-item:hover {
            transform: translateY(-5px);
        }
        
        .gallery-item img {
            width: 100%;
            height: 250px;
            object-fit: cover;
            transition: transform 0.3s ease;
        }
        
        .gallery-item:hover img {
            transform: scale(1.05);
        }
        
        .gallery-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.8));
            opacity: 0;
            transition: opacity 0.3s ease;
            display: flex;
            align-items: flex-end;
            padding: 20px;
        }
        
        .gallery-item:hover .gallery-overlay {
            opacity: 1;
        }
        
        .gallery-info h3 {
            color: white;
            margin: 0 0 5px 0;
            font-size: 1.2rem;
        }
        
        .gallery-info p {
            color: #ccc;
            margin: 0;
            font-size: 0.9rem;
        }
        
        .video-gallery-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 30px;
        }
        
        .video-item {
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
        }
        
        .video-item:hover {
            transform: translateY(-5px);
        }
        
        .video-thumbnail {
            position: relative;
            height: 200px;
            overflow: hidden;
        }
        
        .video-thumbnail img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .video-play-btn {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 60px;
            height: 60px;
            background: rgba(189, 140, 125, 0.9);
            border: none;
            border-radius: 50%;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .video-play-btn:hover {
            background: var(--primary-color);
            transform: translate(-50%, -50%) scale(1.1);
        }
        
        .video-info {
            padding: 20px;
        }
        
        .video-info h3 {
            margin: 0 0 10px 0;
            color: var(--accent-color);
        }
        
        .video-info p {
            margin: 0;
            color: var(--text-secondary);
            font-size: 0.9rem;
        }
        
        @media (max-width: 768px) {
            .gallery-grid {
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 15px;
            }
            
            .video-gallery-grid {
                grid-template-columns: 1fr;
                gap: 20px;
            }
            
            .filter-button {
                padding: 8px 16px;
                font-size: 0.9rem;
            }
        }
    `

  // Add styles to head
  const styleSheet = document.createElement("style")
  styleSheet.textContent = animationStyles
  document.head.appendChild(styleSheet)
})()

import { fetchTestimonials } from "./data.js";

class Testimonial {
  constructor() {
    this.sliderCon = document.querySelector(".slider-container");
    this.cardWidth = 270; // Card width (250px) + gap (20px)
    this.animationSpeed = 1; // pixels per frame
    this.init();
  }

  async init() {
    const reviews = await fetchTestimonials();

    // Create initial set of cards
    this.createCards(reviews);

    // Start the animation
    this.startAnimation();
  }

  createCards(reviews) {
    // Create more cards than viewport to ensure continuous flow
    const repeats = Math.ceil(window.innerWidth / this.cardWidth) * 2;

    for (let i = 0; i < repeats; i++) {
      const review = reviews[i % reviews.length];
      const card = this.createCardElement(review);

      // Position the card initially
      card.style.left = `${i * this.cardWidth}px`;
      card.style.position = "absolute";

      this.sliderCon.appendChild(card);
    }
  }

  createCardElement(item) {
    const cont = document.createElement("div");
    cont.classList.add("testimonial-card");
    cont.innerHTML = `<div class="test-rating">
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
      </div>
      <div class="test-heading">
        <div class="test-profile-img">
          <img
            src=${item.pic}
          />
        </div>
        <div class="test-profile-detail">
          <div class="test-profile-name">${item.name}</div>
          <div class="test-profile-job">${item.work}</div>
        </div>
      </div>
      <div class="test-desc">
       ${item.test}
      </div>`;

    return cont;
  }

  startAnimation() {
    this.animate();
  }

  animate() {
    const cards = Array.from(this.sliderCon.children);

    cards.forEach((card) => {
      // Get current position
      let currentLeft = parseFloat(card.style.left);

      // Move right by animation speed
      currentLeft += this.animationSpeed;

      // If card has moved completely off-screen to the right
      if (currentLeft > window.innerWidth) {
        // Find the leftmost card's position
        let minLeft = Math.min(...cards.map((c) => parseFloat(c.style.left)));
        // Place this card to the left of the leftmost card
        currentLeft = minLeft - this.cardWidth;
      }

      // Apply the new position
      card.style.left = `${currentLeft}px`;
    });

    // Continue animation
    requestAnimationFrame(this.animate.bind(this));
  }
}

new Testimonial();

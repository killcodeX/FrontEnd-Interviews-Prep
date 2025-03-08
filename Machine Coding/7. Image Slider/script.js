import { fetchImagesApi } from "./data.js";

class ImageSlider {
  constructor() {
    this.imageCont = document.querySelector(".image-container");
    this.imageSlide = document.querySelectorAll(".image-slide");
    this.prevBtn = document.querySelector(".prev-btn");
    this.nxtBtn = document.querySelector(".nxt-btn");
    this.sliderDotCont = document.querySelector(".slider-dots");
    this.idx = 0;
    this.totalSlides = 0;
    this.init();
  }

  async init() {
    try {
      const imageUrls = await fetchImagesApi();
      this.totalSlides = imageUrls.length;
      this.buildLayout(imageUrls);
      this.createDots();
      this.handleDisable();
    } catch (err) {
      console.error("this is err", err);
    }
    this.prevBtn.addEventListener("click", () => this.handlePrev());
    this.nxtBtn.addEventListener("click", () => this.handleNxt());
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft" && this.idx > 0) {
        this.handlePrev();
      } else if (e.key === "ArrowRight" && this.idx < this.totalSlides - 1) {
        this.handleNxt();
      }
    });
  }

  buildLayout(urls) {
    for (let i = 0; i < urls.length; i++) {
      let imageSlide = document.createElement("div");
      let imge = document.createElement("img");
      imge.src = urls[i].url;
      imageSlide.append(imge);
      imageSlide.classList = "image-slide";
      this.imageCont.append(imageSlide);
    }
  }

  createDots() {
    for (let i = 0; i < this.totalSlides; i++) {
      let dot = document.createElement("div");
      dot.classList = "dot";
      this.updateDots();
      this.sliderDotCont.append(dot);
    }
  }

  updateDots() {
    const dots = Array.from(this.sliderDotCont.children);
    dots.forEach((item, index) => {
      if (index === this.idx) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  goToSlide() {
    const imageCont = Array.from(this.imageCont.children);
    imageCont.forEach((item) => {
      item.style.transform = `translateX(-${this.idx * 100}%)`;
    });
  }

  handlePrev() {
    this.idx--;
    this.goToSlide();
    this.updateDots();
    this.handleDisable();
  }

  handleNxt() {
    this.idx++;
    this.goToSlide();
    this.updateDots();
    this.handleDisable();
  }

  handleDisable() {
    if (this.idx < 1) {
      this.prevBtn.disabled = true;
    } else {
      this.prevBtn.disabled = false;
    }

    if (this.idx >= this.totalSlides - 1) {
      this.nxtBtn.disabled = true;
    } else {
      this.nxtBtn.disabled = false;
    }
  }
}

new ImageSlider();

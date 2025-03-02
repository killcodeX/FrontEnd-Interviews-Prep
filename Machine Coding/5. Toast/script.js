class Toast {
  constructor() {
    this.topLeft = document.querySelector("#top-left");
    this.topRight = document.querySelector("#top-right");
    this.bottomLeft = document.querySelector("#bottom-left");
    this.bottomRight = document.querySelector("#bottom-right");
    this.topL = 50
    this.topR = 50
    this.topIndex = 1
    this.init();
  }

  init() {
    // attaching event top-left
    this.topLeft.addEventListener("click", () =>{ 
      let currIndex = 1
      this.alert("top-left", "Top Left called!", currIndex)
    }
    );
    // attaching event top-left
    this.topRight.addEventListener("click", () =>
    {
      let currIndex = 1
      this.alert("top-right", "Top Right called!", currIndex)
    }
    );
    // attaching event top-left
    this.bottomLeft.addEventListener("click", () =>
      this.alert("bottom-left", "Bottom Left called!")
    );
    // attaching event top-left
    this.bottomRight.addEventListener("click", () =>
      this.alert("bottom-right", "Bottom Right called!")
    );
  }

  async alert(position, message, index) {
    const toastCont = document.createElement("div");
    toastCont.classList.add("toast-container");
    toastCont.innerHTML = `<p>${message} ${index}</p> <div class="toast-footer"></div>`;
    index++
    document.body.append(toastCont);

    if (position === "top-left") {
      toastCont.style.top = `${this.topL}px`;
      toastCont.style.left = "50px";
      toastCont.style.translate=`translateY(${this.topL})`
      this.topL+=55
    }

    if (position === "top-right") {
      toastCont.style.top = `${this.topR}px`;
      toastCont.style.right = "50px";
      toastCont.style.translate=`translateY(${this.topR})`
      this.topR+=55
    }

    if (position === "bottom-left") {
      toastCont.style.bottom = "50px";
      toastCont.style.left = "50px";
    }

    if (position === "bottom-right") {
      toastCont.style.bottom = "50px";
      toastCont.style.right = "50px";
    }

    this.hideAlert(toastCont)
  }

  hideAlert(comp){
    let footer = comp.querySelector(".toast-footer");
    let width = 100;
    
    const timer = setInterval(() => {
      width -= 1;
      footer.style.width = `${width}%`;
      
      // Check if width has reached 0 inside the interval callback
      if (width <= 0) {
        clearInterval(timer);
        this.topL-=55
        this.topR-=55
        // Remove the element from the DOM instead of hiding it
        comp.remove();
      }
    }, 100);
  }
}

new Toast();
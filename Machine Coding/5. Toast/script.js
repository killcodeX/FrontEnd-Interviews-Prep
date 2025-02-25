class Toast {
  constructor() {
    this.topLeft = document.querySelector("#top-left");
    this.topRight = document.querySelector("#top-right");
    this.bottomLeft = document.querySelector("#bottom-left");
    this.bottomRight = document.querySelector("#bottom-right");

    this.init();
  }

  init() {
    // attaching event top-left
    this.topLeft.addEventListener("click", () =>
      this.alert("top-left", "Top Left called!")
    );
    // attaching event top-left
    this.topRight.addEventListener("click", () =>
      this.alert("top-right", "Top Right called!")
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

  alert(position, message) {
    const toastCont = document.createElement("div");
    toastCont.classList.add("toast-container");
    toastCont.innerText = message;
    document.body.append(toastCont);

    if (position === "top-left") {
      toastCont.style.top = "50px";
      toastCont.style.left = "50px";
    }

    if (position === "top-right") {
      toastCont.style.top = "50px";
      toastCont.style.right = "50px";
    }

    if (position === "bottom-left") {
      toastCont.style.bottom = "50px";
      toastCont.style.left = "50px";
    }

    if (position === "bottom-right") {
      toastCont.style.bottom = "50px";
      toastCont.style.right = "50px";
    }
  }
}

new Toast();

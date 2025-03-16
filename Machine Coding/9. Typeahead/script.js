import { fetchFood } from "./data.js";

class TypeAhead {
  constructor() {
    this.inputCont = document.querySelector(".input-container");
    this.input = document.querySelector("#inpt");
    this.foodContainer = document.querySelector(".food-container");
    this.typeAheadCol = document.querySelectorAll(".typeahead-item");
    this.foodData = [];
    this.currInd = -1;
    this.debounceTimeout = null;
    this.debounceDelay = 300; // 300ms delay
    this.init();
    this.input.addEventListener("input", (event) => this.debounceInput(event));
    document.addEventListener("keydown", (event) => this.handleKeyDown(event));
  }

  // Debounce method
  debounceInput(event) {
    // Clear any existing timeout
    clearTimeout(this.debounceTimeout);

    // Set a new timeout
    this.debounceTimeout = setTimeout(() => {
      this.handleInput(event);
    }, this.debounceDelay);
  }

  async init() {
    try {
      const data = await fetchFood();
      this.foodData = [...data];
      this.getCard(data);
    } catch (err) {
      console.log(err);
    }
  }

  getCard(data) {
    const cards = data.map((item) => this.buildCard(item));
    this.foodContainer.append(...cards);
  }

  buildCard(item) {
    const foodCard = document.createElement("div");
    foodCard.classList.add("food-card");
    foodCard.innerHTML = `<div class="food-heading">
          <div class="food-profile-img">
            <img
              src=${item.photo_url}
              alt=${item.name}
            />
          </div>
          <div class="food-profile-detail">
            <div class="food-profile-name">${item.name}</div>
            <div class="food-profile-job">$${item.price}</div>
          </div>
        </div>`;
    return foodCard;
  }

  handleInput(event) {
    let inp = event.target.value;

    // Remove any existing suggestion element
    const existingSuggestion = this.inputCont.querySelector(
      ".typeahead-suggestion"
    );
    if (existingSuggestion) {
      existingSuggestion.remove();
    }

    if (inp.length > 0) {
      const suggestion = document.createElement("div");
      suggestion.classList.add("typeahead-suggestion");

      // Filter matching items and create suggestion elements
      const matchingItems = this.foodData
        .filter((item) => item.name.toLowerCase().includes(inp.toLowerCase()))
        .map((item) => this.showSuggestions(item.name, inp));

      // Only append if we have matches
      if (matchingItems.length > 0) {
        suggestion.append(...matchingItems);
        this.inputCont.append(suggestion);
      }
    }
  }

  showSuggestions(item, inp) {
    const suggItem = document.createElement("div");
    suggItem.classList.add("typeahead-item");

    const input = inp.toLowerCase();

    let startInd = item.toLowerCase().indexOf(input);

    if (startInd >= 0) {
      let startStr = item.substring(0, startInd);
      let matchStr = item.substring(startInd, startInd + inp.length);
      let endStr = item.substring(startInd + inp.length);

      suggItem.innerHTML = `${startStr}<span class="highlight">${matchStr}</span>${endStr}`;
    } else {
      suggItem.innerHTML = item;
    }

    return suggItem;
  }

  handleKeyDown(event) {
    const suggestions = document.querySelectorAll(".typeahead-item");

    if (suggestions.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      this.currInd = Math.min(this.currInd + 1, suggestions.length - 1);
      this.updateActiveItem(suggestions);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault(); // Prevent scrolling
      // Decrement index but not below -1
      this.currInd = Math.max(this.currInd - 1, -1);
      this.updateActiveItem(suggestions);
    }

    if (event.key === "Escape") {
      // Close suggestion box
      const suggestionBox = this.inputCont.querySelector(
        ".typeahead-suggestion"
      );
      if (suggestionBox) suggestionBox.remove();
      this.currInd = -1;
    }
  }

  // Helper method to update active state
  updateActiveItem(suggestions) {
    Array.from(suggestions).forEach((item, index) => {
      if (index === this.currInd) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }
}

new TypeAhead();

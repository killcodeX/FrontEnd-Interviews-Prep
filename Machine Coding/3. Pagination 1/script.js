// write a class
// function to fetch data
// function to display data
// function to handle prev button click
// function to handle next button click

import { mockFunction } from "./data.js";

class Pagination {
  constructor() {
    this.start = 0;
    this.end = 0;
    this.pageLimit = 5;
    this.numberofPages = 0;
    this.currPage = 1;
    this.actualData = [];
    this.currData = [];
    this.prev = document.querySelector(".prev");
    this.next = document.querySelector(".next");
    this.init();
  }

  async init() {
    let data = await mockFunction();
    this.actualData = [...data];
    this.numberofPages = Math.ceil(data.length / this.pageLimit);
    this.updatePage();

    this.prev.addEventListener("click", (event) => {
      event.preventDefault();
      if (this.currPage > 1) {
        this.currPage -= 1;
        this.updatePage();
      }
    });

    this.next.addEventListener("click", (event) => {
      event.preventDefault();
      if (this.currPage < this.numberofPages) {
        this.currPage += 1;
        this.updatePage();
      }
    });
  }

  updatePage() {
    this.start = (this.currPage - 1) * this.pageLimit;
    this.end = this.currPage * this.pageLimit;
    this.currData = this.actualData.slice(this.start, this.end);
    this.displayRecords();
    this.updateButtonStates();
  }

  updateButtonStates() {
    this.prev.disabled = this.currPage <= 1;
    this.next.disabled = this.currPage >= this.numberofPages;
  }

  displayRecords() {
    const tbody = document.querySelector("table tbody");
    tbody.innerHTML = "";

    for (let i = 0; i < this.currData.length; i++) {
      let tr = document.createElement("tr");
      let obj = this.currData[i];
      for (let val of Object.values(obj)) {
        const td = document.createElement("td");
        td.innerText = val;
        tr.append(td);
      }
      tbody.append(tr);
    }

    document.querySelector(".pageTotal i").innerHTML = this.currPage;
  }
}

new Pagination();

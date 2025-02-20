class InfiniteScroll {
  constructor() {
    this.scrollContainer = document.querySelector(".infinite-scroll-container");
    this.currentPage = 1;
    this.isLoading = false;
    this.initalLoad();

      // Bind the handleScroll method to preserve the "this" context
  this.handleScroll = this.handleScroll.bind(this);

    // Bind the throttled handleScroll to the class instance
    this.throttledHandleScroll = this.throttle(this.handleScroll, 200);
    window.addEventListener("scroll", this.throttledHandleScroll);
  }

  throttle(callback, wait) {
    console.log("throttle called");
    let lastCall = 0;
    return function (...args) {
      const now = new Date().getTime();
      if (now - lastCall >= wait) {
        console.log("throttle called inside");
        lastCall = now;
        callback.apply(this, args);
      }
    };
  }

  async initalLoad() {
    this.isLoading = true;
    if (this.loading) this.loading();
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${this.currentPage}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      this.buildData(data);
    } catch (err) {
      console.error("Error fetching data:", error);
    } finally {
      this.isLoading = false; // Reset loading flag
    }
  }

  buildData(data) {
    for (let i = 0; i < data.length; i++) {
      this.creatCard(data[i]);
    }
  }

  creatCard(feed) {
    let div = document.createElement("div");
    div.classList.add("feed-container");
    div.innerHTML = `<h3>${feed.id} - ${feed.title}</h3> <p>${feed.body}</p>`;
    this.scrollContainer.append(div);
  }

  loading() {
    this.scrollContainer.innerHtml = "Loading...";
  }

  handleScroll() {
    if (this.isScrollToBottom()) {
      console.log("cliked")
      this.loadMoreData();
    }
  }

  isScrollToBottom() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    console.log(scrollTop + clientHeight >= scrollHeight - 10)
    return scrollTop + clientHeight >= scrollHeight - 10;
  }

  

  async loadMoreData() {
    if (this.isLoading) return;
    this.isLoading = true;
    this.currentPage++;

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${this.currentPage}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      this.buildData(data);
    } catch (err) {
      console.error("Error fetching data:", error);
    } finally {
      this.isLoading = false; // Reset loading flag
    }
  }
}

new InfiniteScroll();

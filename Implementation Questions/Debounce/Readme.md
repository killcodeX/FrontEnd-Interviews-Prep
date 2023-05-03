# Debounce

The debounce function delays the processing of the keyup event until the user has stopped typing for a predetermined amount of time.

This prevents your UI code from needing to process every event and also drastically reduces the number of API calls sent to your server. Processing every character as it’s entered could harm performance and add unnecessary load to your backend.

Implementing a debounce from scratch is a common interview question. It tests your understanding of intermediate and advanced JavaScript concepts such as: async programming, callbacks, scope, and closures. It is also a practical solution used in real-world applications to improve performance and demonstrates that you understand the tools to write good code for real users.

```HTML
<div class='container'>
  <div class='first-input'>
    <div class='form-input'>
      <label>Regular Input</label>
      <input id='reg-input' type='text'/>
    </div>
    <div class='display-unit'>
      <label>Regular Display:</label>
      <p id='reg-display'></p>
    </div>
  </div>
  <div class='second-input'>
    <div class='form-input'>
      <label>Debounce Input</label>
      <input id='deb-input' type='text'/>
    </div>
    <div class='display-unit'>
      <label>Debounce Display:</label>
      <p id='deb-display'></p>
    </div>
  </div>
</div>
```

```CSS
.first-input{
  margin-bottom:20px;
}

.display-unit{
  display:flex;
  flex-direction: row;
  align-items: baseline;
  margin-top:10px;
}
```

```javascript
let regInput = document.querySelector("#reg-input");
let regDisplay = document.querySelector("#reg-display");
let debInput = document.querySelector("#deb-input");
let debDisplay = document.querySelector("#deb-display");

regInput.addEventListener("input", (e) => {
  regDisplay.innerText = e.target.value;
});

function addText(val) {
  debDisplay.innerText = val;
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// `wait` milliseconds.

function debounce(callback, interval) {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, interval);
  };
}

let debounced = debounce(addText, 1000);

debInput.addEventListener("input", (e) => {
  debounced(e.target.value);
});
```

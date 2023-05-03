# Throttling

Throttling or sometimes also called throttle function is a practice used in websites. Throttling is used to call a function after every millisecond or a particular interval of time only the first click is executed immediately.



```HTML
<div class='container'>
  <div class='first-input'>
    <div class='form-input'>
      <label>First Name Input</label>
      <input id='fir-input' type='text'/>
    </div>
  </div>
  <div class='second-input'>
    <div class='form-input'>
      <label>Last Name Input</label>
      <input id='sec-input' type='text'/>
    </div>
  </div>
  <button class='form-submit' type=submit>Submit</button>
</div>
```

```CSS
.first-input, .second-input{
  margin-bottom:20px;
}

.form-submit{
  padding:5px 15px;
  width:200px;
}
```

```javascript
let firInput = document.querySelector("#fir-input");
let secInput = document.querySelector("#sec-input");
let subBtn = document.querySelector(".form-submit");

firInput.addEventListener("input", (e) => {
  firInput.value = e.target.value;
});

secInput.addEventListener("input", (e) => {
  secInput.value = e.target.value;
});

const getData = (val1, val2) => {
  subBtn.disabled = false;
  console.log(`Name Submitted ${val1} ${val2}`);
};

function throttle(callback, interval) {
  return (...args) => {
    subBtn.disabled = true;
    setTimeout(() => {
      callback(...args);
    }, interval);
  };
}

let throttling = throttle(getData, 3000);

subBtn.addEventListener("click", (e) => {
  throttling(firInput.value, secInput.value);
});
```


## Advantages of throttling function: 

* It prevents frequent calling of the function.
* It makes the website faster and controls the rate at which a particular function is called.
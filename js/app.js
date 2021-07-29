const amountEl = document.getElementById("inp-bill");
const numberofPeople = document.getElementById("inp-people");
const tipPercentage = document.querySelectorAll(".tip");
const tipAmountEl = document.querySelector("#tip-amount");
const totalAmountEl = document.querySelector("#total-amount");
const errorMsg = document.querySelector(".error-msg");
const customTipEl = document.querySelector(".custom");
const resetBtn = document.querySelector(".reset");

var amount = 0.0;
var people = 1;
var tipPer = 0.15;
var tipAmountPerPerson = 0;
var totalAmountPerPerson = 0;

amountEl.addEventListener("input", e => {
  amount = parseFloat(e.target.value);
  calculate();
});

numberofPeople.addEventListener("input", e => {
  people = parseInt(e.target.value);

  if (people <= 0) {
    errorMsg.classList.add("show-error");
  } else {
    errorMsg.classList.remove("show-error");
  }

  calculate();
});

tipPercentage.forEach(tip => {
  tip.addEventListener("click", () => {
    removeActiveClass();
    tip.classList.add("btn-active");

    var raw = parseInt(tip.textContent.split("%")[0]);

    tipPer = raw / 100;
    calculate();
  });
});

customTipEl.addEventListener("focusout", e => {
  var raw = parseInt(e.target.value);
  tipPer = raw / 100;
  calculate();
});

resetBtn.addEventListener("click", reset);

function removeActiveClass() {
  tipPercentage.forEach(tip => {
    tip.classList.remove("btn-active");
  });
}

function calculate() {
  if (people > 0) {
    numberofPeople.style.border = "1px solid #26c2ae";

    var tipAmount = amount * tipPer;
    var totalAmount = amount + tipAmount;
    tipAmountPerPerson = tipAmount / people;
    totalAmountPerPerson = totalAmount / people;

    tipAmountEl.textContent = `${tipAmountPerPerson.toFixed(2)}`;
    totalAmountEl.textContent = `${totalAmountPerPerson.toFixed(2)}`;
  } else {
    numberofPeople.style.border = "1px solid #e17457";
  }
}

function reset() {
  tipAmountEl.textContent = `${0.0}`;
  totalAmountEl.textContent = `${0.0}`;
  amountEl.value = null;
  numberofPeople.value = null;
}

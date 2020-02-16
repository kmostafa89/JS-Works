// get the elements that we need from this project

const currencyOne = document.getElementById("currency-one");
const currencyTwo = document.getElementById("currency-two");

// amounts
const amountOne = document.getElementById("amount-one");
const amountTwo = document.getElementById("amount-two");

// swap button
const swap = document.getElementById("swap");

// the rate location place holder
let rate = document.getElementById("rate");

// Fetch exchange rates and update the DOM
function calculate() {
  const currency_one = currencyOne.value;
  const currency_two = currencyTwo.value;

  const amount_one = amountOne.value;
  const amount_two = amountTwo.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
      const rate_value = data.rates[currency_two];
      // display the rate
      rate.innerText = `1 ${currency_one} = ${rate_value} ${currency_two}`;

      // populate the amount two value
      amountTwo.value = parseFloat(amount_one * rate_value).toFixed(3);
    });
}
// Event listeners
currencyOne.addEventListener("change", calculate);
currencyTwo.addEventListener("change", calculate);
amountOne.addEventListener("input", calculate);
amountTwo.addEventListener("input", calculate);

// swap.addEventListener('click'.)
swap.addEventListener("click", () => {
  const temp = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = temp;

  calculate();
});

calculate();

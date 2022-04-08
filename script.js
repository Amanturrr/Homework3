const $rate = document.getElementById("rate");
const $swap = document.getElementById("swap");
const $amountOne = document.getElementById("amount-one");
const $amountTwo = document.getElementById("amount-two");
const $currencyOne = document.getElementById("currency-one");
const $currencyTwo = document.getElementById("currency-two");

// console.log($rate, $swap, $amountOne, $amountTwo, $currencyOne, $currencyTwo);

const dataFromBack = {
    uploaded: false,
};

function getResourse() {
    const {value : currencyOne} = $currencyOne;
    const {value : currencyTwo} = $currencyTwo;

    fetch(
        `https://v6.exchangerate-api.com/v6/93535d7b245c553eab1e2218/latest/${currencyOne}`
    )
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        dataFromBack = data.conversion_rates;
        dataFromBack.uploaded = true;

        calculateCurrency(dataFromBack, currencyOne, currencyTwo);
    });
};

function calculateCurrency(data, currencyOne, currencyTwo) {
    const rate = data.conversion_rates[currencyTwo];
    $amountTwo.value = +$amountOne.value * rate;
    $amountOne.value = +$amountTwo.value * rate;

    $rate.innerText = `1 ${currencyOne} = ${(rate + " " + currencyTwo)}`;
};

function runCalculate() {
    const {value : currencyOne} = $currencyOne;
    const {value : currencyTwo} = $currencyTwo;
    calculateCurrency(dataFromBack, currencyOne, currencyTwo);
};

getResourse();

$amountOne.addEventListener("input", runCalculate);
$amountTwo.addEventListener("input", runCalculate);
$currencyOne.addEventListener("change", runCalculate);
$currencyTwo.addEventListener("change", getResourse);

$swap.addEventListener("click", () => {
    let clon = $currencyOne.value;
	$currencyOne.value = $currencyTwo.value;
	$currencyTwo.value= clon;
});
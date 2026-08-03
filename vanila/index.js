// Celsius to Kelvin: K = C + 273.15
// Kelvin to Celsius: C = K - 273.15
// Fahrenheit to Celsius: C = (F-32) (5/9)
// Celsius to Fahrenheit: F = C(9/5) + 32
// Fahrenheit to Kelvin: K = (F-32) (5/9) + 273.15
// Kelvin to Fahrenheit: F = (K-273.15) (9/5) + 32

const form = document.getElementById("form-container");
const input = document.getElementById("temp-input");
const selects = document.querySelectorAll("select");
const result = document.querySelector("span");
const swapButton = document.getElementById("swap-btn");

const fromUnit = selects[0];
const toUnit = selects[1];
let typingTimer;

function convertTemperature(value, sourceUnit, targetUnit) {
    if (sourceUnit === targetUnit) {
        return value;
    }

    let celsiusValue;

    if (sourceUnit === "celsius") {
        celsiusValue = value;
    } else if (sourceUnit === "fahrenheit") {
        celsiusValue = (value - 32) * (5 / 9);
    } else {
        celsiusValue = value - 273.15;
    }

    if (targetUnit === "celsius") {
        return celsiusValue;
    }

    if (targetUnit === "fahrenheit") {
        return (celsiusValue * 9) / 5 + 32;
    }

    return celsiusValue + 273.15;
}

function formatResult(value, unit) {
    const unitLabels = {
        celsius: "°C",
        fahrenheit: "°F",
        kelvin: "K"
    };

    return `${value.toFixed(2)} ${unitLabels[unit]}`;
}

function runConversion() {
    const rawValue = input.value.trim();
    const enteredValue = Number(rawValue);

    if (rawValue === "" || Number.isNaN(enteredValue)) {
        result.textContent = "Please enter a valid number";
        result.style.color = "#dc2626";
        return;
    }

    const convertedValue = convertTemperature(
        enteredValue,
        fromUnit.value,
        toUnit.value
    );

    result.textContent = formatResult(convertedValue, toUnit.value);
    result.style.color = "#0f766e";
}

swapButton.addEventListener("click", () => {
    const currentFromUnit = fromUnit.value;
    fromUnit.value = toUnit.value;
    toUnit.value = currentFromUnit;

    if (input.value.trim() !== "") {
        runConversion();
    }
});

// input.addEventListener("input", () => {
//     clearTimeout(typingTimer);
//     typingTimer = setTimeout(runConversion, 500);
// });

fromUnit.addEventListener("change", runConversion);
toUnit.addEventListener("change", runConversion);

form.addEventListener("submit", (event) => {
    event.preventDefault();
    runConversion();
});

// Celsius to Kelvin: K = C + 273.15
// Kelvin to Celsius: C = K - 273.15
// Fahrenheit to Celsius: C = (F-32) (5/9)
// Celsius to Fahrenheit: F = C(9/5) + 32
// Fahrenheit to Kelvin: K = (F-32) (5/9) + 273.15
// Kelvin to Fahrenheit: F = (K-273.15) (9/5) + 32

const body = document.body;
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

function toCelsius(value, unit) {
    if (unit === "celsius") {
        return value;
    }

    if (unit === "fahrenheit") {
        return (value - 32) * (5 / 9);
    }

    return value - 273.15;
}

function formatResult(value, unit) {
    const unitLabels = {
        celsius: "°C",
        fahrenheit: "°F",
        kelvin: "K"
    };

    return `${value.toFixed(2)} ${unitLabels[unit]}`;
}

function applyWeatherTheme(celsiusValue) {
    body.classList.remove("weather-default", "weather-cold", "weather-mild", "weather-hot");

    if (celsiusValue <= 10) {
        body.classList.add("weather-cold");
        return;
    }

    if (celsiusValue < 30) {
        body.classList.add("weather-mild");
        return;
    }

    body.classList.add("weather-hot");
}

function resetWeatherTheme() {
    body.classList.remove("weather-cold", "weather-mild", "weather-hot");
    body.classList.add("weather-default");
}

function runConversion() {
    const rawValue = input.value.trim();
    const enteredValue = Number(rawValue);

    if (rawValue === "" || Number.isNaN(enteredValue)) {
        result.textContent = "Please enter a valid number";
        result.style.color = "#dc2626";
        resetWeatherTheme();
        return;
    }

    const sourceCelsiusValue = toCelsius(enteredValue, fromUnit.value);
    const convertedValue = convertTemperature(
        enteredValue,
        fromUnit.value,
        toUnit.value
    );

    applyWeatherTheme(sourceCelsiusValue);
    result.textContent = formatResult(convertedValue, toUnit.value);
    result.style.color = "";
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
    clearTimeout(typingTimer);
    runConversion();
});

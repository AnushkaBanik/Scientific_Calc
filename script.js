let display = document.getElementById("display");
let historyDisplay = document.getElementById("history");

let expression = ""; 
let isDeg = true; // default mode is DEG

// Append clicked button text to display
function appendToDisplay(value) {
  if (value === "tan(") {
    expression += "tanDegRad(";
  } else if (value === "sin(") {
    expression += "sinDegRad(";
  } else if (value === "cos(") {
    expression += "cosDegRad(";
  } else if (value === "log(") {
    expression += "Math.log10(";
  } else if (value === "ln(") {
    expression += "Math.log(";
  } else if (value === "sqrt") {
    expression += "Math.sqrt(";
  } else if (value === "factorial") {
    expression += "fact(";
  } else if (value === "pi") {
    expression += Math.PI;
  } else if (value === "x_pow_y") {
    expression += "";
  } else if (value === "percntg") {
    expression += "/100";
  } else {
    expression += value;
  }
  display.innerText = expression;
}

// DEG/RAD toggle
function toggleMode() {
  isDeg = !isDeg;
  document.getElementById("modeBtn").innerText = isDeg ? "DEG" : "RAD";
}



// Clear all
function allClear() {
  expression = "";
  display.innerText = "0";
  historyDisplay.innerText = "";
}

// Factorial
function fact(n) {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
}

// Trig wrappers (DEG/RAD)
window.tanDegRad = function(x) {
  return isDeg ? Math.tan((x * Math.PI) / 180) : Math.tan(x);
};
window.sinDegRad = function(x) {
  return isDeg ? Math.sin((x * Math.PI) / 180) : Math.sin(x);
};
window.cosDegRad = function(x) {
  return isDeg ? Math.cos((x * Math.PI) / 180) : Math.cos(x);
};
// Round result to 12 decimal places
function roundResult(value) {
  return Math.round(value * 1e12) / 1e12;
}

// Calculate
function calculate() {
  try {
    historyDisplay.innerText = expression;
    let result = Function('"use strict"; return (' + expression + ')')();
    result = roundResult(result); // Apply rounding here
    display.innerText = result;
    expression = result.toString();
  } catch (error) {
    display.innerText = "Error";
    expression = "";
  }
}
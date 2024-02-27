const prompt = require("prompt-sync")();
const min = prompt("What is the min weight: ");
const max = prompt("What is the max weight: ");
const result = calc5sets(parseInt(min), parseInt(max));
console.log("Here are your sets:");
console.log(result);

function calc5sets(first, last) {
  const resultArr = [];
  const sets = 5;
  const divisor = sets - 1;
  const difference = last - first;
  const increment = difference / divisor;
  for (let current = first; current <= last; current += increment) {
    const rounded = roundTo(current, 5);
    resultArr.push(rounded);
  }
  return resultArr;
}

function roundTo(number, roundto) {
  return roundto * Math.round(number / roundto);
}

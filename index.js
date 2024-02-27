const prompt = require("prompt-sync")();
const min = prompt("What is the min weight: ");
const max = prompt("What is the max weight: ");
const results = calc5sets(parseInt(min), parseInt(max));

// Output results to user
console.log("\nYour sets: (weights are per side)");
for (const result of results) {
	console.log(`${result} - ${plateCount(result)}`);
}

// Functions
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

function plateCount(liftAmount) {
	if (liftAmount < 45) {
		return "no bar - too heavy.";
	}
	if (liftAmount < 50) {
		return "bar only.";
	}

	// deal with bar
	let message = "bar + ";
	let liftBalance = liftAmount - 45;

	// deal with weights
	const weights = [45, 35, 25, 10, 5, 2.5];

	for (const weight of weights) {
		const weightOnBothSides = weight * 2;
		const numPlatesPerSide = Math.floor(liftBalance / weightOnBothSides);
		liftBalance = liftBalance - weightOnBothSides * numPlatesPerSide;
		if (numPlatesPerSide > 0) message += `${numPlatesPerSide}-${weight}lb `;
	}
	return message;
}

function roundTo(number, roundto) {
	return roundto * Math.round(number / roundto);
}

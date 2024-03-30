const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What is the min weight: ', (firstNumber) => {
  rl.question('What is the max weight: ', (secondNumber) => {
    const min = parseInt(firstNumber);
    const max = parseInt(secondNumber);
		const results = calc5sets(min, max);

		// Output results to user
		console.log("\nYour sets: (weights are lbs per side)");
		for (const result of results) {
			console.log(`${result} - ${plateCount(result)}`);
		}
    rl.close();
  });
});

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
		if (numPlatesPerSide > 0) message += `${numPlatesPerSide}x${weight} `;
	}
	return message;
}

function roundTo(number, roundto) {
	return roundto * Math.round(number / roundto);
}

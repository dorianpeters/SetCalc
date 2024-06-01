#include <iostream>
#include <vector>
#include <string>

// Function prototypes
std::vector<int> calc5sets(int, int); 
std::string plateCount(int);
int roundTo(int, int);

// Main function
int main() {
  // Get input from user
  std::cout << "What is the min weight: ";
  int minWeight;
  std::cin >> minWeight;

  std::cout << "What is the max weight: ";
  int maxWeight;
  std::cin >> maxWeight;

  std::vector<int> results = calc5sets(minWeight, maxWeight);

  // Output results to user
  std::cout << "\nYour sets: (weights are lbs per side)\n";
  for (const int result : results) {
    std::cout << result << " - " << plateCount(result) << "\n";
  }

  return 0;
}

// Functions declarations
std::vector<int> calc5sets(int first, int last) {
  std::vector<int> resultArr;
  const int sets = 5;
  const int divisor = sets - 1;
  const int difference = last - first;
  const int increment = difference / divisor;
  for (int current = first; current <= last; current += increment) {
    const int rounded = roundTo(current, 5);
    resultArr.push_back(rounded);
  }
  return resultArr;
}

std::string plateCount(int liftAmount) {
  if (liftAmount < 45) {
    return "no bar - too heavy.";
  }
  if (liftAmount < 50) {
    return "bar only.";
  }

  // deal with bar
  std::string message = "bar + ";
  int liftBalance = liftAmount - 45;

  // deal with weights
  const int weights[] = {45, 35, 25, 10, 5, 2};

  for (const int weight : weights) {
    const int weightOnBothSides = weight * 2;
    const int numPlatesPerSide = liftBalance / weightOnBothSides;
    liftBalance = liftBalance - weightOnBothSides * numPlatesPerSide;
    if (numPlatesPerSide > 0) message += std::to_string(numPlatesPerSide) + "x" + std::to_string(weight) + " ";
  }
  return message;
}

int roundTo(int number, int roundto) {
  return roundto * ((number + roundto / 2) / roundto);
}

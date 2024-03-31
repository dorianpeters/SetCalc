import time

def calc5sets(first, last):
  resultArr = []
  sets = 5
  divisor = sets - 1
  difference = last - first
  increment = difference / divisor
  current = first
  while current <= last:
    rounded = roundTo(current, 5)
    resultArr.append(rounded)
    current += increment
  return resultArr

def plateCount(liftAmount):
  if liftAmount < 45:
    return "no bar - too heavy."
  if liftAmount < 50:
    return "bar only."
    
  # deal with bar
  message = "bar + "
  liftBalance = liftAmount - 45
    
  # deal with weights
  weights = [45, 35, 25, 10, 5, 2.5]
  for weight in weights:
    weightOnBothSides = weight * 2
    numPlatesPerSide = int(liftBalance // weightOnBothSides)
    liftBalance = liftBalance - weightOnBothSides * numPlatesPerSide
    if numPlatesPerSide > 0:
      message += f"{numPlatesPerSide}x{weight} "
  
  return message

def roundTo(x, base=5):
  return base * round(x/base)

min = int(input("What is the min weight: "))
max = int(input("What is the max weight: "))
start = time.perf_counter_ns()
results = calc5sets(min, max)
print("Your sets: (weights are lbs per side)")
for result in results:
  print(f"{result} - {plateCount(result)}")
duration = time.perf_counter_ns() - start
print(f"calcTime {duration} ns.")

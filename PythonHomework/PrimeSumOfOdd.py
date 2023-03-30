import math
# Task 4 find what sum of 3 prime numbers equals any odd number

# Find prime in range 1
def prime_in_range_one(num):
    p = num + 1
    m = num - 1

    # Check if p and m are prime numbers
    for i in range(2, int(math.sqrt(p)) + 1):
        if p % i == 0:
            p = False
        if m % i == 0:
            m = False
        return m, p


# Find first sum of elements of Cartesian product that equals n
def find_elements(num, array):
    for i in array:
        for j in array:
            for k in reversed(array):
                if i + j + k == num:
                    return i, j, k


n = int(input("Enter n "))

# Find all prime numbers less than n
primes = [1, 3]
i = 1
while i * 6 < n:
    if prime_in_range_one(i * 6)[0]:
        primes.append(prime_in_range_one(i * 6)[0])
    if prime_in_range_one(i * 6)[1]:
        primes.append(prime_in_range_one(i * 6)[1])
    i += 1

print(find_elements(n, primes))
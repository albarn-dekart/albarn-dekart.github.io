# Task 2 how much zero's in the end of n!
n = int(input("Enter natural number "))
r = 0
power = 0

while 5**power < n:
    power += 1

for i in range(1, power+1):
    r += int(n/5**i)

print(r)
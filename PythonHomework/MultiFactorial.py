# Task 3 n!(k times) 5!! = 5*(5-2)*5(5-4)
n = int(input("Enter n "))
k = int(input("Enter k "))
r = n

if n == 0:
    r = 1
else:
    while n - k > 0:
        r *= n - k
        n -= k

print(r)
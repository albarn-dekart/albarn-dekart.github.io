# Gray to Binary
g = [int(item) for item in input("Enter Gray code ")]
b = g

for i in range(1, len(b)):
    b[i] = g[i] ^ b[i - 1]

print(b)

input()
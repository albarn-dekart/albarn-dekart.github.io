# Binary to Gray
b = [int(item) for item in input("Enter Binary code ")]
g = b

for i in reversed(range(1, len(b))):
    if b[i - 1] == 1:
        g[i] = int(not b[i])

print(g)

input()
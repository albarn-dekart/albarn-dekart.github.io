a = [int(item) for item in input("Enter the list items : ").split()]
n = len(a)
count = 0

for i in range (n):
    if a[i] == 0:
        count+= 1
        k = i
        for k in range(k, n-1):
            a[k] = a[k+1]

print(a[0:n-count])
T = [int(item) for item in input("Enter the list items : ").split()]
n = len(T)

for j in range(n-1):
    min = j

    for i in range(j+1, n):
        if T[i] < T[min]:
            min = i
    
    x = T[j]
    T[j] = T[min]
    T[min] = x

print(T)
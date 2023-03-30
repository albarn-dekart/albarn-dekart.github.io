from math import sqrt

a = float(input("Enter a "))
b = float(input("Enter b "))
c = float(input("Enter c "))

if a == b == c == 0:
    print("The equation has an infinite number of solutions, so the solution is any number")
elif a == b == 0:
    print("The equation has no solutions")
elif a == 0:
    x = -c / b
    print("The solution is " + str(x))
else:
    d = b**2 - 4*a*c
    if d > 0:
        x = (-b + sqrt(d)) / (2*a)
        x2 = (-b - sqrt(d)) / (2*a)
        print("The solution is " + str(x) + " and " + str(x2))
    elif d == 0:
        x = -b / (2*a)
        print("The solution is " + str(x))
    else:
        real = -b / (2*a)
        complex = sqrt(-d) / (2*a)

        print("The equation has no real solutions, but it has coplex solutions: " + str(real) + " + " + str(complex) + "i" + " and " + str(real) + " - " + str(complex) + "i")
input(" ")
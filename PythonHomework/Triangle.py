from math import sqrt

a = float(input("Enter the first side "))
b = float(input("Enter the second side "))
c = float(input("Enter the third side "))

#Rearrange from the smallest to greatest
if a > c:
    c = c + a
    a = c - a
    c = c - a

if a > b:
    b = b + a
    a = b - a
    b = b - a

if b > c:
    c = c + b
    b = c - b
    c = c - b

if a > 0 and b > 0 and c > 0:
    if a + b > c:
        if a == b == c:
            type = "equilateral"
        elif a == b or a == c or b == c:
            type = "isosceles"
        elif a**2 + b**2 == c**2:
            type = "rectangular"
        elif a**2 + b**2 > c**2:
            type = "acute"
        elif a**2 + b**2 < c**2:
            type = "obtuse"

        p = (a + b + c) / 2
        area = sqrt(p*(p - a)*(p - b)*(p - c))

        print("The triangle is " + type + " and the area is " + str(area)) 
    else:
        print("There is no triangle with these side lengths, because the sum of any two sides must be greater than the third")
else:
     print("The length cannot be less than or equal to zero")

input(" ")
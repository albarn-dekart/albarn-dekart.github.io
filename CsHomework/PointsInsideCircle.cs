float radius = 0;
bool validInput = false;

while (!validInput)
{
    Console.Write("Enter a positive value for the radius: ");

    if (float.TryParse(Console.ReadLine(), out radius) && radius > 0)
    {
        validInput = true;
    }
    else
    {
        Console.WriteLine("Invalid input. Please enter a positive number.");
    }
}

int result = PointGrid(radius);
Console.WriteLine($"The number of points inside a circle with radius {radius} is {result}.");

static int PointGrid(float r)
{
    int count = 0;

    for (var i = 0; i < r; i++)
    {
        for (var j = 1; j < r; j++)
        {
            if (Math.Sqrt(i * i + j * j) < r) count++;
        }
    }

    return count * 4 + 1;
}
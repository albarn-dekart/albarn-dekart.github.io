while (true)
{
    Console.WriteLine(Power(InputF(), InputI()));
    Console.WriteLine();
}

static float InputF()
{
    float number = 0;
    bool IsCorrect = false;

    while (!IsCorrect)
    {
        Console.WriteLine("Enter real number of x");
        IsCorrect = float.TryParse(Console.ReadLine(), out number);
    }

    return number;
}

static int InputI()
{
    int number = 0;
    bool IsCorrect = false;

    while (!IsCorrect)
    {
        Console.WriteLine("Enter integer number of k");
        IsCorrect = int.TryParse(Console.ReadLine(), out number);
    }

    return number;
}

static float Power(float x, int k)
{
    if(k == 0) return 1;
    if (k < 0) return 1 / Power(x, -k);
    if (k % 2 == 0) return Power(x, k / 2) * Power(x, k / 2);
    return x * Power(x, k - 1);
}
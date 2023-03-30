//Menu and input

Console.WriteLine("Calculate multifactorial n!(k)");

while (true)
{
    Input(out int n, out int k);

    Console.WriteLine($"\nResult is {MultiFactorial(n, k)}");
}

static void Input(out int n, out int k)
{
    var correctData = false;
    n = k = 0;

    //Ask user to enter value until it's correct
    while (!correctData)
    {
        Console.WriteLine("\nEnter n up to 1000");
        correctData = int.TryParse(Console.ReadLine(), out n);
        
        Console.WriteLine("\nEnter k up to 5");
        correctData = correctData && int.TryParse(Console.ReadLine(), out k);

        if (!correctData) Console.WriteLine("***Not a number. Try again***");
        else
        {
            switch (n)
            {
                case < 0:
                    Console.WriteLine("***n can't be negative. Please, provide non-negative number***");
                    correctData = false;
                    break;
                case > 1000:
                    Console.WriteLine("***n can't be more than 1000. Please, provide number that is less or equal to 1000***");
                    correctData = false;
                    break;
            }

            switch (k)
            {
                case 0:
                    Console.WriteLine("***k can't be equal to 0, because result is infinity. Try again***");
                    correctData = false;
                    break;
                case < 0:
                    Console.WriteLine("***k can't be negative. Please, provide non-negative number***");
                    correctData = false;
                    break;
                case > 5:
                    Console.WriteLine("***k can't be more than 5. Please, provide number that is less or equal to 5***");
                    correctData = false;
                    break;
            }
        }
    }
}

//Algorithm
static long MultiFactorial(int n, int k)
{
    //If base equals to 0
    if (n == 0) return 1;
    //If base is less or equal to factorial number
    if (n <= k) return n;

    //Recursion call
    return n * MultiFactorial(n - k, k);
}
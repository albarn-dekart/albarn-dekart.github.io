while (true)
{
    FindSumElements(Input());
}

static int Input()
{
    var correctData = false;
    int n = 0;

    Console.WriteLine("Enter even number (n >= 2)");

    //Ask user to enter value until it's correct
    while (!correctData)
    {
        correctData = int.TryParse(Console.ReadLine(), out n);

        if (!correctData) Console.WriteLine("***Not a number. Try again***");
        else
        {
            if (n < 2)
            {
                Console.WriteLine("***Invalid input. Enter number larger than 2.***");
                correctData = false;
            }
            else if (n % 2 != 0)
            {
                Console.WriteLine("***Invalid input. Enter even number.***");
                correctData = false;
            }
        }
    }

    return n;
}

static void FindSumElements(int n)
{
    int[] primes = FindSmallerPrimes(n);

    for (int i = 0; i < primes.Length; i++)
    {
        for (int j = 0; j < primes.Length; j++)
        {
            if (primes[i] + primes[j] == n && i <= j) Console.WriteLine($"{primes[i]} + {primes[j]} = {n}");
        }
    }
}

static int[] FindSmallerPrimes(int n)
{
    int[] primes = new[] { 1, 2, 3 };

    var i = 1;

    while (i * 6 < n)
    {
        if (IsPrime(i * 6 - 1) && i * 6 - 1 != n) primes = primes.Concat(new[] { i * 6 - 1 }).ToArray();
        if (IsPrime(i * 6 + 1) && i * 6 + 1 != n) primes = primes.Concat(new[] { i * 6 + 1 }).ToArray();
        i++;
    }

    return primes;
}

static bool IsPrime(int n)
{
    var isPrime = true;

    for (int i = 2; i < (int)Math.Sqrt(n) + 1; i++)
    {
        if (n % i == 0) isPrime = false;
    }

    return isPrime;
}
while (true)
{
    Console.WriteLine("Enter value to give the rest of");
    Rest(int.Parse(Console.ReadLine()));
}

static void Rest(int num)
{
    var nominals = new[] { 200, 100, 50, 20, 10, 5, 2, 1 };
    var banknotes = new int[nominals.Length];
    var res = $"{num} = ";
    
    for (int i = 0; i < nominals.Length; i++)
    {
        while (num - nominals[i] >= 0)
        {
            num -= nominals[i];
            banknotes[i]++;
        }

        if (banknotes[i] != 0)
        {
            res += $"{nominals[i]}x{banknotes[i]} + ";
        }
    }

    Console.WriteLine(res.Substring(0, res.Length - 3));
}
//Menu and input

while (true)
{
    Console.WriteLine("Enter lock code (integer)\n");

    //If input is number check if it's a valid code
    if (int.TryParse(Console.ReadLine(), out var n))
        Console.WriteLine(IsCodeValid(n) ? "***OPEN***\n" : "***INVALID CODE***\n");

    //If input is not integer
    else Console.WriteLine("Error: expected integer\n");
}

static bool IsCodeValid(int number)
{
    //If not positive
    if (number < 0) return false;

    var bin = IntToBinary(number);

    //If number of bits is not in range [2, 10]
    if (bin.Length is < 2 or > 10) return false;

    //If sum of all bits is not even
    if (bin.Count(a => a == '1') % 2 != 0) return false;
    if (bin[1] == '1') return false;

    //All conditions met
    return true;
}

static string IntToBinary(int number)
{
    var n = number;
    var result = "";

    while (n > 0)
    {
        result += n % 2;
        n /= 2;
    }

    var charArray = result.ToCharArray();
    Array.Reverse(charArray);

    return new string(charArray);
}
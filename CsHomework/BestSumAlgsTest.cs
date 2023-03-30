using System.Diagnostics;

TestAlgs("najlepsza_1.txt");
TestAlgs("najlepsza_2.txt");
TestAlgs("najlepsza_3.txt");

static void TestAlgs(string pathToText)
{
    Console.WriteLine("Testing on data in " + pathToText);
    var timer = new Stopwatch();
    var result = 0;
    
    timer.Start();
    result = Alg3(ReadArrayFromText(pathToText));
    timer.Stop();
    Console.WriteLine($"Algorithm 3\nTime (ms): {timer.ElapsedMilliseconds}\nResult: {result}\n");
    
    timer.Restart();
    result = Alg2(ReadArrayFromText(pathToText));
    timer.Stop();
    Console.WriteLine($"Algorithm 2\nTime (ms): {timer.ElapsedMilliseconds}\nResult: {result}\n");

    timer.Restart();
    result = Alg1(ReadArrayFromText(pathToText));
    timer.Stop();
    Console.WriteLine($"Algorithm 1\nTime (ms): {timer.ElapsedMilliseconds}\nResult: {result}\n");
}

static int Alg1(int[] array)
{
    var best = 0;

    for (var i = 0; i < array.Length; i++)
    for (var j = i; j < array.Length; j++)
    {
        var sum = 0;
        for (var k = i; k <= j; k++) sum += array[k];

        if (sum > best) best = sum;
    }

    return best;
}

static int Alg2(int[] array)
{
    var best = 0;

    for (var i = 0; i < array.Length; i++)
    {
        var sum = 0;
        for (var j = i; j < array.Length; j++)
        {
            sum += +array[j];

            if (sum > best) best = sum;
        }
    }

    return best;
}

static int Alg3(int[] array)
{
    int best = 0, bestRight = 0;

    for (var i = 0; i < array.Length; i++)
    {
        bestRight = int.Max(0, bestRight + array[i]);
        if (bestRight > best) best = bestRight;
    }

    return best;
}

static int[] ReadArrayFromText(string pathToText)
{
    var lines = File.ReadAllLines(pathToText);
    var array = new int[lines.Length];
    var j = 0;

    foreach (var line in lines)
        if (int.TryParse(line, out array[j]))
            j++;
    Array.Resize(ref array, j);

    return array;
}
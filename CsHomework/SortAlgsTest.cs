//Menu and input

using System.Diagnostics;

Console.WriteLine("Test efficiency of sort algorithms");

while (true)
{
    Input(out int dataSize, out int dataRange);
    
    //Generate random dataset
    var dataset = new int[dataSize];
    var random = new Random();

    for (var i = 0; i < dataset.Length; i++) dataset[i] = random.Next(dataRange + 1);

    //Measure and display time
    Console.WriteLine("\nResults:");

    TestAlg(1, (int[])dataset.Clone());
    TestAlg(2, (int[])dataset.Clone());
    TestAlg(3, (int[])dataset.Clone());
    TestAlg(4, (int[])dataset.Clone());
}

static void Input(out int dataSize, out int dataRange)
{
    var correctData = false;
    dataSize = dataRange = 0;

    //Ask user to enter value until it's correct
    while (!correctData)
    {
        Console.WriteLine("\nEnter size of dataset (n > 0)");
        correctData = int.TryParse(Console.ReadLine(), out dataSize);
        
        Console.WriteLine("\nEnter upper range of dataset (n > 0)");
        correctData = correctData && int.TryParse(Console.ReadLine(), out dataRange);

        if (!correctData) Console.WriteLine("***Not a number. Try again***");
        else {
            if (dataSize < 1)
            {

                Console.WriteLine("***Data size can't be less than 1. Try again***");
                correctData = false;
            }

            if (dataRange < 1)
            {
                Console.WriteLine("***Data range can't be less than 1. Try again***");
                correctData = false;
            }
        }
    }
}

static void TestAlg(int alg, int[] array)
{
    var watch = new Stopwatch();

    int compare = 0;
    int replace = 0;

    switch (alg)
    {
        case 1:
            Console.WriteLine("\nBubble sort");

            watch.Start();
            BubbleSort(array, out compare, out replace);
            watch.Stop();
            break;
        case 2:
            Console.WriteLine("\nSelection sort");

            watch.Start();
            SelectionSort(array, out compare, out replace);
            watch.Stop();
            break;
        case 3:
            Console.WriteLine("\nInsertion sort");

            watch.Start();
            InsertionSort(array, out compare, out replace);
            watch.Stop();
            break;
        case 4:
            Console.WriteLine("\nQuick sort");

            watch.Start();
            QuickSortNew(array, out compare, out replace);
            watch.Stop();
            break;
    }

    Console.WriteLine($"Time: {watch.ElapsedMilliseconds} ms");
    Console.WriteLine($"Comparisons: {compare}");
    Console.WriteLine($"Replacements: {replace}");
}

//Sort functions
static int[] BubbleSort(int[] array, out int compare, out int replace)
{
    compare = replace = 0;

    for (var i = 0; i < array.Length - 1; i++)
    {
        for (var j = 0; j < array.Length - i - 1; j++)
        {
            compare++;
            if (array[j] > array[j + 1])
            {
                replace += 3;
                (array[j], array[j + 1]) = (array[j + 1], array[j]);
            }
        }
    }

    return array;
}

static int[] SelectionSort(int[] array, out int compare, out int replace)
{
    compare = replace = 0;

    for (var i = 0; i < array.Length - 1; i++)
    {
        replace++;
        var min = i;

        for (var j = i + 1; j < array.Length; j++)
        {
            compare++;
            if (array[min] > array[j])
            {
                replace++;
                min = j;
            }
        }

        replace += 3;
        (array[i], array[min]) = (array[min], array[i]);
    }

    return array;
}

static int[] InsertionSort(int[] array, out int compare, out int replace)
{
    compare = replace = 0;

    for (var i = 1; i < array.Length; i++)
    {
        for (var j = i; j >= 1; j--)
        {
            compare++;

            if (array[j] < array[j - 1])
            {
                replace += 3;
                (array[j], array[j - 1]) = (array[j - 1], array[j]);
            }
        }
    }

    return array;
}

static int[] QuickSortNew(int[] array, out int compare, out int replace)
{
    compare = replace = 0;
    QuickSort(array, 0, array.Length - 1, ref compare, ref replace);
    return array;
}

static void QuickSort(int[] array, int start, int end, ref int compare, ref int replace)
{
    //Check if array length != 0
    compare++;
    if (start > end) return;
    replace++;
    var pivot = Partition(array, start, end, ref compare, ref replace);

    //Call function for left and right part of array divided by pivot
    QuickSort(array, start, pivot - 1, ref compare, ref replace);
    QuickSort(array, pivot + 1, end, ref compare, ref replace);
}

static int Partition(int[] array, int start, int end, ref int compare, ref int replace)
{
    int pivot;

    //Set pivot to median out of first, middle and last element of the array

    compare += 8;
    replace++;
    if ((array[start] >= array[(start + end) / 2] && array[start] <= array[end]) ||
        (array[start] <= array[(start + end) / 2] && array[start] >= array[end])) pivot = array[start];
    else if ((array[end] >= array[(start + end) / 2] && array[end] <= array[start]) ||
             (array[end] <= array[(start + end) / 2] && array[end] >= array[start])) pivot = array[end];
    else pivot = array[(start + end) / 2];

    //Swap elements till all smaller than pivot are before it and all larger than pivot are after it
    replace += 2;
    int l = start - 1, p = end + 1;

    while (true)
    {
        do
        {
            replace++;
            compare++;
            l++;
        } while (array[l] < pivot);

        do
        {
            replace++;
            compare++;
            p--;
        } while (array[p] > pivot);

        compare++;
        if (l >= p)
            return p;

        replace += 3;
        (array[l], array[p]) = (array[p], array[l]);
    }
}
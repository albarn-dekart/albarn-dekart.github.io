// The function recursively divides the input array in half, and each division takes O(log n) time.
// Then it compares the results from each half, which takes O(n) time. Therefore, the total time complexity is O(n*log n).

//Menu and input
Console.WriteLine("Find min and max in array");

while (true)
{
    var correct = false;

    while (!correct)
    {
        Console.WriteLine("\nEnter integer sequence to find its min and max in format 'x y z ...'");
        var input = Console.ReadLine();
        var numbers = input.Split(' ');
        var array = new int[numbers.Length];

        var isNumber = true;

        for (var i = 0; i < numbers.Length; i++)
            if (!int.TryParse(numbers[i], out array[i]))
                isNumber = false;

        correct = isNumber;

        if (correct)
        {
            FMM(array, 0, array.Length - 1, out var min, out var max);
            Console.WriteLine($"Min is {min} and max is {max}");
        }
    }
}

//Find min and max algorithm
static void FMM(int[] a, int start, int end, out int min, out int max)
{
    //If sorting one element
    if (end - start == 0)
    {
        min = max = a[start];
        return;
    }

    //If sorting two elements
    if (end - start == 1)
    {
        if (a[start] > a[end])
        {
            max = a[start];
            min = a[end];
        }
        else
        {
            max = a[end];
            min = a[start];
        }

        return;
    }

    //If sorting more than two elements
    var mid = (start + end) / 2;

    //Call function for left and right part of the array
    FMM(a, start, mid, out var leftMin, out var leftMax);
    FMM(a, mid + 1, end, out var rightMin, out var rightMax);

    //Find min and max from left and right
    max = leftMax > rightMax ? leftMax : rightMax;
    min = leftMin < rightMin ? leftMin : rightMin;
}
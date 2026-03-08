class Solution
{
public:
    bool pythagoreanTriplet(vector<int> &arr)
    {

        int maxVal = 0;

        // Find the maximum value in the array
        for (int num : arr)
            maxVal = max(maxVal, num);

        // Frequency array to check presence of numbers
        vector<bool> present(maxVal + 1, false);

        for (int num : arr)
            present[num] = true;

        // Try all possible pairs (a, b)
        for (int a = 1; a <= maxVal; a++)
        {

            if (!present[a])
                continue;

            for (int b = a; b <= maxVal; b++)
            {

                if (!present[b])
                    continue;

                int cSquare = a * a + b * b;

                int c = sqrt(cSquare);

                // Check if c exists and is a perfect square
                if (c <= maxVal && c * c == cSquare && present[c])
                    return true;
            }
        }

        return false;
    }
};
class Solution
{
public:
    int minToggle(vector<int> &arr)
    {

        // Count total zeros in the array
        int rightZeros = 0;

        for (int num : arr)
        {
            if (num == 0)
                rightZeros++;
        }

        // Minimum answer when entire array is considered right side
        int ans = rightZeros;

        // Count of ones on the left side
        int leftOnes = 0;

        // Traverse the array and try every partition
        for (int num : arr)
        {

            // Current zero moves from right side to left side
            if (num == 0)
                rightZeros--;

            // Current one becomes part of left side
            else
                leftOnes++;

            // Total toggles needed for current partition
            ans = min(ans, leftOnes + rightZeros);
        }

        return ans;
    }
};
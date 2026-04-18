class Solution
{
public:
    int maxOnes(vector<int> &arr)
    {
        int ones = 0;

        // Count existing 1s
        for (int num : arr)
        {
            if (num == 1)
            {
                ones++;
            }
        }

        int currentGain = 0;
        int maxGain = 0;

        // Kadane's Algorithm
        for (int num : arr)
        {
            int value;

            // 0 gives +1 gain, 1 gives -1 loss
            if (num == 0)
            {
                value = 1;
            }
            else
            {
                value = -1;
            }

            currentGain = max(value, currentGain + value);
            maxGain = max(maxGain, currentGain);
        }

        return ones + maxGain;
    }
};
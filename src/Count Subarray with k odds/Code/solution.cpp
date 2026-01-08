class Solution
{
public:
    // Helper function to count subarrays with at most k odd numbers
    int atMost(vector<int> &arr, int k)
    {
        int left = 0, oddCount = 0, result = 0;

        for (int right = 0; right < arr.size(); right++)
        {
            // If current element is odd, increase odd count
            if (arr[right] % 2 == 1)
                oddCount++;

            // Shrink window if odd count exceeds k
            while (oddCount > k)
            {
                if (arr[left] % 2 == 1)
                    oddCount--;
                left++;
            }

            // Count subarrays ending at right
            result += (right - left + 1);
        }

        return result;
    }

    int countSubarrays(vector<int> &arr, int k)
    {
        return atMost(arr, k) - atMost(arr, k - 1);
    }
};

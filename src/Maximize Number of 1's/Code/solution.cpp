class Solution
{
public:
    int maxOnes(vector<int> &arr, int k)
    {
        int left = 0;
        int zeroCount = 0;
        int maxLen = 0;

        for (int right = 0; right < arr.size(); right++)
        {
            // If current element is 0, increase zero count
            if (arr[right] == 0)
            {
                zeroCount++;
            }

            // If zeros exceed k, shrink the window
            while (zeroCount > k)
            {
                if (arr[left] == 0)
                {
                    zeroCount--;
                }
                left++;
            }

            // Update maximum window length
            maxLen = max(maxLen, right - left + 1);
        }

        return maxLen;
    }
};

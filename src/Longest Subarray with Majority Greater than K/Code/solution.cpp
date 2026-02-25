class Solution
{
public:
    int longestSubarray(vector<int> &arr, int k)
    {
        int n = arr.size();

        unordered_map<int, int> mp; // prefixSum -> first index
        int prefixSum = 0;
        int maxLen = 0;

        for (int i = 0; i < n; i++)
        {

            // Convert into +1 or -1
            if (arr[i] > k)
                prefixSum += 1;
            else
                prefixSum -= 1;

            // If prefix sum positive, whole subarray 0..i works
            if (prefixSum > 0)
            {
                maxLen = i + 1;
            }
            else
            {
                // Store first occurrence
                if (mp.find(prefixSum) == mp.end())
                {
                    mp[prefixSum] = i;
                }

                // Check if prefixSum - 1 exists
                if (mp.find(prefixSum - 1) != mp.end())
                {
                    maxLen = max(maxLen, i - mp[prefixSum - 1]);
                }
            }
        }

        return maxLen;
    }
};
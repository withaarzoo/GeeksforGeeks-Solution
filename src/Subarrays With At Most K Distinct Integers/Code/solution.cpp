class Solution
{
public:
    int countAtMostK(vector<int> &arr, int k)
    {
        if (k == 0)
            return 0;

        unordered_map<int, int> freq;
        int left = 0;
        long long ans = 0;

        for (int right = 0; right < arr.size(); right++)
        {
            // Add current element to the map
            freq[arr[right]]++;

            // Shrink the window if distinct elements exceed k
            while (freq.size() > k)
            {
                freq[arr[left]]--;
                if (freq[arr[left]] == 0)
                {
                    freq.erase(arr[left]);
                }
                left++;
            }

            // Count all valid subarrays ending at right
            ans += (right - left + 1);
        }

        return ans;
    }
};

class Solution
{
public:
    int totalElements(vector<int> &arr)
    {
        unordered_map<int, int> freq; // Stores frequency of elements
        int left = 0;
        int maxLen = 0;

        for (int right = 0; right < arr.size(); right++)
        {
            // Add current element to map
            freq[arr[right]]++;

            // If more than 2 distinct elements, shrink window
            while (freq.size() > 2)
            {
                freq[arr[left]]--;

                // Remove element if frequency becomes 0
                if (freq[arr[left]] == 0)
                {
                    freq.erase(arr[left]);
                }

                left++;
            }

            // Update maximum length
            maxLen = max(maxLen, right - left + 1);
        }

        return maxLen;
    }
};
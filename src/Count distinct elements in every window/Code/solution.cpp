class Solution
{
public:
    vector<int> countDistinct(vector<int> &arr, int k)
    {
        unordered_map<int, int> freq;
        vector<int> result;

        // Process first window
        for (int i = 0; i < k; i++)
        {
            freq[arr[i]]++;
        }

        // Store distinct count of first window
        result.push_back(freq.size());

        // Slide the window
        for (int i = k; i < arr.size(); i++)
        {
            // Remove element going out of window
            freq[arr[i - k]]--;
            if (freq[arr[i - k]] == 0)
            {
                freq.erase(arr[i - k]);
            }

            // Add new element coming into window
            freq[arr[i]]++;

            // Store distinct count
            result.push_back(freq.size());
        }

        return result;
    }
};

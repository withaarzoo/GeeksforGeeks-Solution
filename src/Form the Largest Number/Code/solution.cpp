class Solution
{
public:
    // Custom comparator for sorting
    static bool compare(string a, string b)
    {
        // Compare concatenated results
        return a + b > b + a;
    }

    string findLargest(vector<int> &arr)
    {
        int n = arr.size();

        // Convert integers to strings
        vector<string> nums;
        for (int i = 0; i < n; i++)
        {
            nums.push_back(to_string(arr[i]));
        }

        // Sort using custom comparator
        sort(nums.begin(), nums.end(), compare);

        // Edge case: if highest number is "0"
        if (nums[0] == "0")
            return "0";

        // Concatenate all numbers
        string result = "";
        for (string s : nums)
        {
            result += s;
        }

        return result;
    }
};
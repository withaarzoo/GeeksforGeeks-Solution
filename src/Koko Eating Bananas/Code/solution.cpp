class Solution
{
public:
    int kokoEat(vector<int> &arr, int k)
    {
        int low = 1;
        int high = *max_element(arr.begin(), arr.end());
        int ans = high;

        while (low <= high)
        {
            int mid = low + (high - low) / 2;
            long long hours = 0;

            // calculate total hours needed at speed mid
            for (int bananas : arr)
            {
                hours += (bananas + mid - 1) / mid; // ceil division
            }

            if (hours <= k)
            {
                ans = mid;      // mid is valid
                high = mid - 1; // try smaller speed
            }
            else
            {
                low = mid + 1; // need higher speed
            }
        }
        return ans;
    }
};

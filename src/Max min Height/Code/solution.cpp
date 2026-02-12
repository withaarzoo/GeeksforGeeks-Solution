class Solution
{
public:
    bool canMake(vector<int> &arr, int n, int k, int w, long long target)
    {
        vector<long long> diff(n + 1, 0);
        long long currAdd = 0;
        long long operations = 0;

        for (int i = 0; i < n; i++)
        {
            currAdd += diff[i];

            long long currentHeight = arr[i] + currAdd;

            if (currentHeight < target)
            {
                long long need = target - currentHeight;
                operations += need;
                if (operations > k)
                    return false;

                currAdd += need;
                if (i + w < n)
                    diff[i + w] -= need;
            }
        }
        return true;
    }

    int maxMinHeight(vector<int> &arr, int k, int w)
    {
        int n = arr.size();
        int minVal = *min_element(arr.begin(), arr.end());

        long long low = minVal;
        long long high = minVal + k;
        long long ans = minVal;

        while (low <= high)
        {
            long long mid = (low + high) / 2;

            if (canMake(arr, n, k, w, mid))
            {
                ans = mid;
                low = mid + 1;
            }
            else
            {
                high = mid - 1;
            }
        }
        return (int)ans;
    }
};

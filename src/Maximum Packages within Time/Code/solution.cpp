class Solution
{
public:
    int maxPackages(vector<int> &arr, int totalTime)
    {
        int n = arr.size();
        int k = min(n, totalTime);
        if (k == 0)
            return 0;

        long long sum = 0;
        for (int i = 0; i < k; i++)
            sum += arr[i];
        long long ans = sum;

        for (int i = k; i < n; i++)
        {
            sum += arr[i] - arr[i - k];
            ans = max(ans, sum);
        }
        return (int)ans;
    }
};
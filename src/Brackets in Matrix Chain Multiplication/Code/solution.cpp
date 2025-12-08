class Solution
{
public:
    string matrixChainOrder(vector<int> &arr)
    {
        int n = arr.size();
        int N = n - 1; // number of matrices

        // dp[i][j] = minimum cost to multiply matrices from i to j (1-based)
        vector<vector<long long>> dp(N + 1, vector<long long>(N + 1, 0));
        // split[i][j] = index k where we split optimally between i and j
        vector<vector<int>> split(N + 1, vector<int>(N + 1, 0));

        // length of chain from 2 to N (1 matrix needs 0 cost)
        for (int len = 2; len <= N; ++len)
        {
            for (int i = 1; i + len - 1 <= N; ++i)
            {
                int j = i + len - 1;
                dp[i][j] = LLONG_MAX;
                // try all possible splits
                for (int k = i; k < j; ++k)
                {
                    long long cost = dp[i][k] + dp[k + 1][j] + 1LL * arr[i - 1] * arr[k] * arr[j];
                    if (cost < dp[i][j])
                    {
                        dp[i][j] = cost;
                        split[i][j] = k;
                    }
                }
            }
        }

        // helper lambda to build the answer string using recursion
        function<string(int, int)> build = [&](int i, int j) -> string
        {
            if (i == j)
            {
                // single matrix -> just its letter
                char ch = 'A' + (i - 1);
                return string(1, ch);
            }
            int k = split[i][j];
            string left = build(i, k);
            string right = build(k + 1, j);
            return "(" + left + right + ")";
        };

        return build(1, N);
    }
};

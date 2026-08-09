class Solution
{
public:
    int zigzagSequence(vector<vector<int>> &mat)
    {
        int n = mat.size();

        vector<int> dp(n);

        for (int j = 0; j < n; j++)
        {
            dp[j] = mat[0][j];
        }

        for (int i = 1; i < n; i++)
        {
            int max1 = -1;
            int max2 = -1;
            int max1Col = -1;

            for (int j = 0; j < n; j++)
            {
                if (dp[j] > max1)
                {
                    max2 = max1;
                    max1 = dp[j];
                    max1Col = j;
                }
                else if (dp[j] > max2)
                {
                    max2 = dp[j];
                }
            }

            vector<int> next(n);

            for (int j = 0; j < n; j++)
            {
                int bestPrevious;

                if (j != max1Col)
                {
                    bestPrevious = max1;
                }
                else
                {
                    bestPrevious = max2;
                }

                next[j] = mat[i][j] + bestPrevious;
            }

            dp = next;
        }

        return *max_element(dp.begin(), dp.end());
    }
};
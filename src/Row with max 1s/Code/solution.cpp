class Solution
{
public:
    int rowWithMax1s(vector<vector<int>> &arr)
    {
        int n = arr.size();
        int m = arr[0].size();

        int maxOnes = 0;
        int answer = -1;

        // Traverse each row
        for (int i = 0; i < n; i++)
        {
            int low = 0, high = m - 1;
            int firstOne = -1;

            // Binary search for first 1
            while (low <= high)
            {
                int mid = low + (high - low) / 2;

                if (arr[i][mid] == 1)
                {
                    firstOne = mid;
                    high = mid - 1;
                }
                else
                {
                    low = mid + 1;
                }
            }

            // If row contains at least one 1
            if (firstOne != -1)
            {
                int onesCount = m - firstOne;

                if (onesCount > maxOnes)
                {
                    maxOnes = onesCount;
                    answer = i;
                }
            }
        }

        return answer;
    }
};

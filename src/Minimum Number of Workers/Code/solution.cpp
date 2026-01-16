class Solution
{
public:
    int minMen(vector<int> &arr)
    {
        int n = arr.size();
        vector<pair<int, int>> intervals;

        // Step 1: Convert workers into intervals
        for (int i = 0; i < n; i++)
        {
            if (arr[i] == -1)
                continue;

            int left = max(0, i - arr[i]);
            int right = min(n - 1, i + arr[i]);
            intervals.push_back({left, right});
        }

        // Step 2: Sort intervals
        sort(intervals.begin(), intervals.end());

        int count = 0;
        int i = 0;
        int coveredTill = 0;

        // Step 3: Greedy interval covering
        while (coveredTill < n)
        {
            int farthest = coveredTill;

            while (i < intervals.size() && intervals[i].first <= coveredTill)
            {
                farthest = max(farthest, intervals[i].second + 1);
                i++;
            }

            if (farthest == coveredTill)
                return -1;

            count++;
            coveredTill = farthest;
        }

        return count;
    }
};

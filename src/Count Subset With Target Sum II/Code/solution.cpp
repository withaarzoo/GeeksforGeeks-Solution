class Solution
{
public:
    int countSubset(vector<int> &arr, int k)
    {
        int n = arr.size();
        int mid = n / 2;

        vector<int> left(arr.begin(), arr.begin() + mid);
        vector<int> right(arr.begin() + mid, arr.end());

        vector<long long> leftSums, rightSums;

        // Generate all subset sums for left part
        int L = left.size();
        for (int mask = 0; mask < (1 << L); mask++)
        {
            long long sum = 0;
            for (int i = 0; i < L; i++)
            {
                if (mask & (1 << i))
                    sum += left[i];
            }
            leftSums.push_back(sum);
        }

        // Generate all subset sums for right part
        int R = right.size();
        for (int mask = 0; mask < (1 << R); mask++)
        {
            long long sum = 0;
            for (int i = 0; i < R; i++)
            {
                if (mask & (1 << i))
                    sum += right[i];
            }
            rightSums.push_back(sum);
        }

        // Store frequency of right sums
        unordered_map<long long, int> freq;
        for (long long s : rightSums)
            freq[s]++;

        int count = 0;

        // Find matching pairs
        for (long long s : leftSums)
        {
            long long need = k - s;
            if (freq.count(need))
                count += freq[need];
        }

        return count;
    }
};

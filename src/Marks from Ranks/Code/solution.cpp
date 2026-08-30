class Solution
{
public:
    vector<int> getMarks(vector<int> &l, vector<int> &r, vector<int> &rank)
    {
        // Store the number of valid marks up to each interval.
        int n = l.size();
        vector<long long> prefix(n);

        // Build prefix sums of interval sizes.
        for (int i = 0; i < n; i++)
        {
            // Calculate how many consecutive marks this interval contains.
            long long count = 1LL * r[i] - l[i] + 1;

            // Add the current interval size to all previous interval sizes.
            prefix[i] = count + (i > 0 ? prefix[i - 1] : 0);
        }

        // Store the mark corresponding to every requested rank.
        vector<int> answer;
        answer.reserve(rank.size());

        // Process every rank query independently.
        for (int currentRank : rank)
        {
            // Find the first interval whose ending rank is at least currentRank.
            int index = lower_bound(prefix.begin(), prefix.end(), currentRank) - prefix.begin();

            // Count how many valid marks appear before the found interval.
            long long marksBefore = (index > 0 ? prefix[index - 1] : 0);

            // Calculate the zero-based position inside the current interval.
            long long offset = currentRank - marksBefore - 1;

            // Move offset positions from the interval's starting mark.
            answer.push_back(l[index] + offset);
        }

        // Return all marks in the same order as the input rank queries.
        return answer;
    }
};
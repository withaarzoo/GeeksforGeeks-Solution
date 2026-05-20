class Solution
{
public:
    bool isProduct(vector<int> &arr, long long target)
    {

        // HashSet to store visited numbers
        unordered_set<long long> seen;

        // Traverse every element
        for (long long num : arr)
        {

            // Special handling for zero
            if (num == 0)
            {

                // If target is also zero,
                // then 0 multiplied with any previous number becomes 0
                if (target == 0 && !seen.empty())
                {
                    return true;
                }

                // Store zero and continue
                seen.insert(num);
                continue;
            }

            // If target is not divisible by current number,
            // then no valid pair can exist with this number
            if (target % num != 0)
            {
                seen.insert(num);
                continue;
            }

            // Calculate required partner
            long long needed = target / num;

            // If partner already exists, pair found
            if (seen.count(needed))
            {
                return true;
            }

            // Store current number for future checks
            seen.insert(num);
        }

        // No valid pair found
        return false;
    }
};
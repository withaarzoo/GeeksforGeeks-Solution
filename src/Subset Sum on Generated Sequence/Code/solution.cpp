class Solution
{
public:
    bool isPossible(vector<int> &arr, int s, int x)
    {
        // Store all useful numbers because I need to process them
        // from the largest value back to the smallest value.
        vector<long long> nums;

        // The initial number written on the paper is s.
        nums.push_back(s);

        // sum represents the sum of all numbers currently on the paper.
        long long sum = s;

        // Generate the sequence using the given arr values.
        for (int a : arr)
        {
            // The next child writes the sum of all previous numbers + arr[i].
            long long next = sum + a;

            // Once next is greater than x, every later number will also
            // be greater than x, so none of them can be part of x.
            if (next > x)
            {
                break;
            }

            // This number can still be useful for forming x.
            nums.push_back(next);

            // Add the new number to the total for generating the next value.
            sum += next;
        }

        // remaining is the part of x that I still need to form.
        long long remaining = x;

        // Start from the largest number because the sequence is superincreasing.
        for (int i = (int)nums.size() - 1; i >= 0; --i)
        {
            // If this number fits, taking it is always safe.
            if (nums[i] <= remaining)
            {
                remaining -= nums[i];
            }

            // If remaining becomes zero, x has been formed completely.
            if (remaining == 0)
            {
                return true;
            }
        }

        // If some value is still left, no valid subset can form x.
        return false;
    }
};
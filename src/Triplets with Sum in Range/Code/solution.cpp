class Solution
{
public:
    // Count how many triplets have a sum <= target.
    long long countLessEqual(vector<int> &arr, int target)
    {
        int n = arr.size();  // Store the number of elements in the array.
        long long count = 0; // Store the number of valid triplets.

        // Fix the first element of the triplet one by one.
        for (int i = 0; i < n - 2; i++)
        {
            int left = i + 1;  // Start the second element just after i.
            int right = n - 1; // Start the third element at the end.

            // Move the two pointers until they cross.
            while (left < right)
            {
                // Calculate the current triplet sum.
                long long sum = (long long)arr[i] + arr[left] + arr[right];

                if (sum <= target)
                {
                    // Because the array is sorted, every index from left to right - 1
                    // can pair with arr[right] and still produce a sum <= target.
                    count += right - left;

                    // Move left forward to check larger second elements.
                    left++;
                }
                else
                {
                    // The sum is too large, so move right backward
                    // to make the next sum smaller.
                    right--;
                }
            }
        }

        return count; // Return the total number of triplets with sum <= target.
    }

    int countTriplets(vector<int> &arr, int l, int r)
    {
        // Sort the array so the two-pointer technique can be used.
        sort(arr.begin(), arr.end());

        // Count triplets with sum <= r, then remove those with sum < l.
        long long result = countLessEqual(arr, r) - countLessEqual(arr, l - 1);

        // The maximum number of triplets for n <= 1000 fits in int.
        return (int)result;
    }
};
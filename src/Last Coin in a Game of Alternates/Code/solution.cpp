class Solution
{
public:
    int coin(vector<int> &arr)
    {

        // Pointer at the beginning
        int left = 0;

        // Pointer at the end
        int right = arr.size() - 1;

        // Continue until only one coin remains
        while (left < right)
        {

            // If left coin is larger,
            // remove it by moving left pointer forward
            if (arr[left] > arr[right])
            {
                left++;
            }
            else
            {

                // Otherwise remove right coin
                // by moving right pointer backward
                right--;
            }
        }

        // Both pointers now point to the last remaining coin
        return arr[left];
    }
};
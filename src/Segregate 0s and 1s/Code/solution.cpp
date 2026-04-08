class Solution
{
public:
    void segregate0and1(vector<int> &arr)
    {
        int left = 0;
        int right = arr.size() - 1;

        // Continue until both pointers cross each other
        while (left < right)
        {

            // Move left pointer forward if current element is 0
            while (left < right && arr[left] == 0)
            {
                left++;
            }

            // Move right pointer backward if current element is 1
            while (left < right && arr[right] == 1)
            {
                right--;
            }

            // Swap misplaced 1 on left with misplaced 0 on right
            if (left < right)
            {
                swap(arr[left], arr[right]);
                left++;
                right--;
            }
        }
    }
};
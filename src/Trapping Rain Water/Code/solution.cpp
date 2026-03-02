class Solution
{
public:
    int maxWater(vector<int> &arr)
    {
        int n = arr.size();
        if (n <= 2)
            return 0; // At least 3 bars are needed

        int left = 0, right = n - 1;
        int leftMax = 0, rightMax = 0;
        int water = 0;

        while (left < right)
        {
            if (arr[left] < arr[right])
            {
                // Process left side
                if (arr[left] >= leftMax)
                {
                    leftMax = arr[left]; // Update left maximum
                }
                else
                {
                    water += leftMax - arr[left]; // Water trapped
                }
                left++;
            }
            else
            {
                // Process right side
                if (arr[right] >= rightMax)
                {
                    rightMax = arr[right]; // Update right maximum
                }
                else
                {
                    water += rightMax - arr[right]; // Water trapped
                }
                right--;
            }
        }

        return water;
    }
};
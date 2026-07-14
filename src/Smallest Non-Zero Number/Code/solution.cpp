class Solution
{
public:
    int find(vector<int> &arr)
    {
        // Minimum value needed after processing all elements
        int need = 0;

        // Process the array from right to left
        for (int i = arr.size() - 1; i >= 0; i--)
        {

            // Minimum value required before this element
            // ceil((need + arr[i]) / 2)
            need = (need + arr[i] + 1) / 2;
        }

        // This is the smallest valid starting value
        return need;
    }
};
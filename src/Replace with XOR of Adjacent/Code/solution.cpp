class Solution
{
public:
    void replaceElements(vector<int> &arr)
    {
        int n = arr.size();

        // Temporary array to store updated values
        vector<int> temp(n);

        // First element uses itself and next element
        temp[0] = arr[0] ^ arr[1];

        // Last element uses previous and itself
        temp[n - 1] = arr[n - 2] ^ arr[n - 1];

        // Middle elements use left and right neighbors
        for (int i = 1; i < n - 1; i++)
        {
            temp[i] = arr[i - 1] ^ arr[i + 1];
        }

        // Copy updated values back to original array
        arr = temp;
    }
};
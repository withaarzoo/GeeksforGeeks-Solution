class Solution {
  public:
    int maxSubsetXOR(vector<int> &arr) {
        int n = arr.size();

        // This index tells where the next basis element will be placed
        int index = 0;

        // Process bits from highest (31) to lowest (0)
        for (int bit = 31; bit >= 0; bit--) {

            int maxIndex = -1;

            // Find a number having the current bit set
            for (int i = index; i < n; i++) {
                if (arr[i] & (1 << bit)) {
                    maxIndex = i;
                    break;
                }
            }

            // If no number contains this bit, move to the next bit
            if (maxIndex == -1)
                continue;

            // Bring the selected number to the current basis position
            swap(arr[index], arr[maxIndex]);

            // Remove this bit from every other number
            for (int i = 0; i < n; i++) {
                if (i != index && (arr[i] & (1 << bit))) {
                    arr[i] ^= arr[index];
                }
            }

            // Move to the next basis position
            index++;
        }

        // Build the maximum XOR greedily
        int ans = 0;

        for (int i = 0; i < index; i++) {
            // Include the basis element only if it increases the answer
            ans = max(ans, ans ^ arr[i]);
        }

        return ans;
    }
};
class Solution {
  public:
    int countMinOperations(vector<int>& arr) {
        // Stores total increment operations needed
        int increments = 0;

        // Stores the largest element in the array
        int maxValue = 0;

        // Process every element
        for (int num : arr) {

            // Count set bits because every set bit
            // represents one increment operation
            increments += __builtin_popcount(num);

            // Keep track of the largest element
            maxValue = max(maxValue, num);
        }

        // Counts global doubling operations
        int doubles = 0;

        // Every division by 2 in reverse
        // represents one doubling in forward direction
        while (maxValue > 1) {
            maxValue /= 2;
            doubles++;
        }

        // Total operations
        return increments + doubles;
    }
};
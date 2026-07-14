class Solution {
    public int find(int[] arr) {

        // Minimum value needed after processing all elements
        int need = 0;

        // Traverse from right to left
        for (int i = arr.length - 1; i >= 0; i--) {

            // Compute the minimum value needed before this element
            // using ceiling division
            need = (need + arr[i] + 1) / 2;
        }

        // Smallest valid starting value
        return need;
    }
}
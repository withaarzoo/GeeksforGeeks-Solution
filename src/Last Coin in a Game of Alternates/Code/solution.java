class Solution {
    public int coin(int[] arr) {

        // Pointer at the beginning
        int left = 0;

        // Pointer at the end
        int right = arr.length - 1;

        // Continue until one coin remains
        while (left < right) {

            // Remove larger coin from left side
            if (arr[left] > arr[right]) {
                left++;
            } else {

                // Otherwise remove right coin
                right--;
            }
        }

        // Remaining coin
        return arr[left];
    }
}
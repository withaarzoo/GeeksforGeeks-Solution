class Solution {
    void segregate0and1(int[] arr) {
        int left = 0;
        int right = arr.length - 1;

        // Continue until both pointers cross each other
        while (left < right) {

            // Move left pointer forward if element is 0
            while (left < right && arr[left] == 0) {
                left++;
            }

            // Move right pointer backward if element is 1
            while (left < right && arr[right] == 1) {
                right--;
            }

            // Swap misplaced values
            if (left < right) {
                int temp = arr[left];
                arr[left] = arr[right];
                arr[right] = temp;

                left++;
                right--;
            }
        }
    }
}
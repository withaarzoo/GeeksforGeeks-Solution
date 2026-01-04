class Solution {
    public void sort012(int[] arr) {
        int low = 0, mid = 0;
        int high = arr.length - 1;

        // One-pass traversal
        while (mid <= high) {
            if (arr[mid] == 0) {
                int temp = arr[low];
                arr[low] = arr[mid];
                arr[mid] = temp;
                low++;
                mid++;
            } 
            else if (arr[mid] == 1) {
                mid++;
            } 
            else { // arr[mid] == 2
                int temp = arr[mid];
                arr[mid] = arr[high];
                arr[high] = temp;
                high--;
            }
        }
    }
}

class Solution {
    public void replaceElements(int[] arr) {
        int n = arr.length;

        // Temporary array to store updated values
        int[] temp = new int[n];

        // First element
        temp[0] = arr[0] ^ arr[1];

        // Last element
        temp[n - 1] = arr[n - 2] ^ arr[n - 1];

        // Middle elements
        for (int i = 1; i < n - 1; i++) {
            temp[i] = arr[i - 1] ^ arr[i + 1];
        }

        // Copy result back into original array
        for (int i = 0; i < n; i++) {
            arr[i] = temp[i];
        }
    }
}
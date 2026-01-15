class Solution {
    public int minCandy(int[] arr) {
        int n = arr.length;
        if (n == 0) return 0;

        long total = 1;
        int up = 0, down = 0, peak = 0;

        for (int i = 1; i < n; i++) {
            if (arr[i] > arr[i - 1]) {
                up++;
                peak = up;
                down = 0;
                total += 1 + up;
            } 
            else if (arr[i] == arr[i - 1]) {
                up = down = peak = 0;
                total += 1;
            } 
            else {
                down++;
                up = 0;
                total += 1 + down;
                if (down <= peak) {
                    total--;
                }
            }
        }

        return (int) total;
    }
}

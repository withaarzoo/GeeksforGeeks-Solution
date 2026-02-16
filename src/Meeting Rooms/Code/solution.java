import java.util.Arrays;

class Solution {
    static boolean canAttend(int[][] arr) {
        int n = arr.length;
        
        // Step 1: Sort based on starting time
        Arrays.sort(arr, (a, b) -> Integer.compare(a[0], b[0]));
        
        // Step 2: Check overlap
        for(int i = 1; i < n; i++) {
            if(arr[i][0] < arr[i - 1][1]) {
                return false;
            }
        }
        
        return true;
    }
}

import java.util.ArrayList;
import java.util.Arrays;

class Solution {
    public ArrayList<String> binstr(int n) {
        int total = 1 << n;                     // 2^n
        ArrayList<String> result = new ArrayList<>(total);
        char[] buffer = new char[n];

        for (int mask = 0; mask < total; ++mask) {
            Arrays.fill(buffer, '0');          // fill with '0'
            for (int j = 0; j < n; ++j) {
                // if j-th bit of mask is 1, set from right side
                if (((mask >> j) & 1) == 1) buffer[n - 1 - j] = '1';
            }
            result.add(new String(buffer));    // create string from buffer
        }
        return result;
    }
}

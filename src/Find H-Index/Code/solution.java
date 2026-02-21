import java.util.Arrays;

class Solution {
    public int hIndex(int[] citations) {
        int n = citations.length;

        // Step 1: Sort the array
        Arrays.sort(citations);

        // Step 2: Traverse and check
        for (int i = 0; i < n; i++) {
            int papers = n - i;

            if (citations[i] >= papers) {
                return papers;
            }
        }

        return 0;
    }
}
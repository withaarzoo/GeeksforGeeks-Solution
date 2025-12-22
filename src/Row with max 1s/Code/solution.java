class Solution {
    public int rowWithMax1s(int arr[][]) {
        int n = arr.length;
        int m = arr[0].length;

        int maxOnes = 0;
        int answer = -1;

        for (int i = 0; i < n; i++) {
            int low = 0, high = m - 1;
            int firstOne = -1;

            // Binary search in current row
            while (low <= high) {
                int mid = low + (high - low) / 2;

                if (arr[i][mid] == 1) {
                    firstOne = mid;
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            }

            if (firstOne != -1) {
                int onesCount = m - firstOne;

                if (onesCount > maxOnes) {
                    maxOnes = onesCount;
                    answer = i;
                }
            }
        }

        return answer;
    }
}

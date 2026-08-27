class Solution {
    public int maxArea(int[][] mat) {
        // I get the matrix dimensions because row count limits the maximum
        // possible height and column count tells me how many heights to track.
        int n = mat.length;
        int m = mat[0].length;

        // I store consecutive 1 heights for every column.
        int[] height = new int[m];

        // I keep the maximum rectangle area found so far.
        int answer = 0;

        // I process every row as a possible bottom boundary of a rectangle.
        for (int i = 0; i < n; i++) {

            // I count how many columns have each possible height from 0 to n.
            int[] count = new int[n + 1];

            // I update the consecutive 1 height for every column.
            for (int j = 0; j < m; j++) {
                // A 1 extends the vertical sequence, while a 0 resets it.
                if (mat[i][j] == 1) {
                    height[j]++;
                } else {
                    height[j] = 0;
                }

                // I record this height so I do not need to sort the columns.
                count[height[j]]++;
            }

            // I store the number of columns available for the current height.
            int width = 0;

            // I process heights from largest to smallest because after swapping,
            // taller columns can be placed together before shorter columns.
            for (int h = n; h >= 1; h--) {
                // I include every column whose height is exactly h.
                width += count[h];

                // Height h is the limiting height for all selected columns.
                answer = Math.max(answer, h * width);
            }
        }

        // I return the largest rectangle area.
        return answer;
    }
}
class Solution {
    public ArrayList<ArrayList<Integer>> searchWord(char[][] mat, String word) {
        int n = mat.length; // Store the number of rows in the matrix.
        int m = mat[0].length; // Store the number of columns in the matrix.
        int k = word.length(); // Store the length of the word.

        ArrayList<ArrayList<Integer>> ans = new ArrayList<>(); // Store valid starting coordinates.

        // These 8 pairs represent the 8 possible straight-line directions.
        int[] dr = {-1, -1, -1, 0, 0, 1, 1, 1};
        int[] dc = {-1, 0, 1, -1, 1, -1, 0, 1};

        // Scan the matrix row by row so the answer is already lexicographically sorted.
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {

                // The word can only start from a cell containing its first character.
                if (mat[i][j] != word.charAt(0)) {
                    continue; // Skip this cell when the first character does not match.
                }

                // Try all 8 possible directions from this cell.
                for (int d = 0; d < 8; d++) {
                    boolean found = true; // Assume the word can be formed in this direction.

                    // Check all remaining characters along the same direction.
                    for (int p = 1; p < k; p++) {
                        int nr = i + p * dr[d]; // Calculate the row of the current character.
                        int nc = j + p * dc[d]; // Calculate the column of the current character.

                        // Check that the position is valid and the character matches.
                        if (nr < 0 || nr >= n || nc < 0 || nc >= m ||
                            mat[nr][nc] != word.charAt(p)) {
                            found = false; // The word cannot be formed in this direction.
                            break; // Stop checking this direction.
                        }
                    }

                    // Add the starting cell when the complete word was found.
                    if (found) {
                        ArrayList<Integer> position = new ArrayList<>(); // Create the coordinate pair.
                        position.add(i); // Add the row index.
                        position.add(j); // Add the column index.
                        ans.add(position); // Store this valid starting coordinate.
                        break; // Avoid adding the same starting cell again.
                    }
                }
            }
        }

        return ans; // Return all valid starting coordinates.
    }
}
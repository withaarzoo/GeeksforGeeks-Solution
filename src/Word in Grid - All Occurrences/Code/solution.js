class Solution {
  searchWord(mat, word) {
    const n = mat.length; // Store the number of rows in the matrix.
    const m = mat[0].length; // Store the number of columns in the matrix.
    const k = word.length; // Store the length of the word.

    const ans = []; // Store all valid starting coordinates.

    // These 8 pairs represent the 8 possible straight-line directions.
    const dr = [-1, -1, -1, 0, 0, 1, 1, 1];
    const dc = [-1, 0, 1, -1, 1, -1, 0, 1];

    // Scan row by row so coordinates are naturally lexicographically sorted.
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        // A valid occurrence must start with the first character of the word.
        if (mat[i][j] !== word[0]) {
          continue; // Skip this cell when the first character does not match.
        }

        // Try each of the 8 possible directions.
        for (let d = 0; d < 8; d++) {
          let found = true; // Assume the word matches in this direction.

          // Check every remaining character while keeping the same direction.
          for (let p = 1; p < k; p++) {
            const nr = i + p * dr[d]; // Calculate the row of the current character.
            const nc = j + p * dc[d]; // Calculate the column of the current character.

            // The position must be inside the matrix and contain the required character.
            if (
              nr < 0 ||
              nr >= n ||
              nc < 0 ||
              nc >= m ||
              mat[nr][nc] !== word[p]
            ) {
              found = false; // This direction does not contain the word.
              break; // Stop checking this direction.
            }
          }

          // If the complete word was found, store the starting position.
          if (found) {
            ans.push([i, j]); // Add the valid starting coordinate.
            break; // Prevent adding the same starting cell again.
          }
        }
      }
    }

    return ans; // Return all valid starting coordinates.
  }
}

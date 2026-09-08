class Solution:
    def searchWord(self, mat, word):
        n = len(mat)  # Store the number of rows in the matrix.
        m = len(mat[0])  # Store the number of columns in the matrix.
        k = len(word)  # Store the length of the word.

        ans = []  # Store all valid starting coordinates.

        # These 8 pairs represent the 8 possible straight-line directions.
        directions = [
            (-1, -1), (-1, 0), (-1, 1),
            (0, -1),           (0, 1),
            (1, -1),  (1, 0),  (1, 1)
        ]

        # Scan the matrix row by row so coordinates stay lexicographically sorted.
        for i in range(n):
            for j in range(m):

                # A valid occurrence must start with the first character of the word.
                if mat[i][j] != word[0]:
                    continue  # Skip this cell when the first character does not match.

                # Try all 8 possible directions from the current cell.
                for dr, dc in directions:
                    found = True  # Assume the word matches in this direction.

                    # Check every remaining character along the same direction.
                    for p in range(1, k):
                        nr = i + p * dr  # Calculate the row of the current character.
                        nc = j + p * dc  # Calculate the column of the current character.

                        # Check the boundary and make sure the character matches.
                        if (
                            nr < 0 or nr >= n or
                            nc < 0 or nc >= m or
                            mat[nr][nc] != word[p]
                        ):
                            found = False  # This direction cannot form the word.
                            break  # Stop checking this direction.

                    # Store the starting cell when the complete word was found.
                    if found:
                        ans.append([i, j])  # Add the valid starting coordinate.
                        break  # Avoid checking more directions for this cell.

        return ans  # Return all valid starting coordinates.
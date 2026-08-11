class Solution:
    def largestSquare(self, mat: list[list[int]], queries: list[list[int]], k: int) -> list[int]:
        n = len(mat)                           # Store the number of rows.
        m = len(mat[0])                        # Store the number of columns.

        # Create an extra row and column so rectangle sums
        # can be calculated without special boundary handling.
        prefix = [[0] * (m + 1) for _ in range(n + 1)]

        # Build the 2D prefix sum.
        for i in range(1, n + 1):
            for j in range(1, m + 1):
                # Add the current cell and upper/left regions,
                # then subtract the overlapping region counted twice.
                prefix[i][j] = (
                    mat[i - 1][j - 1]
                    + prefix[i - 1][j]
                    + prefix[i][j - 1]
                    - prefix[i - 1][j - 1]
                )

        # Return the number of 1s inside a rectangle in O(1).
        def get_sum(r1: int, c1: int, r2: int, c2: int) -> int:
            # Shift matrix coordinates by one for the prefix array.
            r1 += 1
            c1 += 1
            r2 += 1
            c2 += 1

            # Use inclusion-exclusion to calculate the rectangle sum.
            return (
                prefix[r2][c2]
                - prefix[r1 - 1][c2]
                - prefix[r2][c1 - 1]
                + prefix[r1 - 1][c1 - 1]
            )

        answer = []                             # Store the result of each query.

        # Process every query independently.
        for i, j in queries:
            # Find the largest radius that keeps the square inside the matrix.
            max_radius = min(
                i,
                j,
                n - 1 - i,
                m - 1 - j
            )

            low = 0                             # Smallest possible radius.
            high = max_radius                   # Largest possible radius.
            best = -1                            # No valid square found yet.

            # Binary search for the largest valid radius.
            while low <= high:
                mid = low + (high - low) // 2

                # Calculate the four boundaries of the current square.
                r1 = i - mid
                c1 = j - mid
                r2 = i + mid
                c2 = j + mid

                # Count all 1s in the current square in O(1).
                ones = get_sum(r1, c1, r2, c2)

                if ones <= k:
                    # This radius is valid, so save it
                    # and search for a larger valid radius.
                    best = mid
                    low = mid + 1
                else:
                    # Too many 1s means we need a smaller radius.
                    high = mid - 1

            # Convert the radius into the odd side length.
            # If best is -1, this correctly returns -1.
            answer.append(2 * best + 1)

        return answer
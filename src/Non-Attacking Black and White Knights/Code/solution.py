class Solution:
    def numOfWays(self, n: int, m: int) -> int:

        # Total cells on the board
        cells = n * m

        # Total ordered placements of black and white knights
        total = cells * (cells - 1)

        # Count attacking placements
        attacking = 0

        # Count all possible 2 x 3 rectangles
        if n >= 2 and m >= 3:
            attacking += 4 * (n - 1) * (m - 2)

        # Count all possible 3 x 2 rectangles
        if n >= 3 and m >= 2:
            attacking += 4 * (n - 2) * (m - 1)

        # Return non-attacking placements
        return total - attacking
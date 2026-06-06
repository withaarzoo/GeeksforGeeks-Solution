class Solution {
  numOfWays(n, m) {
    // Total cells on the board
    let cells = n * m;

    // Total ordered placements
    let total = cells * (cells - 1);

    // Count attacking placements
    let attacking = 0;

    // Count all possible 2 x 3 rectangles
    if (n >= 2 && m >= 3) {
      attacking += 4 * (n - 1) * (m - 2);
    }

    // Count all possible 3 x 2 rectangles
    if (n >= 3 && m >= 2) {
      attacking += 4 * (n - 2) * (m - 1);
    }

    // Non-attacking placements
    return total - attacking;
  }
}

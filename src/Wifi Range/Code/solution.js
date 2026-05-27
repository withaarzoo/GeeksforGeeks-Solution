/**
 * @param {string} s
 * @param {number} x
 * @returns {boolean}
 */
class Solution {
  wifiRange(s, x) {
    // I store the string length to check the boundaries later.
    let n = s.length;

    // I track the first router, previous router, and last router positions.
    let first = -1,
      prev = -1,
      last = -1;

    // I scan the string once from left to right.
    for (let i = 0; i < n; i++) {
      // A '1' means there is a router in this room.
      if (s[i] === "1") {
        // I save the first router for the left edge check.
        if (first === -1) first = i;

        // I compare this router with the previous one.
        // If the gap is too large, some rooms between them are uncovered.
        if (prev !== -1 && i - prev > 2 * x + 1) {
          return false;
        }

        // I update prev so the next router can be checked.
        prev = i;

        // I remember the last router for the right edge check.
        last = i;
      }
    }

    // If there is no router, coverage is impossible.
    if (first === -1) return false;

    // The first router must cover index 0.
    if (first > x) return false;

    // The last router must cover the last index.
    if (n - 1 - last > x) return false;

    // If all checks pass, every room is covered.
    return true;
  }
}

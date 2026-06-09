/**
 * @param {number} k
 * @param {number[]} seats
 * @return {boolean}
 */

class Solution {
  canSeatAllPeople(k, seats) {
    const n = seats.length;

    // No people need seating
    if (k === 0) return true;

    // Visit every seat once
    for (let i = 0; i < n; i++) {
      // Skip occupied seat
      if (seats[i] === 1) continue;

      // Check left neighbor
      const leftEmpty = i === 0 || seats[i - 1] === 0;

      // Check right neighbor
      const rightEmpty = i === n - 1 || seats[i + 1] === 0;

      // Seat a person if both sides are safe
      if (leftEmpty && rightEmpty) {
        seats[i] = 1; // Mark occupied
        k--; // One person seated

        // Everyone seated
        if (k === 0) return true;
      }
    }

    // Not enough space available
    return false;
  }
}

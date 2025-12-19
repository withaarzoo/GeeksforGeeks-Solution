class Solution {
  findMoves(chairs, passengers) {
    // Step 1: Sort both arrays
    chairs.sort((a, b) => a - b);
    passengers.sort((a, b) => a - b);

    let moves = 0;

    // Step 2: Calculate total moves
    for (let i = 0; i < chairs.length; i++) {
      moves += Math.abs(chairs[i] - passengers[i]);
    }

    return moves;
  }
}

import java.util.Arrays;

class Solution {
    public int findMoves(int[] chairs, int[] passengers) {
        // Step 1: Sort both arrays
        Arrays.sort(chairs);
        Arrays.sort(passengers);

        int moves = 0;

        // Step 2: Calculate total moves
        for (int i = 0; i < chairs.length; i++) {
            moves += Math.abs(chairs[i] - passengers[i]);
        }

        return moves;
    }
}

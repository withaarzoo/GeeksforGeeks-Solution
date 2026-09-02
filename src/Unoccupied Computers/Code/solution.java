class Solution {
    public int solve(int n, String s) {
        // state[i] stores the status of customer with letter 'A' + i:
        // 0 = not seen yet, 1 = got a computer, 2 = was rejected.
        int[] state = new int[26];

        // Initially, all n computers are free.
        int available = n;

        // This counts customers who could not get a computer.
        int rejected = 0;

        // Process every event from left to right.
        for (char ch : s.toCharArray()) {
            // Convert the uppercase letter into an index from 0 to 25.
            int id = ch - 'A';

            // state 0 means this is the customer's first occurrence,
            // which represents their arrival.
            if (state[id] == 0) {
                // If a computer is available, assign it to the customer.
                if (available > 0) {
                    available--; // One computer becomes occupied.
                    state[id] = 1; // Mark this customer as accepted.
                } else {
                    // No computer is available, so the customer is rejected.
                    rejected++;

                    // Mark them as rejected so their second occurrence
                    // will not release a computer.
                    state[id] = 2;
                }
            } else {
                // This is the customer's second occurrence, so they leave.
                // Only an accepted customer can release a computer.
                if (state[id] == 1) {
                    available++; // The computer becomes free again.
                }
            }
        }

        // Return the number of customers who were rejected.
        return rejected;
    }
}
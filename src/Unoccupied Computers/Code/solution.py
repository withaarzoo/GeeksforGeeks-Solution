class Solution:
    def solve(self, n, s):
        # state[i] stores the status of customer 'A' + i:
        # 0 = not seen, 1 = got a computer, 2 = was rejected.
        state = [0] * 26

        # Initially, all n computers are free.
        available = n

        # This stores the number of customers who were rejected.
        rejected = 0

        # Process every customer event from left to right.
        for ch in s:
            # Convert the uppercase letter into an index from 0 to 25.
            idx = ord(ch) - ord('A')

            # state 0 means this is the customer's first occurrence,
            # so this is their arrival.
            if state[idx] == 0:
                # A free computer is available, so assign it.
                if available > 0:
                    available -= 1  # One computer becomes occupied.
                    state[idx] = 1   # Mark the customer as accepted.
                else:
                    # No computer is free, so reject the customer.
                    rejected += 1

                    # Mark them as rejected so their second occurrence
                    # will not free a computer.
                    state[idx] = 2
            else:
                # This is the customer's second occurrence,
                # so the customer is leaving.
                if state[idx] == 1:
                    available += 1  # Their computer becomes free.

        # Return the total number of rejected customers.
        return rejected
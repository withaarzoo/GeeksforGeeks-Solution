class Solution:
    def canSeatAllPeople(self, k, seats):
        n = len(seats)

        # No people need seating
        if k == 0:
            return True

        # Traverse every seat
        for i in range(n):

            # Skip occupied seats
            if seats[i] == 1:
                continue

            # Check left neighbor
            left_empty = (i == 0 or seats[i - 1] == 0)

            # Check right neighbor
            right_empty = (i == n - 1 or seats[i + 1] == 0)

            # Seat a person if position is valid
            if left_empty and right_empty:
                seats[i] = 1  # Mark occupied
                k -= 1        # One person seated

                # Everyone seated successfully
                if k == 0:
                    return True

        # Could not seat all people
        return False
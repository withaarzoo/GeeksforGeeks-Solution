class Solution:
    def wifiRange(self, s, x):
        # I store the string length so I can check the ends after the scan.
        n = len(s)

        # I keep track of the first router, previous router, and last router.
        first = -1
        prev = -1
        last = -1

        # I scan the string once.
        for i in range(n):
            # A '1' means a router exists in this room.
            if s[i] == '1':
                # I record the first router so I can check the left boundary.
                if first == -1:
                    first = i

                # I compare this router with the previous one.
                # If the distance is too large, there is an uncovered gap.
                if prev != -1 and i - prev > 2 * x + 1:
                    return False

                # I move prev forward for the next comparison.
                prev = i

                # I save the last router for the right boundary check.
                last = i

        # No router means no room can be covered.
        if first == -1:
            return False

        # The first router must reach the leftmost room.
        if first > x:
            return False

        # The last router must reach the rightmost room.
        if n - 1 - last > x:
            return False

        # If nothing failed, all rooms are covered.
        return True
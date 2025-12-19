class Solution:
    def findMoves(self, chairs, passengers):
        # Step 1: Sort both lists
        chairs.sort()
        passengers.sort()

        moves = 0

        # Step 2: Calculate total moves
        for i in range(len(chairs)):
            moves += abs(chairs[i] - passengers[i])

        return moves

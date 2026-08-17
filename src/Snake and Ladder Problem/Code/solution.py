class Solution:
    def minThrows(self, n, lad, sn):
        total = n * n  # The last cell of the board is n*n.

        jump = [0] * (total + 1)  # Stores the destination of every snake or ladder.

        # Store all ladders as direct jumps from their starting cell.
        for i in range(0, len(lad), 2):
            jump[lad[i]] = lad[i + 1]  # From the ladder start, immediately move to its end.

        # Store all snakes as direct jumps from their starting cell.
        for i in range(0, len(sn), 2):
            jump[sn[i]] = sn[i + 1]  # From the snake start, immediately move to its end.

        visited = [False] * (total + 1)  # Prevents processing the same cell multiple times.

        queue = [(1, 0)]  # BFS queue stores (cell, number of throws used).
        head = 0  # Using an index avoids removing elements from the front of the list.

        visited[1] = True  # Mark the starting cell as visited.

        while head < len(queue):
            cell, throws = queue[head]  # Get the next cell and its distance.
            head += 1  # Move the queue pointer to the next state.

            if cell == total:
                return throws  # Reaching the final cell gives the minimum answer.

            # Try every possible dice result from 1 to 6.
            for dice in range(1, 7):
                next_cell = cell + dice  # Move forward according to the dice value.

                if next_cell > total:
                    continue  # Ignore moves that go beyond the final cell.

                if jump[next_cell] != 0:
                    next_cell = jump[next_cell]  # Immediately take the snake or ladder.

                if not visited[next_cell]:
                    visited[next_cell] = True  # Mark it before adding it to avoid duplicates.
                    queue.append((next_cell, throws + 1))  # This move uses one more throw.

        return -1  # The final cell cannot be reached.
class Solution:
    def maxProfit(self, x, y, a, b):
        # Total number of tasks.
        n = len(a)

        # Base profit if I send every task to machine B first.
        base = 0

        # This list stores the extra gain of moving a task from B to A.
        diff = []

        for i in range(n):
            base += b[i]              # Add B's profit for this task to the base total.
            diff.append(a[i] - b[i])  # Store how much more or less A gives for this task.

        diff.sort(reverse=True)       # I want the largest gains first.

        low = max(0, n - y)           # Minimum tasks that must go to A so B does not overflow.
        high = min(x, n)              # Maximum tasks that can go to A.

        running = 0                   # Running sum of selected gains.
        best_gain = 0 if low == 0 else float("-inf")  # Best valid gain seen so far.

        for i in range(n):
            running += diff[i]        # Gain if I take the first i+1 best tasks for A.
            taken = i + 1             # Number of tasks currently assigned to A.

            if low <= taken <= high:
                best_gain = max(best_gain, running)  # Keep the best valid choice.

            if taken > high:
                break                 # I stop once I go beyond A's capacity.

        return base + best_gain        # Final answer = base profit + best extra gain
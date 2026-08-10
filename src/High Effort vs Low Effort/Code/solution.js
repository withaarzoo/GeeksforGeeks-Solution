class Solution {
    maxTask(h, l) {
        // n represents the total number of available days.
        const n = h.length;

        // On day 0, I can choose either type of task.
        // I take the one that gives more tasks.
        let prev1 = Math.max(h[0], l[0]);

        // This represents the result before day 0.
        // It acts as dp[-1] = 0.
        let prev2 = 0;

        // Process every remaining day.
        for (let i = 1; i < n; i++) {
            // If I choose low effort today,
            // I can continue from the best result of yesterday.
            const lowChoice = prev1 + l[i];

            // If I choose high effort today,
            // yesterday must have no task, so I use the result from i - 2.
            const highChoice = prev2 + h[i];

            // Pick the better option for the current day.
            const current = Math.max(lowChoice, highChoice);

            // Shift the previous states for the next iteration.
            prev2 = prev1;
            prev1 = current;
        }

        // Return the maximum total number of tasks.
        return prev1;
    }
}
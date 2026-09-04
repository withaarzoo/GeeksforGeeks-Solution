/**
 * @param {number[]} arr
 * @param {number} m
 * @returns {number}
 */
maxFruits(arr, m) {
    const n = arr.length;                    // Store the number of trees.
    const k = Math.min(m, n);                // We cannot use more than n trees.

    let windowSum = 0;                       // Store the current window sum.

    // Build the first window containing k consecutive trees.
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];                 // Add the fruit value to the window.
    }

    let ans = windowSum;                     // The first window is our initial maximum.

    // Move the window to every other starting position on the circle.
    for (let start = 1; start < n; start++) {
        const removed = start - 1;           // This tree leaves the current window.

        // Modulo wraps around when the window crosses the end of the array.
        const added = (start + k - 1) % n;

        windowSum -= arr[removed];            // Remove the old first tree.
        windowSum += arr[added];              // Add the new last tree.

        ans = Math.max(ans, windowSum);       // Keep the best window found so far.
    }

    return ans;                              // Return the maximum fruit value.
}
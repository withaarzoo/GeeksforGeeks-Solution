class Solution {
  findMax(n, a, b, k) {
    // Difference array initialized with 0
    const diff = new Array(n + 1).fill(0);

    // Apply each range update
    for (let i = 0; i < a.length; i++) {
      // Increment begins here
      diff[a[i]] += k[i];

      // Remove the increment after the range ends
      if (b[i] + 1 < n) diff[b[i] + 1] -= k[i];
    }

    let current = 0;
    let maximum = 0;

    // Build the final values using prefix sum
    for (let i = 0; i < n; i++) {
      // Current array value
      current += diff[i];

      // Update answer
      maximum = Math.max(maximum, current);
    }

    return maximum;
  }
}

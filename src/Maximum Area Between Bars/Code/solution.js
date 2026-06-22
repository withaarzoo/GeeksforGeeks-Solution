class Solution {
  maxArea(height) {
    const n = height.length; // I store the number of bars.
    if (n < 2) return 0; // I need at least two bars to form a rectangle.

    let left = 0; // I start from the left end.
    let right = n - 1; // I start from the right end.
    let best = 0; // I keep the maximum area found so far.

    while (left + 1 < right) {
      // I continue only while there is at least one bar between the pointers.
      const width = right - left - 1; // I count only the bars between the chosen bars.
      const current = Math.min(height[left], height[right]) * width; // I use the shorter bar as the limiting height.
      if (current > best) best = current; // I update the best answer.

      if (height[left] <= height[right]) {
        left++; // I move the shorter side inward because that is the only side that may increase the limiting height.
      } else {
        right--; // I move the other side inward when it is shorter.
      }
    }

    return best; // I return the best area I found.
  }
}

class Solution {
  maxCharGap(s) {
    // firstPos[i] stores the first index where each letter appeared
    const firstPos = new Array(26).fill(-1);

    // I keep -1 so the answer stays correct if no character repeats
    let maxGap = -1;

    // I scan the string once from left to right
    for (let i = 0; i < s.length; i++) {
      // Convert the current lowercase letter into an index from 0 to 25
      const index = s.charCodeAt(i) - 97;

      // If this is the first occurrence, I store its position
      if (firstPos[index] === -1) {
        firstPos[index] = i;
      } else {
        // Subtract 1 because I only count characters between the two matches
        const gap = i - firstPos[index] - 1;

        // Keep the largest gap found so far
        maxGap = Math.max(maxGap, gap);
      }
    }

    // Returns -1 automatically if no character appeared twice
    return maxGap;
  }
}

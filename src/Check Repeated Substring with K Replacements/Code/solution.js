/**
 * @param {string} s
 * @param {number} k
 * @return {boolean}
 */
class Solution {
  kSubstr(s, k) {
    const n = s.length;

    // String must be divisible into blocks of length k
    if (n % k !== 0) return false;

    // Frequency map for all blocks
    const freq = new Map();

    // Extract blocks of size k
    for (let i = 0; i < n; i += k) {
      const block = s.substring(i, i + k);
      freq.set(block, (freq.get(block) || 0) + 1);
    }

    // All blocks already same
    if (freq.size === 1) return true;

    // More than two distinct blocks cannot be fixed
    if (freq.size > 2) return false;

    // One block should appear exactly once
    for (const count of freq.values()) {
      if (count === 1) return true;
    }

    return false;
  }
}

class Solution {
  countSubstring(s) {
    const n = s.length;

    // Prefix sums stay between -n and n.
    // The offset lets me use every sum as an array index.
    const offset = n;
    const freq = new Array(2 * n + 1).fill(0);

    // The empty prefix has sum 0 and appears once.
    freq[offset] = 1;

    let prefix = 0;

    // This stores how many previous prefix sums
    // are smaller than the current prefix sum.
    let smaller = 0;

    // This stores the total number of valid substrings.
    let answer = 0;

    for (const ch of s) {
      if (ch === "1") {
        // The prefix moves from prefix to prefix + 1.
        // Old equal prefix sums now become smaller.
        smaller += freq[prefix + offset];

        // A '1' contributes +1.
        prefix++;
      } else {
        // The new prefix will be prefix - 1.
        // Values equal to it are no longer smaller.
        smaller -= freq[prefix - 1 + offset];

        // A '0' contributes -1.
        prefix--;
      }

      // Each smaller previous prefix gives one valid substring.
      answer += smaller;

      // Store the current prefix sum for later positions.
      freq[prefix + offset]++;
    }

    return answer;
  }
}

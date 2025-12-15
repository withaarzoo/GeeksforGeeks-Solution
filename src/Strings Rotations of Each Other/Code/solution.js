class Solution {
  areRotations(s1, s2) {
    // Step 1: Length check
    if (s1.length !== s2.length) {
      return false;
    }

    // Step 2: Concatenate s1 with itself
    let temp = s1 + s1;

    // Step 3: Check substring
    return temp.includes(s2);
  }
}

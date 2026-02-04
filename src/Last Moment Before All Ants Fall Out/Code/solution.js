class Solution {
  getLastMoment(n, left, right) {
    let ans = 0;

    // Ants moving to the left
    for (let pos of left) {
      ans = Math.max(ans, pos);
    }

    // Ants moving to the right
    for (let pos of right) {
      ans = Math.max(ans, n - pos);
    }

    return ans;
  }
}

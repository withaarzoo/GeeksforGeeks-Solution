class Solution {
  countSubarrays(arr) {
    let n = arr.length;
    let stack = [];
    let ans = 0;

    for (let i = n - 1; i >= 0; i--) {
      // Maintain monotonic stack
      while (stack.length && arr[stack[stack.length - 1]] >= arr[i]) {
        stack.pop();
      }

      if (stack.length === 0) {
        ans += n - i;
      } else {
        ans += stack[stack.length - 1] - i;
      }

      stack.push(i);
    }

    return ans;
  }
}

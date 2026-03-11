class Solution {
  sumSubMins(arr) {
    let n = arr.length;
    let left = new Array(n);
    let right = new Array(n);
    let stack = [];

    // Previous Less Element
    for (let i = 0; i < n; i++) {
      while (stack.length && arr[stack[stack.length - 1]] > arr[i]) {
        stack.pop();
      }

      if (stack.length === 0) left[i] = i + 1;
      else left[i] = i - stack[stack.length - 1];

      stack.push(i);
    }

    stack = [];

    // Next Less Element
    for (let i = n - 1; i >= 0; i--) {
      while (stack.length && arr[stack[stack.length - 1]] >= arr[i]) {
        stack.pop();
      }

      if (stack.length === 0) right[i] = n - i;
      else right[i] = stack[stack.length - 1] - i;

      stack.push(i);
    }

    let ans = 0;

    for (let i = 0; i < n; i++) {
      ans += arr[i] * left[i] * right[i];
    }

    return ans;
  }
}

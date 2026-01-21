class Solution {
  calculateSpan(arr) {
    const n = arr.length;
    const span = new Array(n);
    const stack = []; // stores indices

    for (let i = 0; i < n; i++) {
      while (stack.length > 0 && arr[stack[stack.length - 1]] <= arr[i]) {
        stack.pop();
      }

      span[i] = stack.length === 0 ? i + 1 : i - stack[stack.length - 1];

      stack.push(i);
    }

    return span;
  }
}

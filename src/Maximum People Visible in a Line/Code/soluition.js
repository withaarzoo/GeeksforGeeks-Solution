/**
 * @param {number[]} arr
 * @returns {number}
 */
class Solution {
  maxPeople(arr) {
    const n = arr.length;
    if (n === 0) return 0;

    const next_ge = new Array(n).fill(n); // default n => no block to right
    const prev_ge = new Array(n).fill(-1); // default -1 => no block to left
    const st = [];

    // compute next_ge (nearest index to right with height >= arr[i])
    for (let i = 0; i < n; ++i) {
      while (st.length && arr[i] >= arr[st[st.length - 1]]) {
        next_ge[st.pop()] = i;
      }
      st.push(i);
    }
    st.length = 0; // clear stack

    // compute prev_ge (nearest index to left with height >= arr[i])
    for (let i = 0; i < n; ++i) {
      while (st.length && arr[st[st.length - 1]] < arr[i]) st.pop();
      if (st.length) prev_ge[i] = st[st.length - 1];
      st.push(i);
    }

    let ans = 0;
    for (let i = 0; i < n; ++i) {
      const left_count = i - prev_ge[i] - 1;
      const right_count = next_ge[i] - i - 1;
      const total = left_count + right_count + 1;
      if (total > ans) ans = total;
    }
    return ans;
  }
}

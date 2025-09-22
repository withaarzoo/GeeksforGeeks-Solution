/**
 * @param {number[]} arr
 * @returns {number[]}
 */
class Solution {
  maxOfMins(arr) {
    const n = arr.length;
    if (n === 0) return [];
    const left = new Array(n);
    const right = new Array(n);
    const st = [];

    // previous smaller (strictly smaller)
    for (let i = 0; i < n; ++i) {
      while (st.length && arr[st[st.length - 1]] >= arr[i]) st.pop();
      left[i] = st.length ? st[st.length - 1] : -1;
      st.push(i);
    }

    st.length = 0; // clear

    // next smaller (strictly smaller)
    for (let i = n - 1; i >= 0; --i) {
      while (st.length && arr[st[st.length - 1]] >= arr[i]) st.pop();
      right[i] = st.length ? st[st.length - 1] : n;
      st.push(i);
    }

    const answer = new Array(n + 1).fill(0); // default 0 because arr[i] >= 1
    for (let i = 0; i < n; ++i) {
      const len = right[i] - left[i] - 1;
      if (arr[i] > answer[len]) answer[len] = arr[i];
    }

    // propagate maxima from larger windows to smaller ones
    for (let len = n - 1; len >= 1; --len) {
      if (answer[len + 1] > answer[len]) answer[len] = answer[len + 1];
    }

    const res = new Array(n);
    for (let i = 1; i <= n; ++i) res[i - 1] = answer[i];
    return res;
  }
}

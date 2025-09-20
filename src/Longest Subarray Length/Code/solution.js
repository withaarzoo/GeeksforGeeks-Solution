class Solution {
  longestSubarray(arr) {
    const n = arr.length;
    const left = new Array(n);
    const right = new Array(n);
    let st = [];

    for (let i = 0; i < n; i++) {
      while (st.length > 0 && arr[st[st.length - 1]] <= arr[i]) {
        st.pop();
      }
      left[i] = st.length === 0 ? -1 : st[st.length - 1];
      st.push(i);
    }

    st = [];

    for (let i = n - 1; i >= 0; i--) {
      while (st.length > 0 && arr[st[st.length - 1]] <= arr[i]) {
        st.pop();
      }
      right[i] = st.length === 0 ? n : st[st.length - 1];
      st.push(i);
    }

    let ans = 0;
    for (let i = 0; i < n; i++) {
      const length = right[i] - left[i] - 1;
      if (arr[i] <= length) {
        ans = Math.max(ans, length);
      }
    }

    return ans;
  }
}

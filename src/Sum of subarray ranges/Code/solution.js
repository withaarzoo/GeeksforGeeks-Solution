class Solution {
  subarrayRanges(arr) {
    const n = arr.length;
    let maxSum = 0,
      minSum = 0;
    let left = Array(n),
      right = Array(n);
    let st = [];

    // ---------- Maximum ----------
    st = [];
    for (let i = 0; i < n; i++) {
      while (st.length && arr[st[st.length - 1]] <= arr[i]) st.pop();
      left[i] = st.length === 0 ? i + 1 : i - st[st.length - 1];
      st.push(i);
    }

    st = [];
    for (let i = n - 1; i >= 0; i--) {
      while (st.length && arr[st[st.length - 1]] < arr[i]) st.pop();
      right[i] = st.length === 0 ? n - i : st[st.length - 1] - i;
      st.push(i);
    }

    for (let i = 0; i < n; i++) maxSum += arr[i] * left[i] * right[i];

    // ---------- Minimum ----------
    st = [];
    for (let i = 0; i < n; i++) {
      while (st.length && arr[st[st.length - 1]] >= arr[i]) st.pop();
      left[i] = st.length === 0 ? i + 1 : i - st[st.length - 1];
      st.push(i);
    }

    st = [];
    for (let i = n - 1; i >= 0; i--) {
      while (st.length && arr[st[st.length - 1]] > arr[i]) st.pop();
      right[i] = st.length === 0 ? n - i : st[st.length - 1] - i;
      st.push(i);
    }

    for (let i = 0; i < n; i++) minSum += arr[i] * left[i] * right[i];

    return maxSum - minSum;
  }
}

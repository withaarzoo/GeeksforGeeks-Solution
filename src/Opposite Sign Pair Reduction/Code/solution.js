class Solution {
  reducePairs(arr) {
    let st = [];

    for (let x of arr) {
      let alive = true;

      while (st.length > 0 && alive && st[st.length - 1] * x < 0) {
        let top = st[st.length - 1];

        if (Math.abs(top) === Math.abs(x)) {
          st.pop();
          alive = false;
        } else if (Math.abs(top) > Math.abs(x)) {
          alive = false;
        } else {
          st.pop();
        }
      }

      if (alive) st.push(x);
    }

    return st;
  }
}

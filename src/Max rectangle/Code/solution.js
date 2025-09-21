/**
 * @param {number[][]} mat
 * @returns {number}
 */
class Solution {
  maxArea(mat) {
    if (!mat || mat.length === 0 || mat[0].length === 0) return 0;
    const n = mat.length;
    const m = mat[0].length;
    const heights = new Array(m).fill(0);
    let maxArea = 0;

    for (let i = 0; i < n; i++) {
      // update histogram heights
      for (let j = 0; j < m; j++) {
        heights[j] = mat[i][j] === 1 ? heights[j] + 1 : 0;
      }

      // largest rectangle in histogram using stack
      const st = [];
      for (let j = 0; j <= m; j++) {
        const cur = j === m ? 0 : heights[j]; // sentinel
        while (st.length > 0 && heights[st[st.length - 1]] > cur) {
          const h = heights[st.pop()];
          const width = st.length === 0 ? j : j - st[st.length - 1] - 1;
          maxArea = Math.max(maxArea, h * width);
        }
        st.push(j);
      }
    }
    return maxArea;
  }
}

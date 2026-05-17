class Solution {
  makeBeautiful(arr) {
    // Array used like a stack
    let st = [];

    // Traverse the array
    for (let num of arr) {
      // Get last element from stack
      let top = st[st.length - 1];

      // Check if signs are opposite
      if (st.length > 0 && ((top >= 0 && num < 0) || (top < 0 && num >= 0))) {
        // Remove previous element
        st.pop();
      } else {
        // Keep current element
        st.push(num);
      }
    }

    // Return final beautiful array
    return st;
  }
}

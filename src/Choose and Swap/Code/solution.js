class Solution {
  chooseSwap(s) {
    const n = s.length;

    // Stores first occurrence of every character
    const first = new Array(26).fill(-1);

    // Record first occurrence
    for (let i = 0; i < n; i++) {
      const idx = s.charCodeAt(i) - 97;

      if (first[idx] === -1) {
        first[idx] = i;
      }
    }

    let arr = s.split("");

    // Find earliest beneficial swap
    for (let i = 0; i < n; i++) {
      for (let ch = 0; ch < arr[i].charCodeAt(0) - 97; ch++) {
        // Smaller character exists later
        if (first[ch] > i) {
          const c1 = arr[i];
          const c2 = String.fromCharCode(ch + 97);

          // Swap all occurrences globally
          for (let j = 0; j < n; j++) {
            if (arr[j] === c1) arr[j] = c2;
            else if (arr[j] === c2) arr[j] = c1;
          }

          return arr.join("");
        }
      }
    }

    return s;
  }
}

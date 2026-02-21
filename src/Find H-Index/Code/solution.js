class Solution {
  hIndex(citations) {
    let n = citations.length;

    // Step 1: Sort array in ascending order
    citations.sort((a, b) => a - b);

    // Step 2: Traverse and check
    for (let i = 0; i < n; i++) {
      let papers = n - i;

      if (citations[i] >= papers) {
        return papers;
      }
    }

    return 0;
  }
}

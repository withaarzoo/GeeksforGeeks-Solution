class Solution {
  huffmanCodes(s, f) {
    class Node {
      constructor(freq, idx) {
        this.freq = freq;
        this.idx = idx;
        this.left = null;
        this.right = null;
      }
    }

    let pq = [];

    // Insert all nodes into array
    for (let i = 0; i < f.length; i++) {
      pq.push(new Node(f[i], i));
    }

    // Function to sort based on frequency and index
    const sortHeap = () => {
      pq.sort((a, b) => {
        if (a.freq === b.freq) return a.idx - b.idx;
        return a.freq - b.freq;
      });
    };

    // Special case
    if (f.length === 1) return ["0"];

    sortHeap();

    // Build Huffman Tree
    while (pq.length > 1) {
      sortHeap();

      let left = pq.shift();
      let right = pq.shift();

      let parent = new Node(
        left.freq + right.freq,
        Math.min(left.idx, right.idx),
      );

      parent.left = left;
      parent.right = right;

      pq.push(parent);
    }

    let ans = [];

    const buildCodes = (root, code) => {
      if (!root) return;

      // Leaf node
      if (!root.left && !root.right) {
        ans.push(code);
        return;
      }

      buildCodes(root.left, code + "0");
      buildCodes(root.right, code + "1");
    };

    buildCodes(pq[0], "");

    return ans;
  }
}

class TrieNode {
  constructor() {
    // Store children
    this.child = new Array(26).fill(null);

    // Number of words sharing this prefix
    this.freq = 0;
  }
}

class Solution {
  findPrefixes(arr) {
    // Create Trie root
    let root = new TrieNode();

    // Insert every word
    for (let word of arr) {
      let node = root;

      for (let ch of word) {
        let idx = ch.charCodeAt(0) - 97;

        // Create node if needed
        if (node.child[idx] === null) node.child[idx] = new TrieNode();

        // Move forward
        node = node.child[idx];

        // Increase prefix frequency
        node.freq++;
      }
    }

    let ans = [];

    // Find shortest unique prefix
    for (let word of arr) {
      let node = root;
      let prefix = "";

      for (let ch of word) {
        let idx = ch.charCodeAt(0) - 97;

        // Move to next node
        node = node.child[idx];

        // Add character
        prefix += ch;

        // Prefix is now unique
        if (node.freq === 1) break;
      }

      ans.push(prefix);
    }

    return ans;
  }
}

class Solution {
  constructor() {
    this.MAX_BIT = 15; // 0..15, because values < 2^16
  }

  // helper: create new trie node
  _newNode() {
    return {
      child: [null, null],
      cnt: 0,
    };
  }

  // insert number x into trie
  insert(root, x) {
    let cur = root;
    for (let b = this.MAX_BIT; b >= 0; --b) {
      const bit = (x >> b) & 1;
      if (!cur.child[bit]) cur.child[bit] = this._newNode();
      cur = cur.child[bit];
      cur.cnt++; // one more number passes here
    }
  }

  // count numbers y in trie such that (x XOR y) < k
  countLess(root, x, k) {
    let cur = root;
    let res = 0;
    for (let b = this.MAX_BIT; b >= 0 && cur; --b) {
      const bitX = (x >> b) & 1;
      const bitK = (k >> b) & 1;

      if (bitK === 1) {
        // XOR bit 0 < 1: y's bit = bitX
        const same = cur.child[bitX];
        if (same) res += same.cnt;

        // XOR bit 1 == 1: y's bit = 1 - bitX, continue
        cur = cur.child[1 - bitX];
      } else {
        // bitK == 0: XOR bit must be 0, y's bit = bitX
        cur = cur.child[bitX];
      }
    }
    return res;
  }

  cntPairs(arr, k) {
    if (k === 0) return 0;

    const root = this._newNode();
    let ans = 0;

    for (const x of arr) {
      ans += this.countLess(root, x, k);
      this.insert(root, x);
    }
    return ans;
  }
}

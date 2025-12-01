# XOR Pairs less than K

## Table of Contents

* [Problem Summary](#problem-summary)
* [Constraints](#constraints)
* [Intuition](#intuition)
* [Approach](#approach)
* [Data Structures Used](#data-structures-used)
* [Operations & Behavior Summary](#operations--behavior-summary)
* [Complexity](#complexity)
* [Multi-language Solutions](#multi-language-solutions)

  * [C++](#c)
  * [Java](#java)
  * [JavaScript](#javascript)
  * [Python3](#python3)
* [Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)](#step-by-step-detailed-explanation-c-java-javascript-python3)
* [Examples](#examples)
* [How to use / Run locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

---

## Problem Summary

Given:

* An integer array `arr`
* An integer `k`

I have to **count the number of pairs `(i, j)`** such that:

* `i < j`
* `(arr[i] XOR arr[j]) < k`

I just need the **count of such pairs**.

---

## Constraints

From the GeeksforGeeks problem:

* `1 ≤ arr.size() ≤ 5 * 10^4`
* `1 ≤ arr[i] ≤ 5 * 10^4`
* `1 ≤ k ≤ 5 * 10^4`

---

## Intuition

At first, I thought to do it in the most simple way:

* Check **every pair `(i, j)`**
* Compute `arr[i] XOR arr[j]`
* Check if it’s `< k`
* If yes, increase the answer.

But number of pairs is `n * (n-1) / 2`.
For `n = 50,000`, that is around **1.25 billion pairs** → this will be **too slow**.

So I asked myself:

> “Can I somehow process each element and quickly know how many previous elements create XOR `< k` with it?”

This type of bitwise condition (XOR with limit) usually becomes easier if I use a **binary trie (0/1 trie)**.

So the idea came:

* Store all previous numbers in a **bitwise trie**.
* For the current element `x`, I traverse the trie and count **how many stored numbers `y`** give `(x XOR y) < k`.
* Then I insert `x` into the trie for future numbers.

This reduces the problem from **O(n²)** to something near **O(n * log(MAX_VALUE))**.

---

## Approach

1. **Process elements from left to right**

   * For each `x = arr[i]`, I only consider previous elements `arr[0..i-1]`.
   * This ensures each pair is counted **exactly once**.

2. **Binary Representation**

   * Maximum value of any element and `k` is `≤ 5 * 10^4`.
   * `5 * 10^4 < 2^16`, so **16 bits** are enough.
   * I will treat numbers as 16-bit binary numbers.

3. **Binary Trie (0–1 Trie)**

   * Each node has:

     * `child[0]` and `child[1]` pointers (or references)
     * `cnt` = how many numbers pass through this node
   * I insert numbers bit-by-bit from **most significant bit (MSB)** to **least significant bit (LSB)**.

4. **Counting `(x XOR y) < k`**

   For the current element `x` and fixed `k`, I want:

   > Count of `y` in trie such that `x XOR y < k`.

   I compare bits from MSB to LSB:

   * Let `bitX` = current bit of `x`
   * Let `bitK` = current bit of `k`

   **Case A: `bitK == 0`**

   * At this bit, in result `(x XOR y)`, the bit **must be 0**,
     because if it becomes 1, then the result would be **greater** than `k` at this bit.
   * For XOR bit to be 0 → `y`’s bit must be same as `bitX`.
   * So I can only move to trie child `child[bitX]`.
     The other branch is **not allowed**.

   **Case B: `bitK == 1`**

   * Two options:

     1. **Result bit = 0**

        * `0 < 1`, so at this bit result is already **strictly less** than `k`.
        * Now lower bits can be anything.
        * For XOR bit 0 → `y`’s bit = `bitX`.
        * So all numbers in `child[bitX]` subtree are valid. I add their `cnt` to result.

     2. **Result bit = 1**

        * `1 == 1`, so still equal to `k` so far.
        * For XOR bit 1 → `y`’s bit = `1 - bitX`.
        * I move traversal to `child[1 - bitX]` and continue checking lower bits.

   If at any point required child is `null`, I break, because no more numbers exist on that path.

5. **Main process:**

   * Initialize an empty trie.
   * Initialize `ans = 0`.
   * For each `x` in `arr`:

     1. `ans += countLess(x, k)` using the trie with previous numbers.
     2. Insert `x` into the trie.
   * Return `ans`.

6. **Edge Case:**

   * If `k == 0`, then no XOR value can be `< 0`,
     so answer is **0** directly.

---

## Data Structures Used

* **Binary Trie (0/1 Trie)**

  * Tree-like structure where each level represents one bit.
  * Depth ~ 16 (because numbers < 2^16).
  * Each node stores:

    * Two children: `child[0]`, `child[1]`
    * `cnt` = how many numbers go through this node.

No other heavy data structures are used.

---

## Operations & Behavior Summary

1. **Insert(x)**

   * Traverse from bit 15 to 0
   * Move / create child corresponding to each bit of `x`
   * Increase `cnt` on each visited node.

2. **CountLess(x, k)**

   * Traverse trie from MSB to LSB
   * According to each bit of `k`, decide:

     * which branch is mandatory,
     * which branch can be fully counted and added to the answer.
   * Return total count of valid numbers.

3. **Overall Behavior**

   * For each new number:

     * Count valid pairs with previous numbers.
     * Insert current number into trie.
   * Finally return total count.

---

## Complexity

Let:

* `n` = size of array

* `B` = number of bits used (here 16)

* **Time Complexity:**

  * For each of `n` numbers:

    * `insert` takes `O(B)`
    * `countLess` takes `O(B)`
  * Total: `O(n * B)` ≈ `O(n * log(MAX_VALUE))`
  * With `B = 16`, this is very efficient for `n = 50,000`.

* **Space Complexity:**

  * At worst, each number adds up to `B` new nodes in the trie.
  * So space: `O(n * B)`
  * This is acceptable for given constraints.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    // Trie node for binary representation
    struct Node {
        Node* child[2];
        int cnt; // how many numbers pass through this node
        Node() {
            child[0] = child[1] = nullptr;
            cnt = 0;
        }
    };
    
    // maximum bits needed: values <= 5*10^4 < 2^16
    static const int MAX_BIT = 15;
    
    // insert number 'x' into trie
    void insert(Node* root, int x) {
        Node* cur = root;
        for (int b = MAX_BIT; b >= 0; --b) {
            int bit = (x >> b) & 1;
            if (!cur->child[bit]) cur->child[bit] = new Node();
            cur = cur->child[bit];
            cur->cnt++; // one more number passes here
        }
    }
    
    // count numbers 'y' already in trie such that (x XOR y) < k
    long long countLess(Node* root, int x, int k) {
        Node* cur = root;
        long long res = 0;
        for (int b = MAX_BIT; b >= 0 && cur; --b) {
            int bitX = (x >> b) & 1;
            int bitK = (k >> b) & 1;
            
            if (bitK == 1) {
                // option 1: (x xor y) bit = 0 < 1
                // y's bit must be bitX, all such numbers are valid
                Node* same = cur->child[bitX];
                if (same) res += same->cnt;
                
                // option 2: (x xor y) bit = 1 == 1
                // need to continue with y's bit = 1 - bitX
                cur = cur->child[1 - bitX];
            } else {
                // bitK == 0: (x xor y) bit must be 0, so y's bit = bitX
                cur = cur->child[bitX];
            }
        }
        return res;
    }

    int cntPairs(vector<int>& arr, int k) {
        // if k == 0, no XOR can be < 0
        if (k == 0) return 0;
        
        Node* root = new Node();
        long long ans = 0;
        
        for (int x : arr) {
            // count pairs with previous numbers
            ans += countLess(root, x, k);
            // add current number to trie for future
            insert(root, x);
        }
        
        // answer fits in 32-bit int for given constraints,
        // but we used long long to be safe while calculating
        return (int)ans;
    }
};
```

---

### Java

```java
class Solution {
    // Trie node class
    static class Node {
        Node[] child = new Node[2];
        int cnt; // how many numbers pass through this node
    }
    
    // maximum bit index (0..15)
    static final int MAX_BIT = 15;
    
    // insert number x into trie
    private void insert(Node root, int x) {
        Node cur = root;
        for (int b = MAX_BIT; b >= 0; --b) {
            int bit = (x >> b) & 1;
            if (cur.child[bit] == null) cur.child[bit] = new Node();
            cur = cur.child[bit];
            cur.cnt++; // one more number passes here
        }
    }
    
    // count numbers y in trie such that (x XOR y) < k
    private long countLess(Node root, int x, int k) {
        Node cur = root;
        long res = 0;
        for (int b = MAX_BIT; b >= 0 && cur != null; --b) {
            int bitX = (x >> b) & 1;
            int bitK = (k >> b) & 1;
            
            if (bitK == 1) {
                // XOR bit 0 < 1: y's bit = bitX
                Node same = cur.child[bitX];
                if (same != null) res += same.cnt;
                
                // XOR bit 1 == 1: y's bit = 1 - bitX, continue
                cur = cur.child[1 - bitX];
            } else {
                // bitK == 0: XOR bit must be 0, y's bit = bitX
                cur = cur.child[bitX];
            }
        }
        return res;
    }
    
    public int cntPairs(int[] arr, int k) {
        if (k == 0) return 0;
        
        Node root = new Node();
        long ans = 0;
        
        for (int x : arr) {
            ans += countLess(root, x, k);
            insert(root, x);
        }
        return (int)ans;
    }
}
```

---

### JavaScript

```javascript
class Solution {
    constructor() {
        this.MAX_BIT = 15; // 0..15, because values < 2^16
    }

    // helper: create new trie node
    _newNode() {
        return {
            child: [null, null],
            cnt: 0
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
```

---

### Python3

```python
class Solution:
    MAX_BIT = 15  # because values <= 5*10^4 < 2^16

    class Node:
        __slots__ = ("child", "cnt")
        def __init__(self):
            # child[0] and child[1]
            self.child = [None, None]
            self.cnt = 0  # how many numbers pass through this node

    def _insert(self, root, x: int) -> None:
        """Insert number x into the binary trie."""
        cur = root
        for b in range(self.MAX_BIT, -1, -1):
            bit = (x >> b) & 1
            if cur.child[bit] is None:
                cur.child[bit] = self.Node()
            cur = cur.child[bit]
            cur.cnt += 1  # one more number passes here

    def _count_less(self, root, x: int, k: int) -> int:
        """
        Count how many numbers y already in trie satisfy:
        (x XOR y) < k
        """
        cur = root
        res = 0
        for b in range(self.MAX_BIT, -1, -1):
            if cur is None:
                break
            bit_x = (x >> b) & 1
            bit_k = (k >> b) & 1

            if bit_k == 1:
                # Case 1: XOR bit = 0 < 1 -> y's bit = bit_x
                same = cur.child[bit_x]
                if same is not None:
                    res += same.cnt

                # Case 2: XOR bit = 1 == 1 -> y's bit = 1 - bit_x, keep comparing
                cur = cur.child[1 - bit_x]
            else:
                # bit_k == 0: XOR bit must be 0 -> y's bit = bit_x
                cur = cur.child[bit_x]
        return res

    def cntPairs(self, arr, k):
        if k == 0:
            return 0

        root = self.Node()
        ans = 0

        for x in arr:
            ans += self._count_less(root, x, k)
            self._insert(root, x)

        return ans
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

Logic har language me same hai, sirf syntax change hota hai.
Main Python-like pseudo steps se explain kar raha hoon, aur aap easily C++/Java/JS se map kar sakte ho.

### 1. Trie Node Design

**Common idea in all languages:**

```text
Node:
    child[2]  // pointers/references to next bits (0/1)
    cnt       // how many numbers pass through this node
```

* C++: `struct Node { Node* child[2]; int cnt; };`
* Java: `class Node { Node[] child = new Node[2]; int cnt; }`
* JS: object `{ child: [null, null], cnt: 0 }`
* Python: inner `Node` class with `child` list and `cnt`.

### 2. Insert Operation

Pseudo steps:

1. Start from `root`.

2. Loop bit index from `MAX_BIT` down to `0`.

3. Extract current bit of `x`:

   ```text
   bit = (x >> b) & 1
   ```

4. If `child[bit]` does not exist, create new node.

5. Move `cur` to that child.

6. Increase `cur.cnt` by 1.

This ensures that `cnt` at each node stores **how many numbers** have path through that node.

### 3. CountLess(x, k)

Pseudo steps:

1. `cur = root`, `res = 0`

2. For `b` from `MAX_BIT` down to 0:

   * If `cur` is `null`, break (no numbers available).
   * Take `bitX` (from `x`) and `bitK` (from `k`) at position `b`.

3. If `bitK == 1`:

   * Option 1: `(x XOR y)` bit = 0

     * `y` bit = `bitX`
     * All those numbers are valid since at this bit result is already `< k`.
     * So add `cur.child[bitX].cnt` to `res` if that child is non-null.
   * Option 2: `(x XOR y)` bit = 1

     * This keeps equality with `k` at this bit.
     * `y` bit = `1 - bitX`
     * Set `cur = cur.child[1 - bitX]` to continue.

4. If `bitK == 0`:

   * We are not allowed to have XOR bit 1 here (would exceed `k`).
   * So XOR bit must be 0 → `y` bit = `bitX`.
   * Move `cur = cur.child[bitX]` and continue.

5. After loop ends, `res` is the count of valid `y` for this `x`.

### 4. Main cntPairs Function

For all languages:

```text
if k == 0:
    return 0

root = new Node()
ans = 0

for x in arr:
    ans += countLess(root, x, k)
    insert(root, x)

return ans
```

* `countLess` always uses **only previous numbers** since we insert after counting.
* This is equivalent to counting all pairs `(j, i)` with `j < i`.

---

## Examples

### Example 1

**Input**

```text
arr = [1, 2, 3, 5]
k = 5
```

Valid pairs (i < j):

1. `(1, 2)` → `1 ^ 2 = 3 < 5` ✔
2. `(1, 3)` → `1 ^ 3 = 2 < 5` ✔
3. `(1, 5)` → `1 ^ 5 = 4 < 5` ✔
4. `(2, 3)` → `2 ^ 3 = 1 < 5` ✔
5. `(2, 5)` → `2 ^ 5 = 7 ≥ 5` ✘
6. `(3, 5)` → `3 ^ 5 = 6 ≥ 5` ✘

So total valid pairs = **4**

**Output**

```text
4
```

### Example 2

**Input**

```text
arr = [3, 5, 6, 8]
k = 7
```

Check pairs:

1. `(3, 5)` → `3 ^ 5 = 6 < 7` ✔
2. `(3, 6)` → `3 ^ 6 = 5 < 7` ✔
3. `(3, 8)` → `3 ^ 8 = 11 ≥ 7` ✘
4. `(5, 6)` → `5 ^ 6 = 3 < 7` ✔
5. `(5, 8)` → `5 ^ 8 = 13 ≥ 7` ✘
6. `(6, 8)` → `6 ^ 8 = 14 ≥ 7` ✘

Total valid pairs = **3**

**Output**

```text
3
```

---

## How to use / Run locally

### C++

1. Save the solution as `solution.cpp`.
2. Include main driver or use GeeksforGeeks template.
3. Compile and run:

```bash
g++ -std=c++17 solution.cpp -o solution
./solution
```

### Java

1. Save as `Solution.java`.
2. Make sure the class name matches (`Solution`).
3. Compile and run:

```bash
javac Solution.java
java Solution
```

### JavaScript (Node.js)

1. Save as `solution.js`.
2. Import / call as needed, for example:

```javascript
const sol = new Solution();
console.log(sol.cntPairs([1,2,3,5], 5));
```

3. Run:

```bash
node solution.js
```

### Python3

1. Save as `solution.py`.
2. Add simple driver code at the bottom:

```python
if __name__ == "__main__":
    sol = Solution()
    print(sol.cntPairs([1, 2, 3, 5], 5))
```

3. Run:

```bash
python3 solution.py
```

---

## Notes & Optimizations

* I fixed `MAX_BIT = 15` because:

  * Max value ≤ `5 * 10^4 < 2^16`,
  * So bits 0..15 are enough to fully represent all numbers and `k`.
* I used `long long` / `long` / large integer type for the count:

  * Worst case pair count = `n * (n-1) / 2`
  * For `n = 50,000`, this fits inside 64-bit.
* Space can be a bit large (trie nodes), but still fine for constraints.
* If constraints were even bigger, we could consider:

  * Reusing nodes more cleverly
  * Or compressing trie, but here not needed.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)

Feel free to fork, star ⭐, or suggest improvements via PRs!

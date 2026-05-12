# Range LCM Queries

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
* [How to Use / Run Locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

## Problem Summary

This problem is about handling two types of queries on an array:

1. Update Query
   Update the value at a specific index.

2. Range Query
   Find the Least Common Multiple (LCM) of all elements between index `L` and `R`.

The tricky part is that both operations happen many times.
If I calculate the LCM for every query by looping through the range again and again, the solution becomes too slow for large inputs.

So the main goal is to build an efficient data structure that can:

* update values quickly
* answer range LCM queries quickly

This is a classic competitive programming problem based on:

* Segment Tree
* Range Queries
* LCM and GCD
* Efficient Query Processing

## Constraints

| Constraint                  | Value              |
| --------------------------- | ------------------ |
| `1 ≤ arr.size() ≤ 10^4`     | Array size         |
| `1 ≤ queries.size() ≤ 10^5` | Number of queries  |
| `0 ≤ L ≤ R < arr.size()`    | Valid range        |
| `0 ≤ index < arr.size()`    | Valid update index |
| `1 ≤ arr[i], value ≤ 10^4`  | Array values       |

## Intuition

My first thought was simple:

For every range query, I could loop from `L` to `R` and keep calculating the LCM one by one.

That works for small inputs.

But after looking at the constraints, I realized it would become very slow because there can be up to `100000` queries.

Then I noticed this pattern:

* range query
* point update
* large constraints

Whenever these three things appear together, Segment Tree is usually the best fit.

A Segment Tree helps store information about ranges efficiently.
In this problem, each node stores the LCM of a segment.

That means:

* updates become fast
* range LCM queries also become fast

This reduces the overall complexity from something too large into an optimized logarithmic solution.

## Approach

I solved this problem using a Segment Tree.

Here is the full idea step by step:

1. Build a Segment Tree from the given array.
2. Each node stores the LCM of its range.
3. For an update query:

   * move to the required index
   * replace the value
   * recalculate LCM values while returning upward
4. For a range query:

   * collect answers from only the required segments
   * merge them using LCM

To calculate LCM safely and efficiently, I used GCD:

`LCM(a, b) = (a / GCD(a, b)) * b`

This avoids unnecessary overflow problems.

The final solution works efficiently even for very large numbers of queries.

## Data Structures Used

| Data Structure | Purpose                                    |
| -------------- | ------------------------------------------ |
| Array          | Stores the original input values           |
| Segment Tree   | Handles fast range LCM queries and updates |
| Vector / List  | Stores answers of type 2 queries           |

## Operations & Behavior Summary

### Building the Tree

* Divide the array into smaller parts recursively
* Leaf nodes store single array elements
* Internal nodes store LCM of child nodes

### Update Operation

* Find the target index
* Replace the old value
* Recalculate parent node values using LCM

### Range Query Operation

* Ignore segments outside the range
* Use stored values for fully overlapping segments
* Split partially overlapping segments further
* Merge answers using LCM

### Result Storage

* Store answers for all type 2 queries
* Return the final list at the end

## Complexity

| Operation          | Time Complexity | Explanation                          |
| ------------------ | --------------- | ------------------------------------ |
| Build Segment Tree | `O(n)`          | Each node is processed once          |
| Update Query       | `O(log n)`      | Only one path in the tree is updated |
| Range Query        | `O(log n)`      | Only relevant segments are visited   |

| Space Complexity   | Value   | Explanation                            |
| ------------------ | ------- | -------------------------------------- |
| Segment Tree Space | `O(4n)` | Extra memory used for storing the tree |

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    
    // Segment tree to store LCM values
    vector<long long> seg;

    // Function to calculate GCD
    long long gcd(long long a, long long b) {
        while (b) {
            long long temp = a % b;
            a = b;
            b = temp;
        }
        return a;
    }

    // Function to calculate LCM safely
    long long lcm(long long a, long long b) {
        return (a / gcd(a, b)) * b;
    }

    // Build segment tree
    void build(int idx, int low, int high, vector<int>& arr) {
        
        // Leaf node stores array value
        if (low == high) {
            seg[idx] = arr[low];
            return;
        }

        int mid = (low + high) / 2;

        // Build left subtree
        build(2 * idx + 1, low, mid, arr);

        // Build right subtree
        build(2 * idx + 2, mid + 1, high, arr);

        // Store LCM of both children
        seg[idx] = lcm(seg[2 * idx + 1], seg[2 * idx + 2]);
    }

    // Update one index
    void update(int idx, int low, int high, int pos, int val) {

        // Reached target index
        if (low == high) {
            seg[idx] = val;
            return;
        }

        int mid = (low + high) / 2;

        // Go to left side
        if (pos <= mid)
            update(2 * idx + 1, low, mid, pos, val);

        // Go to right side
        else
            update(2 * idx + 2, mid + 1, high, pos, val);

        // Recalculate current node
        seg[idx] = lcm(seg[2 * idx + 1], seg[2 * idx + 2]);
    }

    // Query LCM in range
    long long query(int idx, int low, int high, int l, int r) {

        // Completely outside range
        if (high < l || low > r)
            return 1;

        // Completely inside range
        if (low >= l && high <= r)
            return seg[idx];

        int mid = (low + high) / 2;

        // Query left part
        long long left = query(2 * idx + 1, low, mid, l, r);

        // Query right part
        long long right = query(2 * idx + 2, mid + 1, high, l, r);

        // Merge both answers using LCM
        return lcm(left, right);
    }

    vector<long long> RangeLCMQuery(vector<int> &arr, vector<vector<int>> &queries) {
        
        int n = arr.size();

        // Allocate segment tree space
        seg.resize(4 * n);

        // Build tree initially
        build(0, 0, n - 1, arr);

        vector<long long> ans;

        // Process all queries
        for (auto &q : queries) {

            // Update query
            if (q[0] == 1) {
                update(0, 0, n - 1, q[1], q[2]);
            }

            // Range query
            else {
                ans.push_back(query(0, 0, n - 1, q[1], q[2]));
            }
        }

        return ans;
    }
};
```

### Java

```java
class Solution {

    // Segment tree array
    long[] seg;

    // Function to calculate GCD
    long gcd(long a, long b) {
        while (b != 0) {
            long temp = a % b;
            a = b;
            b = temp;
        }
        return a;
    }

    // Function to calculate LCM
    long lcm(long a, long b) {
        return (a / gcd(a, b)) * b;
    }

    // Build segment tree
    void build(int idx, int low, int high, int[] arr) {

        // Leaf node
        if (low == high) {
            seg[idx] = arr[low];
            return;
        }

        int mid = (low + high) / 2;

        build(2 * idx + 1, low, mid, arr);
        build(2 * idx + 2, mid + 1, high, arr);

        // Store LCM
        seg[idx] = lcm(seg[2 * idx + 1], seg[2 * idx + 2]);
    }

    // Update function
    void update(int idx, int low, int high, int pos, int val) {

        if (low == high) {
            seg[idx] = val;
            return;
        }

        int mid = (low + high) / 2;

        if (pos <= mid)
            update(2 * idx + 1, low, mid, pos, val);
        else
            update(2 * idx + 2, mid + 1, high, pos, val);

        // Recalculate node
        seg[idx] = lcm(seg[2 * idx + 1], seg[2 * idx + 2]);
    }

    // Range query
    long query(int idx, int low, int high, int l, int r) {

        // Outside range
        if (high < l || low > r)
            return 1;

        // Inside range
        if (low >= l && high <= r)
            return seg[idx];

        int mid = (low + high) / 2;

        long left = query(2 * idx + 1, low, mid, l, r);
        long right = query(2 * idx + 2, mid + 1, high, l, r);

        return lcm(left, right);
    }

    public ArrayList<Long> RangeLCMQuery(int[] arr, int[][] queries) {

        int n = arr.length;

        seg = new long[4 * n];

        // Build tree
        build(0, 0, n - 1, arr);

        ArrayList<Long> ans = new ArrayList<>();

        // Process queries
        for (int[] q : queries) {

            // Update query
            if (q[0] == 1) {
                update(0, 0, n - 1, q[1], q[2]);
            }

            // Range query
            else {
                ans.add(query(0, 0, n - 1, q[1], q[2]));
            }
        }

        return ans;
    }
}
```

### JavaScript

```javascript
/**
 * @param {number[]} arr
 * @param {number[][]} queries
 * @return {number []}
 */

class Solution {

    // Function to calculate GCD
    gcd(a, b) {
        while (b !== 0) {
            let temp = a % b;
            a = b;
            b = temp;
        }
        return a;
    }

    // Function to calculate LCM
    lcm(a, b) {
        return (a / this.gcd(a, b)) * b;
    }

    // Build segment tree
    build(idx, low, high, arr) {

        // Leaf node
        if (low === high) {
            this.seg[idx] = arr[low];
            return;
        }

        let mid = Math.floor((low + high) / 2);

        this.build(2 * idx + 1, low, mid, arr);
        this.build(2 * idx + 2, mid + 1, high, arr);

        // Store LCM
        this.seg[idx] = this.lcm(
            this.seg[2 * idx + 1],
            this.seg[2 * idx + 2]
        );
    }

    // Update function
    update(idx, low, high, pos, val) {

        if (low === high) {
            this.seg[idx] = val;
            return;
        }

        let mid = Math.floor((low + high) / 2);

        if (pos <= mid)
            this.update(2 * idx + 1, low, mid, pos, val);
        else
            this.update(2 * idx + 2, mid + 1, high, pos, val);

        // Recalculate node
        this.seg[idx] = this.lcm(
            this.seg[2 * idx + 1],
            this.seg[2 * idx + 2]
        );
    }

    // Query function
    query(idx, low, high, l, r) {

        // Outside range
        if (high < l || low > r)
            return 1;

        // Completely inside
        if (low >= l && high <= r)
            return this.seg[idx];

        let mid = Math.floor((low + high) / 2);

        let left = this.query(2 * idx + 1, low, mid, l, r);
        let right = this.query(2 * idx + 2, mid + 1, high, l, r);

        return this.lcm(left, right);
    }

    RangeLCMQuery(arr, queries) {

        let n = arr.length;

        // Create segment tree
        this.seg = new Array(4 * n).fill(1);

        // Build tree
        this.build(0, 0, n - 1, arr);

        let ans = [];

        // Process queries
        for (let q of queries) {

            // Update query
            if (q[0] === 1) {
                this.update(0, 0, n - 1, q[1], q[2]);
            }

            // Range query
            else {
                ans.push(
                    this.query(0, 0, n - 1, q[1], q[2])
                );
            }
        }

        return ans;
    }
}
```

### Python3

```python
class Solution:
    
    # Function to calculate GCD
    def gcd(self, a, b):
        while b:
            a, b = b, a % b
        return a

    # Function to calculate LCM
    def lcm(self, a, b):
        return (a // self.gcd(a, b)) * b

    # Build segment tree
    def build(self, idx, low, high, arr):

        # Leaf node
        if low == high:
            self.seg[idx] = arr[low]
            return

        mid = (low + high) // 2

        # Build left subtree
        self.build(2 * idx + 1, low, mid, arr)

        # Build right subtree
        self.build(2 * idx + 2, mid + 1, high, arr)

        # Store LCM
        self.seg[idx] = self.lcm(
            self.seg[2 * idx + 1],
            self.seg[2 * idx + 2]
        )

    # Update one index
    def update(self, idx, low, high, pos, val):

        if low == high:
            self.seg[idx] = val
            return

        mid = (low + high) // 2

        if pos <= mid:
            self.update(2 * idx + 1, low, mid, pos, val)
        else:
            self.update(2 * idx + 2, mid + 1, high, pos, val)

        # Recalculate current node
        self.seg[idx] = self.lcm(
            self.seg[2 * idx + 1],
            self.seg[2 * idx + 2]
        )

    # Range query
    def query(self, idx, low, high, l, r):

        # Outside range
        if high < l or low > r:
            return 1

        # Completely inside
        if low >= l and high <= r:
            return self.seg[idx]

        mid = (low + high) // 2

        left = self.query(2 * idx + 1, low, mid, l, r)
        right = self.query(2 * idx + 2, mid + 1, high, l, r)

        return self.lcm(left, right)

    def RangeLCMQuery(self, arr, queries):

        n = len(arr)

        # Segment tree array
        self.seg = [1] * (4 * n)

        # Build tree
        self.build(0, 0, n - 1, arr)

        ans = []

        # Process queries
        for q in queries:

            # Update query
            if q[0] == 1:
                self.update(0, 0, n - 1, q[1], q[2])

            # Range query
            else:
                ans.append(
                    self.query(0, 0, n - 1, q[1], q[2])
                )

        return ans
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains almost identical across all four languages.

The only differences are syntax and built-in utilities.

### Step 1 — Create the Segment Tree

The segment tree is the heart of the solution.

Each node stores:

* the LCM of a specific range
* information needed to answer future queries quickly

Instead of recalculating ranges repeatedly, the tree stores precomputed results.

This is what makes the solution fast.

---

### Step 2 — Build the Tree

The build process works recursively.

If a node represents:

* a single element → store that value directly
* multiple elements → split into two halves

Then:

* build left subtree
* build right subtree
* merge both using LCM

This preprocessing step prepares the structure for fast queries later.

---

### Step 3 — GCD and LCM Calculation

LCM calculation depends on GCD.

Using:

`LCM(a, b) = (a / GCD(a, b)) * b`

is safer than:

`(a * b) / GCD(a, b)`

because multiplying first may overflow faster.

This is an important implementation detail in competitive programming problems involving LCM.

---

### Step 4 — Update Query

For queries like:

`[1, index, value]`

the algorithm:

1. moves toward the target index
2. updates the value
3. recalculates all affected parent nodes

Only one path in the tree changes.

That is why the complexity stays `O(log n)`.

---

### Step 5 — Range LCM Query

For queries like:

`[2, L, R]`

the algorithm checks three cases:

#### Completely Outside

Ignore that segment completely.

#### Completely Inside

Return the stored node value directly.

#### Partial Overlap

Split further into children and merge results.

This selective traversal is the reason Segment Trees are so efficient.

---

### Step 6 — Store Final Answers

Every time a type 2 query is processed:

* append the answer into the result list

At the end:

* return all collected answers

---

### Language-specific Notes

#### C++

* Uses vectors for dynamic storage
* Very fast execution speed
* Common choice for competitive programming

#### Java

* Uses arrays and `ArrayList<Long>`
* Slightly more verbose syntax
* Good for structured implementations

#### JavaScript

* Uses arrays for everything
* Easier syntax for beginners
* Recursion logic remains the same

#### Python3

* Very clean and short implementation
* Easy recursion handling
* Slower than C++ but still works within constraints

## Examples

### Example 1

### Input

```text
arr = [2, 3, 4, 6, 8, 16]

queries = [
  [2, 0, 2],
  [1, 3, 8],
  [2, 2, 5]
]
```

### Output

```text
[12, 16]
```

### Explanation

* Query `[2, 0, 2]`

  * LCM of `[2, 3, 4]` = `12`

* Query `[1, 3, 8]`

  * Update index `3` from `6` to `8`

* Query `[2, 2, 5]`

  * LCM of `[4, 8, 8, 16]` = `16`

---

### Example 2

### Input

```text
arr = [1, 2, 3, 4]

queries = [
  [2, 0, 3],
  [1, 0, 5],
  [2, 0, 1]
]
```

### Output

```text
[12, 10]
```

### Explanation

* LCM of `[1, 2, 3, 4]` = `12`
* Update index `0` to `5`
* LCM of `[5, 2]` = `10`

---

### Example 3

### Input

```text
arr = [5, 10, 15]

queries = [
  [2, 0, 2],
  [1, 1, 20],
  [2, 0, 2]
]
```

### Output

```text
[30, 60]
```

### Explanation

* Initial LCM of `[5, 10, 15]` = `30`
* Update `10` to `20`
* New LCM becomes `60`

## How to Use / Run Locally

### C++

Compile:

```bash
g++ filename.cpp -o output
```

Run:

```bash
./output
```

---

### Java

Compile:

```bash
javac Main.java
```

Run:

```bash
java Main
```

---

### JavaScript

Run using Node.js:

```bash
node filename.js
```

---

### Python3

Run:

```bash
python3 filename.py
```

## Notes & Optimizations

* Segment Tree is much faster than brute force for large query counts.
* Returning `1` for non-overlapping segments is important because:

  * `LCM(x, 1) = x`
* Using GCD inside LCM calculation avoids unnecessary overflow.
* Recursive Segment Tree implementation is easier to understand for beginners.
* An iterative Segment Tree can also be used for slightly better performance.
* Brute force would become too slow for `10^5` queries.
* This problem is commonly asked in:

  * DSA interviews
  * Competitive programming contests
  * Segment Tree practice sets

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)

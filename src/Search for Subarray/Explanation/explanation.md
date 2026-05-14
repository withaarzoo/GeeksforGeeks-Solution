# Search for Subarray

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

---

## Problem Summary

In this DSA pattern searching problem, we are given two integer arrays:

* `a[]` → the main array
* `b[]` → the subarray pattern

The task is to find all starting indexes where `b[]` appears as a continuous subarray inside `a[]`.

If the pattern appears multiple times, we must return all valid starting positions.

This problem is very similar to classic string pattern matching problems like KMP Algorithm, but instead of characters, we work with integers.

The main challenge is solving it efficiently for very large input sizes.

Relevant SEO keywords naturally connected to this problem:

* Search for Subarray GFG solution
* KMP algorithm for arrays
* Pattern searching in arrays
* Efficient subarray search
* Competitive programming array matching
* DSA pattern matching problem
* GeeksforGeeks Search for Subarray explanation

---

## Constraints

| Constraint                | Value              |
| ------------------------- | ------------------ |
| `1 ≤ a.size() ≤ 10^6`     | Large array size   |
| `1 ≤ b.size() ≤ a.size()` | Pattern size valid |
| `0 ≤ a[i], b[i] ≤ 10^4`   | Integer elements   |

Because the constraints are large, a brute force solution may become too slow.

---

## Intuition

My first thought was simple:

Try every possible starting index in `a[]` and compare elements one by one with `b[]`.

That works, but it wastes a lot of comparisons.

I noticed this problem behaves exactly like pattern searching in strings.

So instead of checking the same values repeatedly, I can use the KMP Algorithm (Knuth-Morris-Pratt Algorithm).

The biggest advantage of KMP is that it remembers previous matches using the LPS array, which helps avoid unnecessary re-checking.

That makes the solution fast enough even for arrays of size `10^6`.

---

## Approach

I solve this problem in two major steps.

### Step 1: Build the LPS Array

The LPS array stores:

> Longest Proper Prefix which is also Suffix

This helps us know how many elements are already matched when a mismatch happens.

Instead of restarting from the beginning, we jump smartly using previously computed information.

---

### Step 2: Run KMP Search

Now I compare:

* elements from `a[]`
* elements from `b[]`

using two pointers.

Cases:

1. If elements match

   * move both pointers

2. If the whole pattern matches

   * store the starting index
   * continue searching for more matches

3. If mismatch happens

   * use LPS to avoid restarting unnecessarily

This keeps the algorithm linear.

---

## Data Structures Used

| Data Structure        | Purpose                                               |
| --------------------- | ----------------------------------------------------- |
| Array / Vector / List | Store the final matching indexes                      |
| LPS Array             | Stores prefix-suffix information for KMP optimization |
| Integer Variables     | Used as pointers while traversing arrays              |

The solution does not need any heavy extra data structures.

---

## Operations & Behavior Summary

Here is the overall behavior of the algorithm in plain English:

1. Read both arrays
2. Build the LPS array for `b[]`
3. Start traversing `a[]`
4. Compare current elements
5. If they match:

   * continue forward
6. If mismatch happens:

   * jump using LPS
7. If the full pattern matches:

   * save the starting index
8. Continue until the full array is processed
9. Return all matching indexes

This avoids repeated comparisons and keeps the solution efficient.

---

## Complexity

| Type             | Complexity | Explanation                                                                       |
| ---------------- | ---------- | --------------------------------------------------------------------------------- |
| Time Complexity  | `O(n + m)` | `n` is size of `a[]`, `m` is size of `b[]`. Both arrays are processed almost once |
| Space Complexity | `O(m)`     | Extra space is used only for the LPS array                                        |

This is the optimal solution for this problem.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    
    // Function to build LPS array
    vector<int> buildLPS(vector<int>& b) {
        
        int m = b.size();
        
        // LPS array
        vector<int> lps(m, 0);

        // Length of previous longest prefix suffix
        int len = 0;

        // Start from index 1 because lps[0] is always 0
        int i = 1;

        while (i < m) {
            
            // If current elements match
            if (b[i] == b[len]) {
                
                // Increase prefix length
                len++;
                
                // Store it in lps
                lps[i] = len;
                
                i++;
            }
            else {
                
                // Try smaller prefix
                if (len != 0) {
                    len = lps[len - 1];
                }
                else {
                    
                    // No prefix possible
                    lps[i] = 0;
                    
                    i++;
                }
            }
        }

        return lps;
    }

    vector<int> search(vector<int> &a, vector<int> &b) {
        
        int n = a.size();
        int m = b.size();

        // Build LPS array for pattern
        vector<int> lps = buildLPS(b);

        // Store answer
        vector<int> ans;

        // Pointer for a[]
        int i = 0;

        // Pointer for b[]
        int j = 0;

        while (i < n) {
            
            // If elements match
            if (a[i] == b[j]) {
                i++;
                j++;
            }

            // Full pattern matched
            if (j == m) {
                
                // Store starting index
                ans.push_back(i - m);

                // Continue searching
                j = lps[j - 1];
            }
            
            // Mismatch happens
            else if (i < n && a[i] != b[j]) {
                
                // Move j using lps
                if (j != 0) {
                    j = lps[j - 1];
                }
                else {
                    
                    // Move i if no prefix available
                    i++;
                }
            }
        }

        return ans;
    }
};
```

### Java

```java
class Solution {
    
    // Function to build LPS array
    private int[] buildLPS(int[] b) {
        
        int m = b.length;

        // LPS array
        int[] lps = new int[m];

        // Length of previous longest prefix suffix
        int len = 0;

        int i = 1;

        while (i < m) {
            
            // Matching elements
            if (b[i] == b[len]) {
                
                len++;
                
                lps[i] = len;
                
                i++;
            }
            else {
                
                // Try smaller prefix
                if (len != 0) {
                    len = lps[len - 1];
                }
                else {
                    
                    lps[i] = 0;
                    
                    i++;
                }
            }
        }

        return lps;
    }

    public ArrayList<Integer> search(int[] a, int[] b) {
        
        int n = a.length;
        int m = b.length;

        // Build LPS array
        int[] lps = buildLPS(b);

        // Store result
        ArrayList<Integer> ans = new ArrayList<>();

        int i = 0;
        int j = 0;

        while (i < n) {
            
            // Elements match
            if (a[i] == b[j]) {
                i++;
                j++;
            }

            // Full pattern matched
            if (j == m) {
                
                ans.add(i - m);

                // Continue searching
                j = lps[j - 1];
            }
            
            // Mismatch
            else if (i < n && a[i] != b[j]) {
                
                if (j != 0) {
                    j = lps[j - 1];
                }
                else {
                    i++;
                }
            }
        }

        return ans;
    }
}
```

### JavaScript

```javascript
/**
 * @param {number[]} a
 * @param {number[]} b
 * @returns {number[]}
 */

class Solution {
    
    // Function to build LPS array
    buildLPS(b) {
        
        const m = b.length;

        // Create LPS array filled with 0
        const lps = new Array(m).fill(0);

        // Length of previous longest prefix suffix
        let len = 0;

        let i = 1;

        while (i < m) {
            
            // Matching elements
            if (b[i] === b[len]) {
                
                len++;

                lps[i] = len;

                i++;
            }
            else {
                
                // Try smaller prefix
                if (len !== 0) {
                    len = lps[len - 1];
                }
                else {
                    
                    lps[i] = 0;

                    i++;
                }
            }
        }

        return lps;
    }

    search(a, b) {
        
        const n = a.length;
        const m = b.length;

        // Build LPS array
        const lps = this.buildLPS(b);

        // Store answer
        const ans = [];

        let i = 0;
        let j = 0;

        while (i < n) {
            
            // Elements match
            if (a[i] === b[j]) {
                i++;
                j++;
            }

            // Full pattern matched
            if (j === m) {
                
                ans.push(i - m);

                // Continue searching
                j = lps[j - 1];
            }
            
            // Mismatch
            else if (i < n && a[i] !== b[j]) {
                
                if (j !== 0) {
                    j = lps[j - 1];
                }
                else {
                    i++;
                }
            }
        }

        return ans;
    }
}
```

### Python3

```python
class Solution:
    
    # Function to build LPS array
    def buildLPS(self, b):
        
        m = len(b)

        # Create LPS array
        lps = [0] * m

        # Length of previous longest prefix suffix
        length = 0

        i = 1

        while i < m:
            
            # Matching elements
            if b[i] == b[length]:
                
                length += 1

                lps[i] = length

                i += 1
            else:
                
                # Try smaller prefix
                if length != 0:
                    length = lps[length - 1]
                else:
                    
                    lps[i] = 0

                    i += 1

        return lps

    def search(self, a, b):
        
        n = len(a)
        m = len(b)

        # Build LPS array
        lps = self.buildLPS(b)

        # Store answer
        ans = []

        i = 0
        j = 0

        while i < n:
            
            # Elements match
            if a[i] == b[j]:
                i += 1
                j += 1

            # Full pattern matched
            if j == m:
                
                ans.append(i - m)

                # Continue searching
                j = lps[j - 1]

            # Mismatch
            elif i < n and a[i] != b[j]:
                
                if j != 0:
                    j = lps[j - 1]
                else:
                    i += 1

        return ans
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains the same in all languages.

Only syntax changes.

### Building the LPS Array

The first important step is preprocessing the pattern array.

For every index in `b[]`, we calculate:

* longest matching prefix
* that is also a suffix

This information becomes useful during mismatches.

Without LPS, we would repeat many unnecessary comparisons.

---

### Why LPS Matters

Suppose we already matched several elements and suddenly hit a mismatch.

A brute force approach would restart from the beginning.

KMP avoids that.

It uses previous matching information to continue from the best possible position.

That is the main optimization.

---

### Two Pointer Traversal

We use:

* one pointer for `a[]`
* one pointer for `b[]`

If values match:

* both move forward

If mismatch happens:

* use LPS to decide the next valid position

This prevents rechecking elements unnecessarily.

---

### Detecting Full Match

Whenever the pattern pointer reaches the end:

* it means the full subarray is matched
* we store the starting index

Then we continue searching because multiple matches may exist.

---

### Overlapping Matches

One important thing about KMP:

It naturally handles overlapping matches.

Example:

```text
a = [1,1,1,1]
b = [1,1]
```

Output:

```text
[0,1,2]
```

Because after one match, we do not completely reset the pattern pointer.

This is where LPS becomes very useful again.

---

### Language-specific Notes

#### C++

Usually implemented using:

* `vector<int>`
* helper function for LPS

Very fast and memory efficient.

---

#### Java

Uses:

* `ArrayList<Integer>`
* integer arrays

Good for competitive programming and online judges.

---

#### JavaScript

Uses:

* dynamic arrays
* flexible indexing

Easy to understand for beginners.

---

#### Python3

Most compact implementation.

Python lists make handling arrays simple and readable.

---

## Examples

### Example 1

Input

```text
a = [2, 4, 1, 0, 4, 1]
b = [4, 1]
```

Output

```text
[1, 4]
```

Explanation

* `b[]` appears starting at index `1`
* again appears at index `4`

---

### Example 2

Input

```text
a = [2, 4, 1, 0, 0, 3]
b = [0]
```

Output

```text
[3, 4]
```

Explanation

The element `0` appears at:

* index `3`
* index `4`

---

### Example 3

Input

```text
a = [1, 3, 5, 3, 0]
b = [1, 3, 0]
```

Output

```text
[]
```

Explanation

No valid continuous subarray matches the pattern.

---

## How to Use / Run Locally

### C++

Compile

```bash
g++ filename.cpp -o output
```

Run

```bash
./output
```

---

### Java

Compile

```bash
javac Main.java
```

Run

```bash
java Main
```

---

### JavaScript

Run using Node.js

```bash
node filename.js
```

---

### Python3

Run

```bash
python filename.py
```

or

```bash
python3 filename.py
```

---

## Notes & Optimizations

* A brute force solution may take `O(n * m)` time in the worst case
* KMP reduces this to linear time
* The algorithm works well even for very large arrays
* Overlapping matches are handled automatically
* LPS preprocessing is the key optimization
* This problem is a direct application of pattern searching algorithms in arrays instead of strings

Alternative approaches:

* Rabin-Karp Algorithm
* Z Algorithm
* Rolling Hash

But KMP is usually the safest and most efficient choice here.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)

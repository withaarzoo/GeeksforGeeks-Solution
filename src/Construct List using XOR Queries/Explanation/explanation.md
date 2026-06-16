# Construct List using XOR Queries | GeeksforGeeks Solution

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

The **Construct List using XOR Queries** problem asks us to build a final sorted array after processing a sequence of queries.

Initially, the array contains only one element:

```text
[0]
```

There are two types of queries:

1. `0 x` → Insert `x` into the array.
2. `1 x` → Replace every element `a` in the array with `a XOR x`.

After all queries are processed, we need to return the final array in sorted order.

A direct simulation looks simple at first, but it becomes inefficient because every XOR query modifies the entire array. Since the number of queries can be large, we need a smarter approach that avoids repeatedly updating all elements.

This problem is a classic example of using **reverse traversal**, **bit manipulation**, and **cumulative XOR** to achieve an efficient solution.

## Constraints

| Constraint              | Value       |
| ----------------------- | ----------- |
| Number of queries (`q`) | 1 ≤ q ≤ 10⁵ |
| Value of `x`            | 0 ≤ x ≤ 10⁹ |

## Intuition

My first thought was to simulate every operation exactly as described.

That works for small inputs, but every type `1` query updates the entire array. If there are many XOR operations, the solution quickly becomes too slow.

Then I noticed an important observation:

When a value is inserted, it only gets affected by XOR operations that happen **after** its insertion.

That means I do not actually need to apply XOR updates immediately.

Instead, I can process the queries from right to left and maintain a running XOR value representing all future XOR operations.

This transforms an expensive array-update problem into a simple cumulative XOR problem.

## Approach

1. Start from the last query and move towards the first query.
2. Maintain a variable called `xr`.
3. `xr` stores the XOR of all type `1` queries encountered so far while moving backwards.
4. For a query `[1, x]`:

   * Update `xr = xr XOR x`.
5. For a query `[0, x]`:

   * The final value of this inserted element will be `x XOR xr`.
   * Store that value.
6. After processing all queries:

   * The initial element `0` is also affected by all XOR operations.
   * Its final value becomes `xr`.
7. Add it to the answer.
8. Sort the resulting values.
9. Return the sorted array.

## Data Structures Used

### Dynamic Array / Vector / ArrayList / List

Used to store all final values before sorting.

Why it is needed:

* Fast insertion of computed values.
* Easy sorting at the end.
* Stores exactly the elements required for the final answer.

### Integer Variable

A single integer variable `xr` is used to maintain cumulative XOR information.

Why it is needed:

* Tracks all future XOR operations efficiently.
* Eliminates the need to update every element repeatedly.

## Operations & Behavior Summary

The algorithm performs the following actions:

1. Traverse queries in reverse order.
2. Keep track of cumulative XOR using `xr`.
3. Whenever a XOR query appears:

   * Merge its effect into `xr`.
4. Whenever an insertion query appears:

   * Calculate the final value immediately using `x XOR xr`.
5. Store all resulting values.
6. Add the transformed initial element.
7. Sort the collected values.
8. Return the sorted list.

This avoids modifying the entire array after every XOR query.

## Complexity

| Operation                  | Complexity |
| -------------------------- | ---------- |
| Reverse Traversal          | O(q)       |
| Sorting Result             | O(q log q) |
| Total Time Complexity      | O(q log q) |
| Auxiliary Space Complexity | O(1)       |

### Time Complexity

**O(q log q)**

Where:

* `q` = number of queries

The reverse traversal takes linear time, while sorting dominates the overall complexity.

### Space Complexity

**O(1) Auxiliary Space**

No extra data structure proportional to the input size is used apart from the output container itself.

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    vector<int> constructList(vector<vector<int>> &queries) {
        
        // Stores XOR of all future type-1 queries
        int xr = 0;
        
        // Resulting values before sorting
        vector<int> ans;
        
        // Process queries from right to left
        for(int i = (int)queries.size() - 1; i >= 0; i--) {
            
            // Type 1 query: update cumulative XOR
            if(queries[i][0] == 1) {
                xr ^= queries[i][1];
            }
            else {
                // Inserted value gets affected by all future XORs
                ans.push_back(queries[i][1] ^ xr);
            }
        }
        
        // Initial element 0 becomes 0 ^ xr
        ans.push_back(xr);
        
        // Required output is sorted
        sort(ans.begin(), ans.end());
        
        return ans;
    }
};
```

### Java

```java
class Solution {
    public ArrayList<Integer> constructList(int[][] queries) {
        
        // Stores XOR of all future type-1 queries
        int xr = 0;
        
        // Stores final values
        ArrayList<Integer> ans = new ArrayList<>();
        
        // Traverse from right to left
        for(int i = queries.length - 1; i >= 0; i--) {
            
            // XOR query
            if(queries[i][0] == 1) {
                xr ^= queries[i][1];
            }
            else {
                // Final value of inserted element
                ans.add(queries[i][1] ^ xr);
            }
        }
        
        // Initial 0 after all XOR operations
        ans.add(xr);
        
        // Sort as required
        Collections.sort(ans);
        
        return ans;
    }
}
```

### JavaScript

```javascript
/**
 * @param {number[][]} queries
 * @return {number[]}
 */
class Solution {
    constructList(queries) {
        
        // XOR of all future type-1 operations
        let xr = 0;
        
        // Stores final values
        let ans = [];
        
        // Traverse from right to left
        for(let i = queries.length - 1; i >= 0; i--) {
            
            // XOR query
            if(queries[i][0] === 1) {
                xr ^= queries[i][1];
            } 
            else {
                // Inserted element after future XORs
                ans.push(queries[i][1] ^ xr);
            }
        }
        
        // Initial value 0 transformed by all XORs
        ans.push(xr);
        
        // Sort numerically
        ans.sort((a, b) => a - b);
        
        return ans;
    }
}
```

### Python3

```python
class Solution:
    def constructList(self, queries):
        
        # XOR of all future type-1 queries
        xr = 0
        
        # Stores final values
        ans = []
        
        # Traverse queries from right to left
        for typ, x in reversed(queries):
            
            # XOR operation
            if typ == 1:
                xr ^= x
            else:
                # Final value of inserted element
                ans.append(x ^ xr)
        
        # Initial element 0 after all XOR operations
        ans.append(xr)
        
        # Return sorted array
        ans.sort()
        
        return ans
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains exactly the same across all language implementations.

### Step 1: Initialize the cumulative XOR

We start with:

```text
xr = 0
```

This variable represents the combined effect of all XOR operations that lie to the right of the current query.

Initially, no future XOR operations have been seen.

---

### Step 2: Traverse queries from right to left

Instead of processing queries in normal order, we move backwards.

This is the key idea of the solution.

When moving backwards, every XOR query encountered represents an operation that affects all earlier inserted values.

---

### Step 3: Handle XOR queries

Whenever a query of type `1` is found:

```text
[1, x]
```

we update:

```text
xr = xr XOR x
```

This accumulates the effect of all future XOR operations into one variable.

We never update stored elements individually.

---

### Step 4: Handle insertion queries

Whenever a query of type `0` is found:

```text
[0, x]
```

the final value of that inserted number is:

```text
x XOR xr
```

because `xr` already contains the effect of every XOR operation that happens after this insertion.

We immediately store this final value.

---

### Step 5: Process the initial value

The array originally contains:

```text
[0]
```

This value exists before every query.

Therefore, every XOR query affects it.

At the end of reverse traversal:

```text
0 XOR xr = xr
```

So we add `xr` to the answer list.

---

### Step 6: Sort the answer

The problem requires the final array in sorted order.

After collecting all values:

```text
sort(answer)
```

Sorting ensures the output matches the required format.

---

### Why Reverse Traversal Works

Suppose we have:

```text
[0, 6]
[1, 4]
[1, 5]
```

The inserted value `6` is affected by both XOR operations.

Moving backwards:

```text
xr = 0

Encounter [1,5]
xr = 5

Encounter [1,4]
xr = 1

Encounter [0,6]
final value = 6 XOR 1 = 7
```

The same result is obtained without ever modifying an entire array.

This is the optimization that makes the solution efficient.

## Examples

### Example 1

#### Input

```text
queries = [[0,6],[0,3],[0,2],[1,4],[1,5]]
```

#### Output

```text
[1,2,3,7]
```

#### Trace

```text
xr = 0

[1,5] -> xr = 5
[1,4] -> xr = 1

[0,2] -> 2 XOR 1 = 3
[0,3] -> 3 XOR 1 = 2
[0,6] -> 6 XOR 1 = 7

Initial value:
0 XOR 1 = 1

Result:
[3,2,7,1]

Sorted:
[1,2,3,7]
```

---

### Example 2

#### Input

```text
queries = [[0,2],[1,3],[0,5]]
```

#### Output

```text
[1,3,5]
```

#### Trace

```text
xr = 0

[0,5] -> 5
[1,3] -> xr = 3
[0,2] -> 2 XOR 3 = 1

Initial:
0 XOR 3 = 3

Result:
[5,1,3]

Sorted:
[1,3,5]
```

---

### Example 3

#### Input

```text
queries = [[1,2],[1,4],[0,7]]
```

#### Output

```text
[1,7]
```

#### Trace

```text
xr = 0

[0,7] -> 7
[1,4] -> xr = 4
[1,2] -> xr = 6

Initial:
0 XOR 6 = 6

Result:
[7,6]

Sorted:
[6,7]
```

## How to Use / Run Locally

### C++

Compile:

```bash
g++ solution.cpp -o solution
```

Run:

```bash
./solution
```

---

### Java

Compile:

```bash
javac Solution.java
```

Run:

```bash
java Solution
```

---

### JavaScript

Run using Node.js:

```bash
node solution.js
```

---

### Python3

Run:

```bash
python solution.py
```

or

```bash
python3 solution.py
```

## Notes & Optimizations

* A direct simulation updates every element for each XOR query and can become very slow.
* Reverse traversal removes the need for repeated array modifications.
* Maintaining a cumulative XOR value is the key optimization.
* Sorting is unavoidable because the final answer must be returned in sorted order.
* The algorithm handles large constraints comfortably.
* This is a common competitive programming pattern where processing operations in reverse greatly simplifies the solution.
* The same idea can be applied to many lazy-update and offline-query problems.

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)

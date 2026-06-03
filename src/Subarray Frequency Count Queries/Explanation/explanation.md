# Subarray Frequency Count Queries | Efficient Range Frequency Query Solution

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

The **Subarray Frequency Count Queries** problem asks us to answer multiple range frequency queries on an array.

Each query contains three values:

* `l` → starting index
* `r` → ending index
* `x` → value whose frequency we need to find

For every query, we need to count how many times the value `x` appears in the subarray from index `l` to index `r` (inclusive).

Since both the array size and the number of queries can be very large, a simple brute-force approach becomes too slow. The goal is to process frequency queries efficiently using an optimized data structure and binary search.

This is a classic **range query problem**, often solved using **index mapping**, **binary search**, and **preprocessing techniques**.

## Constraints

| Constraint        | Value               |
| ----------------- | ------------------- |
| Array Size        | `1 ≤ n ≤ 10^5`      |
| Number of Queries | `1 ≤ q ≤ 10^5`      |
| Array Values      | `1 ≤ arr[i] ≤ 10^5` |
| Query Value       | `1 ≤ x ≤ 10^5`      |
| Query Range       | `0 ≤ l ≤ r < n`     |

## Intuition

My first thought was to scan every subarray and count occurrences manually.

That works for small inputs, but with up to `10^5` queries, repeatedly scanning ranges becomes extremely expensive.

Then I noticed that the array never changes. Only queries are changing.

Instead of searching the array every time, I can preprocess it once and store all positions where each value appears.

For example:

```text
1 -> [0, 2, 4]
2 -> [1, 5]
3 -> [3, 6]
```

Now every query becomes:

"How many positions of `x` lie between `l` and `r`?"

Since the positions are naturally sorted, binary search can answer this very quickly.

## Approach

1. Traverse the array once.
2. Store every occurrence index of each value.
3. Create a mapping:

   * Key = array value
   * Value = sorted list of indices where that value appears
4. For each query:

   * Find the occurrence list of `x`
   * Use binary search to find:

     * First position greater than or equal to `l`
     * First position greater than `r`
5. The difference between these two positions gives the count of occurrences inside the range.
6. Store the result and move to the next query.

This avoids repeatedly scanning subarrays and keeps query processing fast.

## Data Structures Used

### Hash Map / Dictionary

Used to store occurrence positions of each value.

Example:

```text
5 -> [1, 4, 9]
```

This allows direct access to all positions of a number.

### Dynamic Array / Vector / ArrayList

Stores occurrence indices.

The indices remain sorted because we insert them while traversing the array from left to right.

### Binary Search

Used to quickly count how many stored indices lie inside a given range.

Without binary search, each query could become much slower.

## Operations & Behavior Summary

### Preprocessing Stage

* Traverse the array once.
* Store occurrence positions for every value.

### Query Processing Stage

For each query:

* Extract `l`, `r`, and `x`.
* Check whether `x` exists.
* If not, answer is `0`.
* Otherwise:

  * Find first occurrence index greater than or equal to `l`.
  * Find first occurrence index greater than `r`.
* Subtract the two positions.
* Store the result.

### Final Stage

Return the answer array containing results for all queries.

## Complexity

| Metric           | Complexity       | Explanation                                             |
| ---------------- | ---------------- | ------------------------------------------------------- |
| Time Complexity  | `O(n + q log k)` | `n` for preprocessing and two binary searches per query |
| Space Complexity | `O(n)`           | Every array index is stored exactly once                |

Where:

* `n` = size of array
* `q` = number of queries
* `k` = frequency of the queried element

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    
    // Binary search to find first index >= target
    int lowerBound(vector<int>& positions, int target) {
        int low = 0;
        int high = positions.size();
        
        while (low < high) {
            int mid = low + (high - low) / 2;
            
            if (positions[mid] < target)
                low = mid + 1;
            else
                high = mid;
        }
        
        return low;
    }
    
    vector<int> freqInRange(vector<int>& arr, vector<vector<int>>& queries) {
        
        // Store all occurrence positions of every value
        unordered_map<int, vector<int>> mp;
        
        for (int i = 0; i < arr.size(); i++) {
            mp[arr[i]].push_back(i);
        }
        
        vector<int> ans;
        
        for (auto &q : queries) {
            int l = q[0];
            int r = q[1];
            int x = q[2];
            
            // If value never appeared
            if (!mp.count(x)) {
                ans.push_back(0);
                continue;
            }
            
            vector<int>& positions = mp[x];
            
            // First occurrence >= l
            int left = lowerBound(positions, l);
            
            // First occurrence > r
            int right = upper_bound(
                positions.begin(),
                positions.end(),
                r
            ) - positions.begin();
            
            ans.push_back(right - left);
        }
        
        return ans;
    }
};
```

### Java

```java
class Solution {
    
    public ArrayList<Integer> freqInRange(int[] arr, int[][] queries) {
        
        // Store occurrence positions of every value
        HashMap<Integer, ArrayList<Integer>> map = new HashMap<>();
        
        for (int i = 0; i < arr.length; i++) {
            map.putIfAbsent(arr[i], new ArrayList<>());
            map.get(arr[i]).add(i);
        }
        
        ArrayList<Integer> ans = new ArrayList<>();
        
        for (int[] q : queries) {
            int l = q[0];
            int r = q[1];
            int x = q[2];
            
            // Value not present in array
            if (!map.containsKey(x)) {
                ans.add(0);
                continue;
            }
            
            ArrayList<Integer> positions = map.get(x);
            
            // First position >= l
            int left = lowerBound(positions, l);
            
            // First position > r
            int right = upperBound(positions, r);
            
            ans.add(right - left);
        }
        
        return ans;
    }
    
    // Finds first index >= target
    private int lowerBound(ArrayList<Integer> list, int target) {
        int low = 0;
        int high = list.size();
        
        while (low < high) {
            int mid = low + (high - low) / 2;
            
            if (list.get(mid) < target)
                low = mid + 1;
            else
                high = mid;
        }
        
        return low;
    }
    
    // Finds first index > target
    private int upperBound(ArrayList<Integer> list, int target) {
        int low = 0;
        int high = list.size();
        
        while (low < high) {
            int mid = low + (high - low) / 2;
            
            if (list.get(mid) <= target)
                low = mid + 1;
            else
                high = mid;
        }
        
        return low;
    }
}
```

### JavaScript

```javascript
/**
 * @param {number[]} arr
 * @param {number[][]} queries
 * @returns {number[]}
 */

class Solution {
    
    // First index >= target
    lowerBound(arr, target) {
        let low = 0;
        let high = arr.length;
        
        while (low < high) {
            let mid = Math.floor((low + high) / 2);
            
            if (arr[mid] < target)
                low = mid + 1;
            else
                high = mid;
        }
        
        return low;
    }
    
    // First index > target
    upperBound(arr, target) {
        let low = 0;
        let high = arr.length;
        
        while (low < high) {
            let mid = Math.floor((low + high) / 2);
            
            if (arr[mid] <= target)
                low = mid + 1;
            else
                high = mid;
        }
        
        return low;
    }
    
    freqInRange(arr, queries) {
        
        // Map value -> occurrence positions
        const mp = new Map();
        
        for (let i = 0; i < arr.length; i++) {
            if (!mp.has(arr[i])) {
                mp.set(arr[i], []);
            }
            
            mp.get(arr[i]).push(i);
        }
        
        const ans = [];
        
        for (const q of queries) {
            const [l, r, x] = q;
            
            // Value not present
            if (!mp.has(x)) {
                ans.push(0);
                continue;
            }
            
            const positions = mp.get(x);
            
            const left = this.lowerBound(positions, l);
            const right = this.upperBound(positions, r);
            
            ans.push(right - left);
        }
        
        return ans;
    }
}
```

### Python3

```python
from bisect import bisect_left, bisect_right
from collections import defaultdict

class Solution:
    def freqInRange(self, arr, queries):
        
        # Store occurrence positions of every value
        pos = defaultdict(list)
        
        for i, val in enumerate(arr):
            pos[val].append(i)
        
        ans = []
        
        for l, r, x in queries:
            
            # If x never appeared
            if x not in pos:
                ans.append(0)
                continue
            
            positions = pos[x]
            
            # First occurrence >= l
            left = bisect_left(positions, l)
            
            # First occurrence > r
            right = bisect_right(positions, r)
            
            ans.append(right - left)
        
        return ans
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains exactly the same across all language implementations.

### Step 1: Build the Occurrence Map

I first traverse the array.

For every value, I store the index where it appears.

Example:

```text
Array:
[1, 2, 1, 3, 1]

Map:
1 -> [0, 2, 4]
2 -> [1]
3 -> [3]
```

Now I know every location where a value exists.

### Step 2: Process Each Query

Suppose the query is:

```text
[1, 4, 1]
```

This means:

```text
Count frequency of 1 between indices 1 and 4.
```

The occurrence list of `1` is:

```text
[0, 2, 4]
```

### Step 3: Find Left Boundary

Using binary search:

```text
First occurrence >= 1
```

Result:

```text
Index position pointing to value 2
```

### Step 4: Find Right Boundary

Using binary search:

```text
First occurrence > 4
```

Result:

```text
Position after value 4
```

### Step 5: Calculate Frequency

The count is:

```text
rightBoundary - leftBoundary
```

This directly gives the number of valid occurrences inside the required range.

### Why Binary Search Works

The occurrence lists are sorted.

Binary search allows us to find range boundaries in logarithmic time instead of scanning the entire list.

This is the key optimization that makes the solution efficient enough for large constraints.

### Edge Case: Value Does Not Exist

Suppose:

```text
Query:
[0, 6, 10]
```

If `10` never appears in the array:

```text
Map does not contain 10
```

The answer is immediately:

```text
0
```

No binary search is needed.

## Examples

### Example 1

Input

```text
arr = [1, 2, 1, 3, 1, 2, 3]

queries = [
  [0, 4, 1],
  [2, 5, 2]
]
```

Output

```text
[3, 1]
```

Explanation

```text
Query 1:
Subarray = [1, 2, 1, 3, 1]
Frequency of 1 = 3

Query 2:
Subarray = [1, 3, 1, 2]
Frequency of 2 = 1
```

### Example 2

Input

```text
arr = [11, 21, 51, 101, 11, 51]

queries = [
  [0, 4, 11],
  [2, 5, 51]
]
```

Output

```text
[2, 2]
```

Explanation

```text
11 appears twice between indices 0 and 4.

51 appears twice between indices 2 and 5.
```

### Example 3

Input

```text
arr = [5, 5, 5, 5]

queries = [
  [0, 3, 5],
  [1, 2, 5]
]
```

Output

```text
[4, 2]
```

Explanation

```text
Entire range contains four occurrences.

Middle range contains two occurrences.
```

## How to Use / Run Locally

### C++

Compile

```bash
g++ solution.cpp -o solution
```

Run

```bash
./solution
```

### Java

Compile

```bash
javac Solution.java
```

Run

```bash
java Solution
```

### JavaScript

Run

```bash
node solution.js
```

### Python3

Run

```bash
python solution.py
```

## Notes & Optimizations

* A brute-force solution would require scanning ranges repeatedly and can become extremely slow.
* Storing occurrence positions transforms the problem into a binary search problem.
* Since indices are stored in sorted order automatically, no extra sorting step is needed.
* This approach is commonly used in:

  * Range Frequency Query problems
  * Offline Query Processing
  * Competitive Programming
  * Binary Search on Answer Spaces
* The solution scales comfortably for arrays and query counts up to `10^5`.

Possible alternative approaches include:

* Segment Trees
* Fenwick Trees
* Mo's Algorithm

However, for this specific problem, storing occurrence indices and using binary search is simpler and more efficient.

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)

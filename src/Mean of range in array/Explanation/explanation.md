# Mean of Range in Array

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
  * [Go](#go)
* [Step-by-step Detailed Explanation](#step-by-step-detailed-explanation)
* [Examples](#examples)
* [How to use / Run locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

## Problem Summary

Given an integer array `arr[]` and a 2D array `queries[][]`.

Each query contains two indices `[l, r]` representing a subarray from index `l` to `r`.

For every query:

1. Find the sum of elements in the range `[l, r]`
2. Calculate the mean (average)
3. Return the floor value of the mean

The goal is to return an array where each element is the answer for a query.

## Constraints

```text
1 <= arr.size() <= 10^5
1 <= arr[i] <= 10^3
1 <= queries.size() <= 10^5
1 <= queries[i][0] <= queries[i][1] < arr.size()
```

## Intuition

At first, I thought about solving every query by looping from `l` to `r` and calculating the sum.

But that would take too much time because there can be up to `10^5` queries.

If I process every query in linear time, the total complexity becomes `O(n * q)` which is too slow.

So I thought of using Prefix Sum.

With a prefix sum array, I can calculate the sum of any range in constant time.

Formula:

```text
Range Sum = prefix[r + 1] - prefix[l]
```

Then:

```text
Mean = Sum / Number of Elements
```

This makes every query very fast.

## Approach

1. Create a prefix sum array of size `n + 1`
2. Store cumulative sums in it
3. For every query `[l, r]`:

   * Find the subarray sum using prefix sum
   * Find the number of elements in the range
   * Divide the sum by the range length
   * Store the floor value of the mean
4. Return the final answer array

## Data Structures Used

* Array / Vector for storing prefix sums
* Array / List for storing final answers

## Operations & Behavior Summary

| Operation           | Complexity | Description                |
| ------------------- | ---------- | -------------------------- |
| Build Prefix Sum    | O(n)       | Store cumulative sums      |
| Query Range Sum     | O(1)       | Use prefix sum subtraction |
| Process All Queries | O(q)       | One pass over all queries  |
| Total Complexity    | O(n + q)   | Efficient for large input  |

## Complexity

* Time Complexity: `O(n + q)`

  * `n` is the size of the array
  * `q` is the number of queries

* Space Complexity: `O(n)`

  * Extra prefix sum array is used

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    vector<int> findMean(vector<int> &arr, vector<vector<int>> &queries) {
        int n = arr.size();

        // Prefix sum array
        vector<long long> prefix(n + 1, 0);

        // Build prefix sum
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + arr[i];
        }

        vector<int> ans;

        // Process each query
        for (auto &q : queries) {
            int l = q[0];
            int r = q[1];

            long long sum = prefix[r + 1] - prefix[l];
            int len = r - l + 1;

            ans.push_back(sum / len);
        }

        return ans;
    }
};
```

### Java

```java
class Solution {
    public ArrayList<Integer> findMean(int[] arr, int[][] queries) {
        int n = arr.length;

        long[] prefix = new long[n + 1];

        // Build prefix sum
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + arr[i];
        }

        ArrayList<Integer> ans = new ArrayList<>();

        // Process queries
        for (int[] q : queries) {
            int l = q[0];
            int r = q[1];

            long sum = prefix[r + 1] - prefix[l];
            int len = r - l + 1;

            ans.add((int)(sum / len));
        }

        return ans;
    }
}
```

### JavaScript

```javascript
class Solution {
    findMean(arr, queries) {
        let n = arr.length;

        // Prefix sum array
        let prefix = new Array(n + 1).fill(0);

        // Build prefix sum
        for (let i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + arr[i];
        }

        let ans = [];

        // Process queries
        for (let [l, r] of queries) {
            let sum = prefix[r + 1] - prefix[l];
            let len = r - l + 1;

            ans.push(Math.floor(sum / len));
        }

        return ans;
    }
}
```

### Python3

```python
class Solution:
    def findMean(self, arr, queries):
        n = len(arr)

        # Prefix sum array
        prefix = [0] * (n + 1)

        # Build prefix sum
        for i in range(n):
            prefix[i + 1] = prefix[i] + arr[i]

        ans = []

        # Process queries
        for l, r in queries:
            total = prefix[r + 1] - prefix[l]
            length = r - l + 1

            ans.append(total // length)

        return ans
```

### Go

```go
class Solution {
public:
    vector<int> findMean(vector<int>& arr, vector<vector<int>>& queries) {
        int n := len(arr)

        // Prefix sum array
        prefix := make([]int64, n+1)

        // Build prefix sum
        for i := 0; i < n; i++ {
            prefix[i+1] = prefix[i] + int64(arr[i])
        }

        ans := []int{}

        // Process queries
        for _, q := range queries {
            l := q[0]
            r := q[1]

            sum := prefix[r+1] - prefix[l]
            length := r - l + 1

            ans = append(ans, int(sum/int64(length)))
        }

        return ans
    }
}
```

## Step-by-step Detailed Explanation

### Step 1: Create Prefix Sum Array

```text
prefix[i] stores the sum of first i elements
```

Example:

```text
arr = [1, 2, 3, 4, 5]
prefix = [0, 1, 3, 6, 10, 15]
```

Here:

* `prefix[1] = 1`
* `prefix[2] = 1 + 2 = 3`
* `prefix[3] = 1 + 2 + 3 = 6`

### Step 2: Build Prefix Sum

```text
prefix[i + 1] = prefix[i] + arr[i]
```

This keeps adding the current array value to the previous sum.

### Step 3: Find Sum of Any Range

Suppose query is:

```text
l = 1
r = 3
```

Subarray:

```text
[2, 3, 4]
```

Range sum:

```text
sum = prefix[r + 1] - prefix[l]
```

So:

```text
sum = prefix[4] - prefix[1]
    = 10 - 1
    = 9
```

### Step 4: Find Number of Elements

```text
length = r - l + 1
```

For query `[1, 3]`:

```text
length = 3
```

### Step 5: Calculate Mean

```text
mean = sum / length
```

Since we need floor value:

```text
mean = 9 / 3 = 3
```

## Examples

### Example 1

```text
Input:
arr = [1, 2, 3, 4, 5]
queries = [[0, 2], [1, 3], [0, 4]]

Output:
[2, 3, 3]
```

Explanation:

* Query [0, 2] -> Sum = 6, Mean = 2
* Query [1, 3] -> Sum = 9, Mean = 3
* Query [0, 4] -> Sum = 15, Mean = 3

### Example 2

```text
Input:
arr = [6, 7, 8, 10]
queries = [[0, 3], [1, 2]]

Output:
[7, 7]
```

Explanation:

* Query [0, 3] -> Sum = 31, Mean = 7
* Query [1, 2] -> Sum = 15, Mean = 7

## How to use / Run locally

### C++

```bash
g++ solution.cpp -o solution
./solution
```

### Java

```bash
javac Solution.java
java Solution
```

### JavaScript

```bash
node solution.js
```

### Python3

```bash
python solution.py
```

### Go

```bash
go run solution.go
```

## Notes & Optimizations

* Brute force would take `O(n * q)` time
* Prefix sum reduces query time to `O(1)`
* Total complexity becomes `O(n + q)`
* Using `long long` in C++ and `long` in Java prevents overflow
* Prefix sum is one of the most useful techniques for range query problems

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)

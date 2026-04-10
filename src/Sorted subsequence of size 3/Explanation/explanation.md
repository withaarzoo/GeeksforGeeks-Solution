# Sorted Subsequence of Size 3

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
* [Step-by-step Detailed Explanation](#step-by-step-detailed-explanation)
* [Examples](#examples)
* [How to use / Run locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

## Problem Summary

Given an array `arr[]`, I need to find any subsequence of size `3` such that:

```text
arr[i] < arr[j] < arr[k]
where i < j < k
```

If such a subsequence exists, I return those three elements.

If no such subsequence exists, I return an empty array.

A subsequence means the elements should remain in the same order as the original array.

## Constraints

```text
1 <= arr.size() <= 10^5
1 <= arr[i] <= 10^6
```

## Intuition

I thought about choosing one element as the middle element of the subsequence.

For every element `arr[j]`, I need:

* One smaller element before it
* One greater element after it

So instead of checking all possible triplets, I can:

1. Keep track of the smallest element seen so far from the left.
2. Keep track of the maximum element available on the right.

If for some index `j`:

```text
leftMin < arr[j] < rightMax
```

Then I already found a valid increasing subsequence of size `3`.

## Approach

1. Create a `rightMax[]` array.

   * `rightMax[i]` stores the maximum element from index `i` to the end.

2. Traverse the array from right to left.

   * Fill the `rightMax[]` array.

3. Traverse the array from left to right.

   * Keep track of the smallest value seen so far using `leftMin`.

4. For every element `arr[i]`:

```text
If leftMin < arr[i] < rightMax[i + 1]
```

Then:

```text
[leftMin, arr[i], rightMax[i + 1]]
```

is the answer.

1. If no valid triplet is found, return an empty array.

## Data Structures Used

* Array / Vector for storing `rightMax`
* Integer variables for storing:

  * `leftMin`
  * Current index values

## Operations & Behavior Summary

| Operation          | Purpose                                                 |
| ------------------ | ------------------------------------------------------- |
| Build `rightMax[]` | Find maximum value available on the right side          |
| Track `leftMin`    | Find minimum value available on the left side           |
| Compare values     | Check whether current element can be the middle element |
| Return triplet     | Return first valid increasing subsequence               |

## Complexity

* Time Complexity: `O(n)`

  * I traverse the array a constant number of times.

* Space Complexity: `O(n)`

  * I use one extra array `rightMax[]` of size `n`.

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    vector<int> find3Numbers(vector<int> &arr) {
        int n = arr.size();
        
        if (n < 3) return {};
        
        vector<int> rightMax(n);
        rightMax[n - 1] = arr[n - 1];
        
        for (int i = n - 2; i >= 0; i--) {
            rightMax[i] = max(arr[i], rightMax[i + 1]);
        }
        
        int leftMin = arr[0];
        
        for (int i = 1; i < n - 1; i++) {
            if (leftMin < arr[i] && arr[i] < rightMax[i + 1]) {
                return {leftMin, arr[i], rightMax[i + 1]};
            }
            
            leftMin = min(leftMin, arr[i]);
        }
        
        return {};
    }
};
```

### Java

```java
class Solution {
    public ArrayList<Integer> find3Numbers(int[] arr) {
        int n = arr.length;
        ArrayList<Integer> ans = new ArrayList<>();
        
        if (n < 3) return ans;
        
        int[] rightMax = new int[n];
        rightMax[n - 1] = arr[n - 1];
        
        for (int i = n - 2; i >= 0; i--) {
            rightMax[i] = Math.max(arr[i], rightMax[i + 1]);
        }
        
        int leftMin = arr[0];
        
        for (int i = 1; i < n - 1; i++) {
            if (leftMin < arr[i] && arr[i] < rightMax[i + 1]) {
                ans.add(leftMin);
                ans.add(arr[i]);
                ans.add(rightMax[i + 1]);
                return ans;
            }
            
            leftMin = Math.min(leftMin, arr[i]);
        }
        
        return ans;
    }
}
```

### JavaScript

```javascript
class Solution {
    find3Numbers(arr) {
        let n = arr.length;
        
        if (n < 3) return [];
        
        let rightMax = new Array(n);
        rightMax[n - 1] = arr[n - 1];
        
        for (let i = n - 2; i >= 0; i--) {
            rightMax[i] = Math.max(arr[i], rightMax[i + 1]);
        }
        
        let leftMin = arr[0];
        
        for (let i = 1; i < n - 1; i++) {
            if (leftMin < arr[i] && arr[i] < rightMax[i + 1]) {
                return [leftMin, arr[i], rightMax[i + 1]];
            }
            
            leftMin = Math.min(leftMin, arr[i]);
        }
        
        return [];
    }
}
```

### Python3

```python
class Solution:
    def find3Numbers(self, arr):
        n = len(arr)
        
        if n < 3:
            return []
        
        rightMax = [0] * n
        rightMax[n - 1] = arr[n - 1]
        
        for i in range(n - 2, -1, -1):
            rightMax[i] = max(arr[i], rightMax[i + 1])
        
        leftMin = arr[0]
        
        for i in range(1, n - 1):
            if leftMin < arr[i] < rightMax[i + 1]:
                return [leftMin, arr[i], rightMax[i + 1]]
            
            leftMin = min(leftMin, arr[i])
        
        return []
```

## Step-by-step Detailed Explanation

### C++

```cpp
vector<int> rightMax(n);
```

I create an array to store the maximum value from the current index to the end.

```cpp
rightMax[n - 1] = arr[n - 1];
```

The last element itself is the maximum from that index.

```cpp
for (int i = n - 2; i >= 0; i--) {
    rightMax[i] = max(arr[i], rightMax[i + 1]);
}
```

I fill the array from right to left.

```cpp
int leftMin = arr[0];
```

I store the smallest value seen so far.

```cpp
if (leftMin < arr[i] && arr[i] < rightMax[i + 1])
```

This checks whether the current element can be the middle element.

---

### Java

```java
int[] rightMax = new int[n];
```

This array stores the maximum value on the right side.

```java
rightMax[i] = Math.max(arr[i], rightMax[i + 1]);
```

I calculate the maximum value available from index `i` onward.

```java
int leftMin = arr[0];
```

This stores the smallest value seen from the left.

```java
if (leftMin < arr[i] && arr[i] < rightMax[i + 1])
```

This means a valid subsequence exists.

---

### JavaScript

```javascript
let rightMax = new Array(n);
```

I create an extra array for right-side maximum values.

```javascript
rightMax[i] = Math.max(arr[i], rightMax[i + 1]);
```

This keeps track of the maximum value from the current index to the end.

```javascript
let leftMin = arr[0];
```

This stores the smallest value found so far.

```javascript
if (leftMin < arr[i] && arr[i] < rightMax[i + 1])
```

If true, then I found the required triplet.

---

### Python3

```python
rightMax = [0] * n
```

I create an array to store maximum values from the right.

```python
rightMax[i] = max(arr[i], rightMax[i + 1])
```

This fills the maximum value for every index.

```python
leftMin = arr[0]
```

This stores the smallest value seen from the left side.

```python
if leftMin < arr[i] < rightMax[i + 1]:
```

This checks whether the current element can become the middle value of the subsequence.

## Examples

### Example 1

```text
Input: arr[] = [12, 11, 10, 5, 6, 2, 30]
Output: [5, 6, 30]
```

Explanation:

```text
5 < 6 < 30
```

and their order is valid.

### Example 2

```text
Input: arr[] = [1, 2, 3, 4]
Output: [1, 2, 4]
```

Explanation:

The array is already increasing.

### Example 3

```text
Input: arr[] = [4, 3, 2, 1]
Output: []
```

Explanation:

No increasing subsequence of size `3` exists.

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

## Notes & Optimizations

* Brute force would take `O(n^3)` time because it checks every possible triplet.
* This optimized approach reduces the complexity to `O(n)`.
* Using `rightMax[]` helps me quickly know the best candidate on the right side.
* Using `leftMin` helps me quickly know the smallest candidate on the left side.
* This is efficient enough for arrays up to `10^5` elements.

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)

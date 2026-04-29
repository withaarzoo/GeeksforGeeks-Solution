# Min Swaps to Group 1s

## Table of Contents

* [Problem Summary](#problem-summary)
* [Constraints](#constraints)
* [Intuition](#intuition)
* [Approach](#approach)
* [Data Structures Used](#data-structures-used)
* [Operations & Behavior Summary](#operations--behavior-summary)
* [Complexity](#complexity)
* [Multi-language Solutions](#multi-language-solutions)
* [Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)](#step-by-step-detailed-explanation-c-java-javascript-python3)
* [Examples](#examples)
* [How to Use / Run Locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

---

## Problem Summary

In this problem, I am given a binary array containing only `0`s and `1`s.

My goal is to find the **minimum number of swaps required to group all the 1s together** in a continuous subarray.

A swap means I can exchange any two elements in the array.

If there are no `1`s in the array, I simply return `-1`.

This is a classic **sliding window problem** often seen in Data Structures and Algorithms (DSA) and competitive programming.

---

## Constraints

* `1 ≤ n ≤ 10^6`
* `0 ≤ arr[i] ≤ 1`

---

## Intuition

When I first looked at the problem, I thought:

If I want all `1`s to be together, then they must fit inside some continuous block.

So I asked myself:

* How big should that block be?

Answer:

* The size of the block should be equal to the total number of `1`s in the array.

Now the problem becomes:

* Find a window of that size which already has the **maximum number of 1s**

Because:

* The remaining elements inside that window will be `0`s
* Those `0`s are exactly what I need to swap

So:
**Minimum swaps = number of zeros inside the best window**

---

## Approach

Here’s how I solved it step by step:

1. First, I count how many `1`s are in the array.
2. If there are no `1`s, I return `-1`.
3. I take a sliding window of size equal to the number of `1`s.
4. I count how many `1`s are inside the current window.
5. I keep updating the maximum number of `1`s found in any window.
6. Finally, I calculate:

   * `minimum swaps = total 1s - maximum 1s in a window`

This works because I am minimizing the number of `0`s inside the window.

---

## Data Structures Used

* **Array (Input)**
  I use the given array directly. No extra storage needed.

* **Variables (Counters)**
  I only use a few integer variables to track counts and window state.

This makes the solution very memory efficient.

---

## Operations & Behavior Summary

Here’s what the algorithm does in simple terms:

* Count total number of `1`s
* Create a window of that size
* Slide the window across the array
* Keep track of how many `1`s are inside the window
* Find the window with maximum `1`s
* Calculate swaps based on missing `1`s in that window

---

## Complexity

| Type             | Complexity | Explanation                                          |
| ---------------- | ---------- | ---------------------------------------------------- |
| Time Complexity  | O(n)       | I traverse the array once using a sliding window     |
| Space Complexity | O(1)       | I only use a few variables, no extra data structures |

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int minSwaps(vector<int>& arr) {
        int n = arr.size();
        
        // Step 1: Count total number of 1s
        int k = 0;
        for(int x : arr) {
            if(x == 1) k++;
        }
        
        // If no 1s present
        if(k == 0) return -1;
        
        // Step 2: Sliding window of size k
        int ones = 0;
        
        // Count 1s in first window
        for(int i = 0; i < k; i++) {
            if(arr[i] == 1) ones++;
        }
        
        int maxOnes = ones;
        
        // Slide the window
        for(int i = k; i < n; i++) {
            if(arr[i] == 1) ones++;         // include new element
            if(arr[i - k] == 1) ones--;     // remove old element
            
            maxOnes = max(maxOnes, ones);
        }
        
        // Minimum swaps = zeros in best window
        return k - maxOnes;
    }
};
```

### Java

```java
class Solution {
    public int minSwaps(int[] arr) {
        int n = arr.length;
        
        // Count total 1s
        int k = 0;
        for(int x : arr) {
            if(x == 1) k++;
        }
        
        if(k == 0) return -1;
        
        int ones = 0;
        
        // First window
        for(int i = 0; i < k; i++) {
            if(arr[i] == 1) ones++;
        }
        
        int maxOnes = ones;
        
        // Sliding window
        for(int i = k; i < n; i++) {
            if(arr[i] == 1) ones++;
            if(arr[i - k] == 1) ones--;
            
            maxOnes = Math.max(maxOnes, ones);
        }
        
        return k - maxOnes;
    }
}
```

### JavaScript

```javascript
class Solution {
    minSwaps(arr) {
        let n = arr.length;
        
        // Count total 1s
        let k = 0;
        for(let x of arr) {
            if(x === 1) k++;
        }
        
        if(k === 0) return -1;
        
        let ones = 0;
        
        // First window
        for(let i = 0; i < k; i++) {
            if(arr[i] === 1) ones++;
        }
        
        let maxOnes = ones;
        
        // Sliding window
        for(let i = k; i < n; i++) {
            if(arr[i] === 1) ones++;
            if(arr[i - k] === 1) ones--;
            
            maxOnes = Math.max(maxOnes, ones);
        }
        
        return k - maxOnes;
    }
}
```

### Python3

```python
class Solution:
    def minSwaps(self, arr):
        n = len(arr)
        
        # Count total 1s
        k = arr.count(1)
        
        if k == 0:
            return -1
        
        # First window
        ones = sum(arr[:k])
        max_ones = ones
        
        # Sliding window
        for i in range(k, n):
            if arr[i] == 1:
                ones += 1
            if arr[i - k] == 1:
                ones -= 1
            
            max_ones = max(max_ones, ones)
        
        return k - max_ones
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is exactly the same in all languages.

Here’s how I think about it step by step:

* I start by counting total `1`s. This tells me the size of my window.
* If there are no `1`s, I immediately return `-1` because grouping is impossible.
* Then I calculate how many `1`s exist in the first window.
* After that, I slide the window one element at a time:

  * Add the new element coming into the window
  * Remove the element going out
* At each step, I update the maximum number of `1`s seen so far.
* Finally, I subtract this maximum from total `1`s to get the answer.

The key idea is:
I am not actually swapping anything — I am just calculating how many swaps would be needed.

---

## Examples

### Example 1

Input:

```
[1, 0, 1, 0, 1]
```

Output:

```
1
```

Explanation:

* Total 1s = 3
* Best window has 2 ones
* So 1 swap is needed

---

### Example 2

Input:

```
[1, 0, 1, 0, 1, 1]
```

Output:

```
1
```

Explanation:

* Total 1s = 4
* Best window contains 3 ones
* So only 1 swap is required

---

### Example 3

Input:

```
[0, 0, 0]
```

Output:

```
-1
```

Explanation:

* No 1s present, so grouping is not possible

---

## How to Use / Run Locally

### C++

* Save file as `solution.cpp`
* Compile:

  ```
  g++ solution.cpp -o solution
  ```

* Run:

  ```
  ./solution
  ```

### Java

* Save file as `Solution.java`
* Compile:

  ```
  javac Solution.java
  ```

* Run:

  ```
  java Solution
  ```

### JavaScript

* Save file as `solution.js`
* Run:

  ```
  node solution.js
  ```

### Python3

* Save file as `solution.py`
* Run:

  ```
  python3 solution.py
  ```

---

## Notes & Optimizations

* This is a classic **sliding window optimization problem**
* Avoid brute force — that would be O(n²) and too slow
* Works efficiently even for large inputs up to 10^6
* Edge case:

  * If array has no `1`s, return `-1`
* This approach avoids actual swapping and only counts required swaps

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)

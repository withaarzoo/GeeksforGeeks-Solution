# Flip to Maximize 1s

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
* [Step-by-step Detailed Explanation](#step-by-step-detailed-explanation-c-java-javascript-python3)
* [Examples](#examples)
* [How to use / Run locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

---

## Problem Summary

Given a binary array containing only `0`s and `1`s, I can flip at most one contiguous subarray.

Flipping means:

* `0` becomes `1`
* `1` becomes `0`

My goal is to find the maximum number of `1`s possible after performing at most one flip.

---

## Constraints

```text
1 <= n <= 10^6
0 <= arr[i] <= 1
```

---

## Intuition

I thought about what happens when I flip a subarray.

* If I flip a `0`, it becomes `1`, so I gain `+1` one.
* If I flip a `1`, it becomes `0`, so I lose `-1` one.

So I converted the array into a gain/loss array:

* `0 -> +1`
* `1 -> -1`

Now the problem becomes:

Find the subarray with the maximum sum.

Because that subarray gives me the maximum increase in the number of `1`s.

This is exactly Kadane’s Algorithm.

---

## Approach

1. Count the number of `1`s already present in the array.
2. Convert each element into gain/loss form:

   * `0` becomes `+1`
   * `1` becomes `-1`
3. Apply Kadane’s Algorithm to find the maximum subarray sum.
4. Add that maximum gain to the original count of `1`s.
5. If every element is already `1`, then no flip is needed.

---

## Data Structures Used

* Integer variables for counting `1`s
* Integer variables for Kadane’s Algorithm
* No extra arrays are needed

---

## Operations & Behavior Summary

| Original Value | After Flip | Gain/Loss |
| -------------- | ---------- | --------- |
| 0              | 1          | +1        |
| 1              | 0          | -1        |

Kadane’s Algorithm helps me find the best contiguous subarray with the highest total gain.

---

## Complexity

* Time Complexity: `O(n)`

  * I traverse the array once.

* Space Complexity: `O(1)`

  * I only use a few variables.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int maxOnes(vector<int>& arr) {
        int ones = 0;
        
        for (int num : arr) {
            if (num == 1) {
                ones++;
            }
        }
        
        int currentGain = 0;
        int maxGain = 0;
        
        for (int num : arr) {
            int value = (num == 0) ? 1 : -1;
            
            currentGain = max(value, currentGain + value);
            maxGain = max(maxGain, currentGain);
        }
        
        return ones + maxGain;
    }
};
```

### Java

```java
class Solution {
    int maxOnes(int[] arr) {
        int ones = 0;
        
        for (int num : arr) {
            if (num == 1) {
                ones++;
            }
        }
        
        int currentGain = 0;
        int maxGain = 0;
        
        for (int num : arr) {
            int value = (num == 0) ? 1 : -1;
            
            currentGain = Math.max(value, currentGain + value);
            maxGain = Math.max(maxGain, currentGain);
        }
        
        return ones + maxGain;
    }
}
```

### JavaScript

```javascript
/**
 * @param {number[]} arr
 * @returns {number}
 */
class Solution {
    maxOnes(arr) {
        let ones = 0;

        for (let num of arr) {
            if (num === 1) {
                ones++;
            }
        }

        let currentGain = 0;
        let maxGain = 0;

        for (let num of arr) {
            let value = (num === 0) ? 1 : -1;

            currentGain = Math.max(value, currentGain + value);
            maxGain = Math.max(maxGain, currentGain);
        }

        return ones + maxGain;
    }
}
```

### Python3

```python
class Solution:
    def maxOnes(self, arr):
        ones = 0

        for num in arr:
            if num == 1:
                ones += 1

        current_gain = 0
        max_gain = 0

        for num in arr:
            value = 1 if num == 0 else -1

            current_gain = max(value, current_gain + value)
            max_gain = max(max_gain, current_gain)

        return ones + max_gain
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

### Step 1: Count existing `1`s

```cpp
int ones = 0;
for (int num : arr) {
    if (num == 1) {
        ones++;
    }
}
```

First, I count how many `1`s are already present in the array.

This is important because later I only need to add the extra gain from flipping.

---

### Step 2: Convert each value into gain/loss form

```cpp
int value = (num == 0) ? 1 : -1;
```

* If I flip `0`, I gain one extra `1`
* If I flip `1`, I lose one `1`

So:

```text
0 -> +1
1 -> -1
```

---

### Step 3: Apply Kadane’s Algorithm

```cpp
currentGain = max(value, currentGain + value);
maxGain = max(maxGain, currentGain);
```

`currentGain` stores the best gain ending at the current position.

`maxGain` stores the best gain found so far.

---

### Step 4: Return final answer

```cpp
return ones + maxGain;
```

If the array originally had `4` ones and I gained `2` more after flipping, then:

```text
4 + 2 = 6
```

That becomes the final answer.

---

## Examples

### Example 1

```text
Input: arr[] = [1, 0, 0, 1, 0]
Output: 4
```

Explanation:

```text
Original Ones = 2
Gain/Loss Array = [-1, +1, +1, -1, +1]
Maximum Gain = 2
Final Answer = 2 + 2 = 4
```

---

### Example 2

```text
Input: arr[] = [1, 0, 0, 1, 0, 0, 1]
Output: 6
```

Explanation:

```text
Original Ones = 3
Gain/Loss Array = [-1, +1, +1, -1, +1, +1, -1]
Maximum Gain = 3
Final Answer = 3 + 3 = 6
```

---

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

---

## Notes & Optimizations

* I do not need any extra array.
* I solve the problem in a single traversal.
* Kadane’s Algorithm makes the solution optimal.
* Even if all elements are `1`, the algorithm still works because `maxGain` stays `0`.

---

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)

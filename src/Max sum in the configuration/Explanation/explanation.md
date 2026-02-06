# Max Sum in the Configuration

## Table of Contents

* Problem Summary
* Constraints
* Intuition
* Approach
* Data Structures Used
* Operations & Behavior Summary
* Complexity
* Multi-language Solutions

  * C++
  * Java
  * JavaScript
  * Python3
* Step-by-step Detailed Explanation
* Examples
* How to Use / Run Locally
* Notes & Optimizations
* Author

---

## Problem Summary

I am given an integer array `arr[]`.
For every possible rotation of the array (clockwise or anticlockwise), I calculate the value:

```bash
Σ i * arr[i]
```

My task is to **find the maximum possible value** of this expression among all rotations.

The array can be rotated any number of times.

---

## Constraints

* `1 ≤ arr.size() ≤ 10⁴`
* `1 ≤ arr[i] ≤ 20`

---

## Intuition

When I first looked at this problem, my initial thought was simple.

I can rotate the array, calculate `Σ i * arr[i]`, and keep the maximum.

But then I realized:

* Rotating the array takes time
* Calculating the sum again takes time
* Doing this for every rotation becomes **O(n²)**

That is too slow.

So I asked myself:

> “If I already know the value for one rotation, can I calculate the next rotation value without recomputing everything?”

That’s when I found a mathematical relation between consecutive rotations, which allows me to solve the problem in **O(n)** time.

---

## Approach

I solved this problem in the following steps:

1. I calculated the **sum of all elements** in the array (`arrSum`).
2. I calculated the initial value of
   `Σ i * arr[i]` for the original array.
3. For every rotation, I updated the value using a formula instead of recalculating.
4. I kept track of the maximum value during all rotations.
5. Finally, I returned the maximum value.

This avoids unnecessary work and keeps the solution fast.

---

## Data Structures Used

* No extra data structures
* Only basic variables are used

---

## Operations & Behavior Summary

* I calculate the initial configuration value once
* I rotate the array logically (not physically)
* I update the sum using a constant-time formula
* I compare and store the maximum value

---

## Complexity

* **Time Complexity:** `O(n)`
  I iterate through the array a constant number of times.

* **Space Complexity:** `O(1)`
  I only use a few integer variables.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int maxSum(vector<int> &arr) {
        int n = arr.size();
        int arrSum = 0;
        int currVal = 0;

        for (int i = 0; i < n; i++) {
            arrSum += arr[i];
            currVal += i * arr[i];
        }

        int maxVal = currVal;

        for (int i = 1; i < n; i++) {
            currVal = currVal + arrSum - n * arr[n - i];
            maxVal = max(maxVal, currVal);
        }

        return maxVal;
    }
};
```

---

### Java

```java
class Solution {
    int maxSum(int[] arr) {
        int n = arr.length;
        int arrSum = 0;
        int currVal = 0;

        for (int i = 0; i < n; i++) {
            arrSum += arr[i];
            currVal += i * arr[i];
        }

        int maxVal = currVal;

        for (int i = 1; i < n; i++) {
            currVal = currVal + arrSum - n * arr[n - i];
            maxVal = Math.max(maxVal, currVal);
        }

        return maxVal;
    }
}
```

---

### JavaScript

```javascript
class Solution {
    maxSum(arr) {
        const n = arr.length;
        let arrSum = 0;
        let currVal = 0;

        for (let i = 0; i < n; i++) {
            arrSum += arr[i];
            currVal += i * arr[i];
        }

        let maxVal = currVal;

        for (let i = 1; i < n; i++) {
            currVal = currVal + arrSum - n * arr[n - i];
            maxVal = Math.max(maxVal, currVal);
        }

        return maxVal;
    }
}
```

---

### Python3

```python
class Solution:
    def maxSum(self, arr):
        n = len(arr)
        arrSum = 0
        currVal = 0

        for i in range(n):
            arrSum += arr[i]
            currVal += i * arr[i]

        maxVal = currVal

        for i in range(1, n):
            currVal = currVal + arrSum - n * arr[n - i]
            maxVal = max(maxVal, currVal)

        return maxVal
```

---

## Step-by-step Detailed Explanation (All Languages)

1. First, I calculate the sum of all array elements.
2. Then I calculate the value of `Σ i * arr[i]` for the original array.
3. When the array is rotated by one position:

   * Each element’s index increases by 1
   * The last element moves to index 0
4. Using this observation, I update the value using:

   ```bash
   nextValue = currentValue + arrSum - n * lastElement
   ```

5. I repeat this for all rotations.
6. I keep updating the maximum value.
7. At the end, I return the maximum.

---

## Examples

### Example 1

```bash
Input: [3, 1, 2, 8]
Output: 29
Explanation:
3*0 + 1*1 + 2*2 + 8*3 = 29
```

### Example 2

```bash
Input: [1, 2, 3]
Output: 8
```

---

## How to Use / Run Locally

1. Copy the solution code in your preferred language.
2. Paste it into your local compiler or online judge.
3. Call the `maxSum()` function with the input array.
4. Print the returned value.

---

## Notes & Optimizations

* This solution avoids array rotation completely.
* The key optimization is using the rotation formula.
* This approach is commonly asked in interviews.
* Works efficiently even for large arrays.

---

## Author

**Md Aarzoo Islam**
🔗 [https://bento.me/withaarzoo](https://bento.me/withaarzoo)

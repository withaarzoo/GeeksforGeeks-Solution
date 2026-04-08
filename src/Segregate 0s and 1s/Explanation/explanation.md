# Segregate 0s and 1s

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

Given an array containing only `0`s and `1`s, I need to modify the array in-place such that:

* All `0`s come on the left side.
* All `1`s come on the right side.

The main goal is to solve it efficiently without using extra space.

---

## Constraints

```text
1 <= arr.size() <= 10^5
0 <= arr[i] <= 1
```

---

## Intuition

I thought about using the Two Pointer technique.

Since I only need to move all `0`s to the left and all `1`s to the right, I can:

* Keep one pointer at the beginning.
* Keep another pointer at the end.
* If the left pointer is already pointing to `0`, I move it forward.
* If the right pointer is already pointing to `1`, I move it backward.
* Otherwise, I swap the misplaced values.

This way, I can solve the problem in one traversal.

---

## Approach

1. Initialize two pointers:

   * `left = 0`
   * `right = n - 1`

2. Run a loop while `left < right`.

3. Move `left` forward until I find a `1`.

4. Move `right` backward until I find a `0`.

5. If both pointers have misplaced values:

   * Swap them.
   * Move both pointers.

6. Continue until both pointers cross each other.

---

## Data Structures Used

* Array
* Two Pointers

No extra data structure is needed.

---

## Operations & Behavior Summary

| Operation                           | Behavior                    |
| ----------------------------------- | --------------------------- |
| `arr[left] == 0`                    | Move left pointer forward   |
| `arr[right] == 1`                   | Move right pointer backward |
| `arr[left] == 1 && arr[right] == 0` | Swap both values            |
| `left >= right`                     | Stop the loop               |

---

## Complexity

* Time Complexity: `O(n)`

  * Here, `n` is the size of the array.
  * Every element is visited at most once.

* Space Complexity: `O(1)`

  * No extra array or data structure is used.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    void segregate0and1(vector<int> &arr) {
        int left = 0;
        int right = arr.size() - 1;

        while (left < right) {

            while (left < right && arr[left] == 0) {
                left++;
            }

            while (left < right && arr[right] == 1) {
                right--;
            }

            if (left < right) {
                swap(arr[left], arr[right]);
                left++;
                right--;
            }
        }
    }
};
```

### Java

```java
class Solution {
    void segregate0and1(int[] arr) {
        int left = 0;
        int right = arr.length - 1;

        while (left < right) {

            while (left < right && arr[left] == 0) {
                left++;
            }

            while (left < right && arr[right] == 1) {
                right--;
            }

            if (left < right) {
                int temp = arr[left];
                arr[left] = arr[right];
                arr[right] = temp;

                left++;
                right--;
            }
        }
    }
}
```

### JavaScript

```javascript
class Solution {
    segregate0and1(arr) {
        let left = 0;
        let right = arr.length - 1;

        while (left < right) {

            while (left < right && arr[left] === 0) {
                left++;
            }

            while (left < right && arr[right] === 1) {
                right--;
            }

            if (left < right) {
                [arr[left], arr[right]] = [arr[right], arr[left]];
                left++;
                right--;
            }
        }
    }
}
```

### Python3

```python
class Solution:
    def segregate0and1(self, arr):
        left = 0
        right = len(arr) - 1

        while left < right:

            while left < right and arr[left] == 0:
                left += 1

            while left < right and arr[right] == 1:
                right -= 1

            if left < right:
                arr[left], arr[right] = arr[right], arr[left]
                left += 1
                right -= 1
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

Suppose the input array is:

```text
[0, 1, 0, 1, 0, 0, 1, 1, 0]
```

Initial pointers:

```text
left = 0
right = 8
```

### Step 1

* `arr[left] = 0`
* It is already in the correct position.
* Move `left` forward.

```text
left = 1
right = 8
```

### Step 2

* `arr[left] = 1`
* `arr[right] = 0`
* Both values are misplaced.
* Swap them.

Array becomes:

```text
[0, 0, 0, 1, 0, 0, 1, 1, 1]
```

Move both pointers:

```text
left = 2
right = 7
```

### Step 3

* `arr[left] = 0`
* Move `left` forward.

```text
left = 3
right = 7
```

### Step 4

* `arr[left] = 1`
* `arr[right] = 1`
* Right side already has correct value.
* Move `right` backward.

```text
left = 3
right = 6
```

### Step 5

* `arr[left] = 1`
* `arr[right] = 1`
* Move `right` backward again.

```text
left = 3
right = 5
```

### Step 6

* `arr[left] = 1`
* `arr[right] = 0`
* Swap both values.

Array becomes:

```text
[0, 0, 0, 0, 0, 1, 1, 1, 1]
```

Now:

```text
left = 4
right = 4
```

Loop ends because `left >= right`.

---

## Examples

### Example 1

```text
Input:
arr[] = [0, 1, 0, 1, 0, 0, 1, 1, 1, 0]

Output:
[0, 0, 0, 0, 0, 1, 1, 1, 1, 1]
```

### Example 2

```text
Input:
arr[] = [1, 1]

Output:
[1, 1]
```

### Example 3

```text
Input:
arr[] = [0, 0, 0]

Output:
[0, 0, 0]
```

---

## How to use / Run locally

### C++

```bash
g++ filename.cpp -o output
./output
```

### Java

```bash
javac Solution.java
java Solution
```

### JavaScript

```bash
node filename.js
```

### Python3

```bash
python solution.py
```

---

## Notes & Optimizations

* This problem can also be solved by counting the number of `0`s first.
* But that approach requires two traversals.
* The two pointer approach is better because:

  * It works in one traversal.
  * It uses constant extra space.
  * It is easy to implement.
  * It is optimal for this problem.

---

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)

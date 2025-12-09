# Array Duplicates

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
* [How to use / Run locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

---

## Problem Summary

I am given an integer array `arr[]` of size `n`.

* Every element is in the range `[1, n]`.
* Each element appears **at most twice**.
* I need to return a list of **all elements that appear more than once** in the array.
* If no element is repeating, I should return an **empty list**.

The order of the returned list does not strictly matter (GFG driver usually sorts it before printing).

---

## Constraints

* `1 ≤ n ≤ 10^5` (problem may allow up to `10^6`, but logic works for both)
* `1 ≤ arr[i] ≤ n`
* Each element appears **at most 2 times**
* Expected:

  * **Time Complexity:** `O(n)`
  * **Auxiliary Space:** `O(1)` (ignoring the output list)

---

## Intuition

When I first saw the problem, I thought:

* I need to scan the array and detect which numbers repeat.
* A simple way is to use a hashmap or frequency array.
* But that would cost extra space `O(n)`.

Then I noticed one key line in the constraints:

> Every element is in the range `1` to `n`.

This gave me a nice idea:

* Each value `x` from `1` to `n` can be connected to index `x - 1` in the same array.
* So maybe I can use the array itself to track whether I have already seen a number.
* If I somehow “mark” that index when I see the number once, then next time I see it, I will know it’s a duplicate.

The easiest way to “mark” in-place is by **changing the sign**:

* First time I see a value → make its mapped index negative.
* Second time I see the same value → its mapped index is already negative → it’s a duplicate.

---

## Approach

Here is how I solve it, step by step, from my point of view:

1. I loop over the array from index `0` to `n - 1`.
2. For every element `arr[i]`, I take its **absolute value**:

   ```text
   x = |arr[i]|
   ```

   I use absolute value because I will be flipping signs and I don’t want the sign to affect the value.
3. I map the value `x` to an index:

   ```text
   idx = x - 1
   ```

4. I check `arr[idx]`:

   * If `arr[idx]` is **positive**:

     * This means I am seeing `x` for the **first time**.
     * So I **mark it as seen** by making it **negative**:

       ```text
       arr[idx] = -arr[idx]
       ```

   * If `arr[idx]` is **negative**:

     * This means I already saw value `x` earlier.
     * Since each value appears at most twice, this second time means `x` is a **duplicate**.
     * I add `x` to my result list.
5. After finishing the loop, my result list contains all duplicates.
6. I return this list.

No extra big arrays, no hashmaps — just smart use of the original array.

---

## Data Structures Used

* **Input Array** `arr[]`
  I use it for two purposes:

  1. To store the original values.
  2. To act as a “visited” map by flipping signs.

* **Result List**

  * C++: `vector<int>`
  * Java: `ArrayList<Integer>`
  * JavaScript: `number[]`
  * Python3: `list[int]`

No other extra data structures are used.

---

## Operations & Behavior Summary

For each element `arr[i]`:

1. Compute `x = abs(arr[i])`.
2. Compute `idx = x - 1`.
3. Check `arr[idx]`:

   * If `arr[idx] > 0` → first occurrence → mark as negative.
   * Else (`arr[idx] < 0`) → second occurrence → record `x` as duplicate.
4. Continue till the end.

Because every element is at most twice, we never worry about counting more than 2 times.

---

## Complexity

* **Time Complexity:** `O(n)`

  * I go through the array exactly once.
  * Every step does only constant-time work.

* **Space Complexity:** `O(1)` extra (excluding output)

  * I use only a few variables and the answer list.
  * I do **not** create any extra frequency array or hashmap.
  * The sign marks are done in the given array itself.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    vector<int> findDuplicates(vector<int>& arr) {
        int n = arr.size();
        vector<int> ans;

        // Traverse through each element of the array
        for (int i = 0; i < n; i++) {
            int x = abs(arr[i]);   // value between [1, n]
            int idx = x - 1;       // mapping value to index

            // If arr[idx] is positive, this is first time we see x
            if (arr[idx] > 0) {
                // Mark as seen by making arr[idx] negative
                arr[idx] = -arr[idx];
            } else {
                // Already negative -> x was seen before -> duplicate
                ans.push_back(x);
            }
        }

        // Order doesn't matter; GFG usually sorts while printing
        return ans;
    }
};
```

---

### Java

```java
import java.util.*;

class Solution {
    public ArrayList<Integer> findDuplicates(int[] arr) {
        int n = arr.length;
        ArrayList<Integer> ans = new ArrayList<>();

        // Traverse the array
        for (int i = 0; i < n; i++) {
            int x = Math.abs(arr[i]); // value between [1, n]
            int idx = x - 1;          // map value to index

            if (arr[idx] > 0) {
                // First time we see x -> mark as seen
                arr[idx] = -arr[idx];
            } else {
                // Already negative -> x is duplicate
                ans.add(x);
            }
        }

        return ans;
    }
}
```

---

### JavaScript

```javascript
/**
 * @param {number[]} arr
 * @returns {number[]}
 */
class Solution {
    findDuplicates(arr) {
        const n = arr.length;
        const ans = [];

        // Traverse the array
        for (let i = 0; i < n; i++) {
            const x = Math.abs(arr[i]); // value between [1, n]
            const idx = x - 1;          // map value to index

            if (arr[idx] > 0) {
                // First time we see x -> mark index as visited
                arr[idx] = -arr[idx];
            } else {
                // Already negative -> x is a duplicate
                ans.push(x);
            }
        }

        return ans;
    }
}
```

---

### Python3

```python
class Solution:
    def findDuplicates(self, arr):
        n = len(arr)
        ans = []

        # Traverse the array
        for i in range(n):
            x = abs(arr[i])   # value between [1, n]
            idx = x - 1       # map value to index

            if arr[idx] > 0:
                # First time seeing x -> mark as seen
                arr[idx] = -arr[idx]
            else:
                # Already negative -> x is a duplicate
                ans.append(x)

        return ans
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is the same in every language, so I’ll explain it once and relate it to each code.

### 1. Setup

**Common idea (all languages):**

* Read the array.
* Create an empty list to store duplicates.

**Examples:**

* C++:

  ```cpp
  int n = arr.size();
  vector<int> ans;
  ```

* Java:

  ```java
  int n = arr.length;
  ArrayList<Integer> ans = new ArrayList<>();
  ```

* JavaScript:

  ```javascript
  const n = arr.length;
  const ans = [];
  ```

* Python:

  ```python
  n = len(arr)
  ans = []
  ```

Here I’m just preparing size `n` and the result container `ans`.

---

### 2. Loop Through the Array

I go over each element exactly once.

* C++:

  ```cpp
  for (int i = 0; i < n; i++) {
      ...
  }
  ```

* Java:

  ```java
  for (int i = 0; i < n; i++) {
      ...
  }
  ```

* JavaScript:

  ```javascript
  for (let i = 0; i < n; i++) {
      ...
  }
  ```

* Python:

  ```python
  for i in range(n):
      ...
  ```

Inside this loop, `i` is the index of the current element.

---

### 3. Get Absolute Value and Mapped Index

Inside the loop:

* I fetch the value at index `i`, but take **absolute value** to ignore any sign changes done earlier.

* C++:

  ```cpp
  int x = abs(arr[i]);
  int idx = x - 1;
  ```

* Java:

  ```java
  int x = Math.abs(arr[i]);
  int idx = x - 1;
  ```

* JavaScript:

  ```javascript
  const x = Math.abs(arr[i]);
  const idx = x - 1;
  ```

* Python:

  ```python
  x = abs(arr[i])
  idx = x - 1
  ```

Why `idx = x - 1`?

* Values are from `1` to `n`.
* Array indices are from `0` to `n - 1`.
* So value `1` → index `0`, value `2` → index `1`, ..., value `n` → index `n-1`.

---

### 4. Check and Mark / Add to Answer

Now I decide if this is the first or second time I am seeing this value.

**Case 1: First Time Seeing x**

* If `arr[idx]` is **positive**, I have never touched this index before.
* So this is the first time I see `x`.

I **mark it as seen** by making `arr[idx]` **negative**:

* C++:

  ```cpp
  if (arr[idx] > 0) {
      arr[idx] = -arr[idx];
  }
  ```

* Java:

  ```java
  if (arr[idx] > 0) {
      arr[idx] = -arr[idx];
  }
  ```

* JavaScript:

  ```javascript
  if (arr[idx] > 0) {
      arr[idx] = -arr[idx];
  }
  ```

* Python:

  ```python
  if arr[idx] > 0:
      arr[idx] = -arr[idx]
  ```

**Case 2: Second Time Seeing x (Duplicate)**

* If `arr[idx]` is **negative**, it means:

  * I already flipped its sign earlier, so the value `x` appeared before.
  * Now it appears again → it is a **duplicate**.

I add `x` to my result list `ans`:

* C++:

  ```cpp
  else {
      ans.push_back(x);
  }
  ```

* Java:

  ```java
  else {
      ans.add(x);
  }
  ```

* JavaScript:

  ```javascript
  else {
      ans.push(x);
  }
  ```

* Python:

  ```python
  else:
      ans.append(x)
  ```

---

### 5. Return the Result

After the loop ends, all duplicates have been collected in `ans`.

* C++:

  ```cpp
  return ans;
  ```

* Java:

  ```java
  return ans;
  ```

* JavaScript:

  ```javascript
  return ans;
  ```

* Python:

  ```python
  return ans
  ```

The driver (like in GFG) usually takes care of sorting and printing.

---

## Examples

### Example 1

**Input:**

```text
n = 5
arr = [2, 3, 1, 2, 3]
```

**Processing:**

* i = 0, x = 2 → idx = 1 → arr[1] positive → make arr[1] negative
* i = 1, x = 3 → idx = 2 → arr[2] positive → make arr[2] negative
* i = 2, x = 1 → idx = 0 → arr[0] positive → make arr[0] negative
* i = 3, x = 2 → idx = 1 → arr[1] negative → 2 is duplicate
* i = 4, x = 3 → idx = 2 → arr[2] negative → 3 is duplicate

**Output:**

```text
[2, 3]   // order can be [3,2] depending on run
```

---

### Example 2

**Input:**

```text
n = 3
arr = [1, 2, 3]
```

Every element appears exactly once.

**Output:**

```text
[]   // empty list, no duplicates
```

---

## How to use / Run locally

Assume you cloned this repository and are inside the project folder.

### C++

```bash
g++ -std=c++17 main.cpp -o main
./main
```

In `main.cpp` you can:

* Include the `Solution` class.
* Read input.
* Call `findDuplicates(arr)` and print the result.

---

### Java

```bash
javac Main.java
java Main
```

In `Main.java`:

* Put the `Solution` class.
* In `public static void main`, create an array and call `new Solution().findDuplicates(arr)`.

---

### JavaScript (Node.js)

```bash
node main.js
```

In `main.js`:

* Define the `Solution` class.
* Create an array.
* Call `new Solution().findDuplicates(arr)` and `console.log` the result.

---

### Python3

```bash
python3 main.py
```

In `main.py`:

* Define the `Solution` class.
* Create an array.
* Call `Solution().findDuplicates(arr)` and print the result.

---

## Notes & Optimizations

* This technique **heavily depends** on the constraint:

  * `1 ≤ arr[i] ≤ n`
* If this constraint was not true, we could **not** safely map value → index and use signs.
* If elements could appear more than twice, this same approach still **detects duplicates**, though it won’t give exact counts (just “appeared at least twice”).
* If we wanted to restore the original array, we could run one more loop to convert all numbers back to positive.
* This approach is memory efficient: no hashmap, no frequency array — just in-place marking.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)

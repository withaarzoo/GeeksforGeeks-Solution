# Pythagorean Triplet

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
* How to use / Run locally
* Notes & Optimizations
* Author

---

## Problem Summary

Given an integer array `arr`, determine whether there exists a triplet `(a, b, c)` such that:

```bash
a^2 + b^2 = c^2
```

All three values must come from the array and represent a valid Pythagorean triplet.

The task is to return `true` if such a triplet exists, otherwise return `false`.

---

## Constraints

* `1 ≤ arr.size() ≤ 10^5`
* `1 ≤ arr[i] ≤ 1000`

---

## Intuition

The equation of a Pythagorean triplet is:

```bash
a^2 + b^2 = c^2
```

Since the maximum value of elements in the array is small (≤1000), I realized I could use a fast lookup structure to check whether a number exists in the array.

Instead of checking every triplet directly, I try every valid pair `(a, b)` that exists in the array. For each pair I compute:

```bash
c^2 = a^2 + b^2
```

Then I check whether `c` exists in the array.

If it does, then a valid Pythagorean triplet exists.

---

## Approach

1. First find the maximum value in the array.
2. Create a boolean presence array to mark which numbers exist.
3. Mark each number from the input array as present.
4. Iterate over all possible values of `a`.
5. For each `a`, iterate over all possible values of `b`.
6. Compute `c² = a² + b²`.
7. Compute `c = sqrt(c²)`.
8. Check three conditions:

   * `c` must be within the allowed range
   * `c²` must be a perfect square
   * `c` must exist in the array
9. If all conditions are satisfied, return `true`.
10. If no valid triplet is found, return `false`.

---

## Data Structures Used

Boolean Array

Used to quickly check if a number exists in the input array. This allows constant time lookup.

---

## Operations & Behavior Summary

| Operation          | Purpose                        |
| ------------------ | ------------------------------ |
| Find maximum value | Determine frequency array size |
| Presence array     | Store which values exist       |
| Nested loops       | Generate pairs `(a, b)`        |
| Square computation | Check Pythagorean condition    |
| Square root check  | Validate perfect square        |

---

## Complexity

Time Complexity

```bash
O(M^2)
```

Where `M` is the maximum value in the array (≤1000).

Space Complexity

```bash
O(M)
```

Used for the presence array.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
public:
    bool pythagoreanTriplet(vector<int>& arr) {
        int maxVal = 0;
        
        for(int num : arr)
            maxVal = max(maxVal, num);

        vector<bool> present(maxVal + 1, false);

        for(int num : arr)
            present[num] = true;

        for(int a = 1; a <= maxVal; a++){
            if(!present[a]) continue;

            for(int b = a; b <= maxVal; b++){
                if(!present[b]) continue;

                int cSquare = a*a + b*b;
                int c = sqrt(cSquare);

                if(c <= maxVal && c*c == cSquare && present[c])
                    return true;
            }
        }

        return false;
    }
};
```

### Java

```java
class Solution {
    boolean pythagoreanTriplet(int[] arr) {

        int maxVal = 0;

        for(int num : arr)
            maxVal = Math.max(maxVal, num);

        boolean[] present = new boolean[maxVal + 1];

        for(int num : arr)
            present[num] = true;

        for(int a = 1; a <= maxVal; a++){

            if(!present[a]) continue;

            for(int b = a; b <= maxVal; b++){

                if(!present[b]) continue;

                int cSquare = a*a + b*b;
                int c = (int)Math.sqrt(cSquare);

                if(c <= maxVal && c*c == cSquare && present[c])
                    return true;
            }
        }

        return false;
    }
}
```

### JavaScript

```javascript
class Solution {
    pythagoreanTriplet(arr) {

        let maxVal = 0;

        for (let num of arr)
            maxVal = Math.max(maxVal, num);

        let present = new Array(maxVal + 1).fill(false);

        for (let num of arr)
            present[num] = true;

        for (let a = 1; a <= maxVal; a++) {

            if (!present[a]) continue;

            for (let b = a; b <= maxVal; b++) {

                if (!present[b]) continue;

                let cSquare = a*a + b*b;
                let c = Math.floor(Math.sqrt(cSquare));

                if (c <= maxVal && c*c === cSquare && present[c])
                    return true;
            }
        }

        return false;
    }
}
```

### Python3

```python
class Solution:
    def pythagoreanTriplet(self, arr):

        maxVal = max(arr)

        present = [False] * (maxVal + 1)

        for num in arr:
            present[num] = True

        for a in range(1, maxVal + 1):

            if not present[a]:
                continue

            for b in range(a, maxVal + 1):

                if not present[b]:
                    continue

                cSquare = a*a + b*b
                c = int(cSquare ** 0.5)

                if c <= maxVal and c*c == cSquare and present[c]:
                    return True

        return False
```

---

## Step-by-step Detailed Explanation

1. Determine the largest number in the array. This defines the range of possible values.

2. Create a boolean array called `present` where each index represents whether that value exists in the input array.

3. Populate the `present` array by marking each value from the input.

4. Start iterating through possible values of `a`.

5. If `a` is not present in the array, skip it.

6. For every valid `a`, iterate through possible values of `b` starting from `a`.

7. Again skip if `b` is not present.

8. Compute `c² = a² + b²`.

9. Compute `c = sqrt(c²)`.

10. Verify that:

* `c` does not exceed the maximum value
* `c²` is a perfect square
* `c` exists in the array

1. If all conditions hold, return `true` immediately.

2. If all combinations fail, return `false`.

---

## Examples

Example 1

Input

```bash
arr = [3, 2, 4, 6, 5]
```

Output

```bash
true
```

Explanation

```bash
3^2 + 4^2 = 5^2
```

Example 2

Input

```bash
arr = [3, 8, 5]
```

Output

```bash
false
```

Example 3

Input

```bash
arr = [1,1,1]
```

Output

```bash
false
```

---

## How to use / Run locally

1. Clone the repository

```bash
git clone <repo-url>
```

1. Navigate into the project

```bash
cd project-folder
```

1. Compile and run

C++

```bash
g++ solution.cpp
./a.out
```

Java

```bash
javac Solution.java
java Solution
```

Python

```bash
python solution.py
```

---

## Notes & Optimizations

* The constraint `arr[i] ≤ 1000` allows efficient use of a presence array.
* Using a boolean lookup avoids repeated searching in the array.
* Perfect square validation ensures mathematical correctness.
* Early return improves performance when a valid triplet is found.

---

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)

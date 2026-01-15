# Candy Problem | Greedy Approach (GeeksforGeeks)

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
* Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)
* Examples
* How to use / Run locally
* Notes & Optimizations
* Author

---

## Problem Summary

There are **n children standing in a line**.
Each child has a rating given in an integer array.

I need to distribute candies by following these rules:

Every child must get **at least one candy**.
If a child has a **higher rating than their neighbor**, they must get **more candies**.

My goal is to return the **minimum number of candies** required to satisfy all rules.

---

## Constraints

1 ≤ n ≤ 10⁵
0 ≤ rating[i] ≤ 10⁹

The answer will always fit in a 32-bit integer.

---

## Intuition

When I first read the problem, I understood that **ratings only matter compared to neighbors**, not globally.

So I thought in terms of **slopes**:

If ratings go up, candies should also go up.
If ratings go down, candies should go down.
If ratings are equal, I can reset and give just one candy.

Instead of using extra arrays, I tracked **increasing and decreasing sequences** while moving once through the array.
This helps me solve the problem efficiently using a greedy approach.

---

## Approach

This is how I solved the problem step by step:

I start by giving **1 candy to the first child**.
I move from left to right and compare the current rating with the previous one.

If rating increases
I increase the candy count step by step.

If rating decreases
I count how long the decreasing sequence continues.

If rating is equal
I reset everything and give only 1 candy.

To handle peaks correctly, I store the height of the last increasing slope and adjust candies when needed.

This guarantees minimum candies with correct conditions.

---

## Data Structures Used

No extra data structures are used.

Only integer variables are required:

* up
* down
* peak
* total

---

## Operations & Behavior Summary

Increasing ratings create an upward slope.
Decreasing ratings create a downward slope.
Equal ratings reset the slope.

Peak adjustment avoids overcounting candies at turning points.

---

## Complexity

**Time Complexity**
O(n)
I traverse the array once, where n is the number of children.

**Space Complexity**
O(1)
No extra arrays or memory are used.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
public:
    int minCandy(vector<int>& arr) {
        int n = arr.size();
        if (n == 0) return 0;

        long long total = 1;
        int up = 0, down = 0, peak = 0;

        for (int i = 1; i < n; i++) {
            if (arr[i] > arr[i - 1]) {
                up++;
                peak = up;
                down = 0;
                total += 1 + up;
            } 
            else if (arr[i] == arr[i - 1]) {
                up = down = peak = 0;
                total += 1;
            } 
            else {
                down++;
                up = 0;
                total += 1 + down;
                if (down <= peak) total--;
            }
        }
        return total;
    }
};
```

---

### Java

```java
class Solution {
    public int minCandy(int[] arr) {
        int n = arr.length;
        if (n == 0) return 0;

        long total = 1;
        int up = 0, down = 0, peak = 0;

        for (int i = 1; i < n; i++) {
            if (arr[i] > arr[i - 1]) {
                up++;
                peak = up;
                down = 0;
                total += 1 + up;
            } 
            else if (arr[i] == arr[i - 1]) {
                up = down = peak = 0;
                total += 1;
            } 
            else {
                down++;
                up = 0;
                total += 1 + down;
                if (down <= peak) total--;
            }
        }
        return (int) total;
    }
}
```

---

### JavaScript

```javascript
class Solution {
    minCandy(arr) {
        const n = arr.length;
        if (n === 0) return 0;

        let total = 1;
        let up = 0, down = 0, peak = 0;

        for (let i = 1; i < n; i++) {
            if (arr[i] > arr[i - 1]) {
                up++;
                peak = up;
                down = 0;
                total += 1 + up;
            } 
            else if (arr[i] === arr[i - 1]) {
                up = down = peak = 0;
                total += 1;
            } 
            else {
                down++;
                up = 0;
                total += 1 + down;
                if (down <= peak) total--;
            }
        }
        return total;
    }
}
```

---

### Python3

```python
class Solution:
    def minCandy(self, arr):
        n = len(arr)
        if n == 0:
            return 0

        total = 1
        up = down = peak = 0

        for i in range(1, n):
            if arr[i] > arr[i - 1]:
                up += 1
                peak = up
                down = 0
                total += 1 + up
            elif arr[i] == arr[i - 1]:
                up = down = peak = 0
                total += 1
            else:
                down += 1
                up = 0
                total += 1 + down
                if down <= peak:
                    total -= 1

        return total
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

I keep track of three things:

up counts continuous increases
down counts continuous decreases
peak stores the last highest increasing point

When ratings increase, I give more candies.
When ratings decrease, I carefully reduce candies.
When ratings are equal, I reset everything.

The peak adjustment ensures the highest rated child always has enough candies.

---

## Examples

Input
[1, 0, 2]

Output
5

Explanation
Children get candies as 2, 1, 2

---

Input
[1, 2, 2]

Output
4

Explanation
Candies distributed as 1, 2, 1

---

## How to use / Run locally

Clone the repository

Use any compiler or interpreter

* g++ for C++
* javac for Java
* node for JavaScript
* python for Python3

Call the `minCandy` function with an integer array.

---

## Notes & Optimizations

This solution avoids extra arrays.
Works efficiently for large inputs.
Greedy logic ensures minimum candies.
One pass solution with constant space.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)

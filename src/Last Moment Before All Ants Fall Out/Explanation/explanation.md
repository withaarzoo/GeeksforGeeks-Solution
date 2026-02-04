# Last Moment Before All Ants Fall Out

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

I am given a wooden plank of length `n`.
Some ants are walking on the plank.

* Ants in `left[]` move to the **left**
* Ants in `right[]` move to the **right**
* Each ant moves at **1 unit per second**
* When two ants meet, they **change direction instantly**
* When an ant reaches either end (`0` or `n`), it **falls immediately**

My task is to return the **time when the last ant falls off the plank**.

---

## Constraints

* `1 ≤ n ≤ 10^5`
* `0 ≤ left.length, right.length ≤ n + 1`
* `0 ≤ left[i], right[i] ≤ n`
* All positions are **unique**
* Each position appears in **only one array**

---

## Intuition

At first, the collision rule looks tricky.

Then I realized something important:

👉 **When two ants collide and turn back, it is the same as if they passed through each other.**

Why this works:

* All ants have the same speed
* Ants are identical
* Direction change takes no time

So I decided to **ignore collisions completely**.

Now the problem becomes simple:

* A left-moving ant falls after `position` seconds
* A right-moving ant falls after `n - position` seconds

The answer is the **maximum time** among all ants.

---

## Approach

I solved the problem in a very simple way:

1. Create a variable `ans = 0`
2. Loop through all ants moving left

   * Update `ans = max(ans, position)`
3. Loop through all ants moving right

   * Update `ans = max(ans, n - position)`
4. Return `ans`

No simulation. No collision handling.

---

## Data Structures Used

* No extra data structure
* Just simple variables and loops

---

## Operations & Behavior Summary

* Ants move at constant speed
* Collisions are ignored mathematically
* Only distance to the nearest edge matters
* The slowest ant decides the answer

---

## Complexity

**Time Complexity:** `O(L + R)`

* `L` = number of ants moving left
* `R` = number of ants moving right

**Space Complexity:** `O(1)`

* No extra memory used

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int getLastMoment(int n, vector<int>& left, vector<int>& right) {
        int ans = 0;

        for (int pos : left) {
            ans = max(ans, pos);
        }

        for (int pos : right) {
            ans = max(ans, n - pos);
        }

        return ans;
    }
};
```

---

### Java

```java
class Solution {
    public int getLastMoment(int n, int left[], int right[]) {
        int ans = 0;

        for (int pos : left) {
            ans = Math.max(ans, pos);
        }

        for (int pos : right) {
            ans = Math.max(ans, n - pos);
        }

        return ans;
    }
}
```

---

### JavaScript

```javascript
class Solution {
    getLastMoment(n, left, right) {
        let ans = 0;

        for (let pos of left) {
            ans = Math.max(ans, pos);
        }

        for (let pos of right) {
            ans = Math.max(ans, n - pos);
        }

        return ans;
    }
}
```

---

### Python3

```python
class Solution:
    def getLastMoment(self, n, left, right):
        ans = 0

        for pos in left:
            ans = max(ans, pos)

        for pos in right:
            ans = max(ans, n - pos)

        return ans
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

1. I create a variable `ans` to store the last fall time.
2. For each ant moving left:

   * Distance to fall = its current position
   * Update the maximum time.
3. For each ant moving right:

   * Distance to fall = `n - position`
   * Update the maximum time.
4. After checking all ants, `ans` holds the last moment.

This logic is identical in all languages.

---

## Examples

### Example 1

**Input:**
`n = 4`
`left = [2]`
`right = [0, 1, 3]`

**Output:**
`4`

**Explanation:**
The ant at position `0` moving right takes `4` seconds to fall.

---

### Example 2

**Input:**
`n = 3`
`left = [0]`
`right = [3]`

**Output:**
`0`

**Explanation:**
Both ants are already at the edges.

---

## How to use / Run locally

1. Copy the code for your preferred language
2. Paste it into your compiler or IDE
3. Call `getLastMoment(n, left, right)`
4. Print the returned value

---

## Notes & Optimizations

* Collision simulation is unnecessary
* This solution is already optimal
* Works easily for large inputs
* Clean and interview-friendly logic

---

## Author

* **Md Aarzoo Islam**
  👉 [https://bento.me/withaarzoo](https://bento.me/withaarzoo)

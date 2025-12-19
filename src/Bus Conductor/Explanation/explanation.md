# Bus Conductor – Minimum Moves to Seat Passengers

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

I am given two arrays:

* `chairs[]` → positions of chairs
* `passengers[]` → positions of passengers

Both arrays have the same length.

Each passenger can move left or right by **1 unit per move**.
Each passenger must be assigned to **exactly one unique chair**.

My task is to calculate the **minimum total number of moves** required so that every passenger gets a chair.

---

## Constraints

* 1 ≤ n ≤ 10⁵
* 1 ≤ chairs[i], passengers[i] ≤ 10⁴
* Multiple chairs can exist at the same position
* One passenger → one unique chair

---

## Intuition

When I started thinking about this problem, I focused on **distance**.

If a passenger is far from the chair assigned to them, the number of moves increases.
So I thought:

> “What if I always match passengers and chairs that are closest to each other?”

Then I realized something important:

* If I **sort both arrays**
* And match them **index by index**
* The total distance moved will always be minimum

This is a greedy idea, and it works because sorting aligns the closest positions together.

---

## Approach

1. Sort the `chairs` array
2. Sort the `passengers` array
3. For each index `i`:

   * Assign `passengers[i]` to `chairs[i]`
   * Add `|chairs[i] - passengers[i]|` to the answer
4. Return the total sum

This guarantees the minimum number of moves.

---

## Data Structures Used

* Arrays (or lists)
* No extra data structures are required

---

## Operations & Behavior Summary

* Sorting helps reduce unnecessary long movements
* Absolute difference calculates exact moves needed
* Greedy matching ensures optimal result

---

## Complexity

* **Time Complexity:** `O(n log n)`

  * Due to sorting both arrays
  * `n` is the number of passengers/chairs

* **Space Complexity:** `O(1)`

  * No extra space used (in-place sorting)

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int findMoves(vector<int>& chairs, vector<int>& passengers) {
        sort(chairs.begin(), chairs.end());
        sort(passengers.begin(), passengers.end());

        long long moves = 0;
        for (int i = 0; i < chairs.size(); i++) {
            moves += abs(chairs[i] - passengers[i]);
        }
        return moves;
    }
};
```

---

### Java

```java
import java.util.Arrays;

class Solution {
    public int findMoves(int[] chairs, int[] passengers) {
        Arrays.sort(chairs);
        Arrays.sort(passengers);

        int moves = 0;
        for (int i = 0; i < chairs.length; i++) {
            moves += Math.abs(chairs[i] - passengers[i]);
        }
        return moves;
    }
}
```

---

### JavaScript

```javascript
class Solution {
    findMoves(chairs, passengers) {
        chairs.sort((a, b) => a - b);
        passengers.sort((a, b) => a - b);

        let moves = 0;
        for (let i = 0; i < chairs.length; i++) {
            moves += Math.abs(chairs[i] - passengers[i]);
        }
        return moves;
    }
}
```

---

### Python3

```python
class Solution:
    def findMoves(self, chairs, passengers):
        chairs.sort()
        passengers.sort()

        moves = 0
        for i in range(len(chairs)):
            moves += abs(chairs[i] - passengers[i])
        return moves
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

### Step 1: Sorting both arrays

I sort both `chairs` and `passengers` so that nearby positions are aligned.

### Step 2: Matching by index

After sorting, I match:

* smallest passenger → smallest chair
* second smallest → second smallest
  This avoids long movements.

### Step 3: Calculating moves

For each matched pair, I calculate the absolute difference.
That tells me how many steps the passenger needs to move.

### Step 4: Summing the result

I add all differences and return the final answer.

---

## Examples

### Example 1

```
Input:
chairs = [3, 1, 5]
passengers = [2, 7, 4]

Sorted:
chairs = [1, 3, 5]
passengers = [2, 4, 7]

Moves:
|1-2| + |3-4| + |5-7| = 1 + 1 + 2 = 4
```

Output:

```
4
```

---

## How to Use / Run Locally

1. Copy the code for your preferred language
2. Paste it into your local IDE or online compiler
3. Call the `findMoves()` method with input arrays
4. Run and get the result

---

## Notes & Optimizations

* This solution is optimal and passes all constraints
* No need for extra space or complex logic
* Works perfectly even when multiple chairs have the same position
* This is a common **greedy + sorting** pattern useful in interviews

---

## Author

* **Md Aarzoo Islam**
* 🔗 [https://bento.me/withaarzoo](https://bento.me/withaarzoo)

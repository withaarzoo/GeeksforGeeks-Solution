# Maximum Area Between Bars | Two Pointer Algorithm Solution

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
* [How to Use / Run Locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

---

## Problem Summary

Given an array of bar heights, the goal is to find the maximum rectangular area that can be formed by selecting any two bars.

The height of the rectangle is determined by the shorter of the two selected bars.

The width of the rectangle is determined by the number of bars that lie strictly between the selected bars.

For every possible pair of bars, we can calculate:

Area = min(height[i], height[j]) × (j - i - 1)

The task is to return the largest possible area.

This problem is a classic Two Pointer Algorithm problem and is very similar to the popular Container With Most Water problem, with a small difference in how the width is calculated.

---

## Constraints

| Constraint               | Value              |
| ------------------------ | ------------------ |
| 1 ≤ height.size() ≤ 10^5 | Array size         |
| 1 ≤ height[i] ≤ 10^4     | Height of each bar |

---

## Intuition

My first thought was to check every possible pair of bars and calculate the area.

That approach works, but it takes O(n²) time because every bar has to be compared with every other bar.

Since the array size can go up to 100,000, a quadratic solution would be far too slow.

I noticed that the width becomes smaller whenever we move the pointers inward.

Because of this, the only way to improve the area is by finding a taller limiting bar.

The shorter bar always controls the current rectangle height, so moving the taller bar is usually not useful.

This observation naturally leads to a Two Pointer solution.

---

## Approach

1. Place one pointer at the beginning of the array.
2. Place another pointer at the end of the array.
3. Calculate the current width using the number of bars between them.
4. Calculate the current area using the smaller height.
5. Update the maximum area if needed.
6. Move the pointer pointing to the shorter bar.
7. Repeat until the pointers become adjacent.
8. Return the maximum area found.

This allows us to process the array in a single pass.

---

## Data Structures Used

### Array / List

The input array stores the heights of all bars.

No additional arrays or complex data structures are needed.

### Variables

A few integer variables are used:

* Left pointer
* Right pointer
* Current area
* Maximum area

This keeps the extra memory usage constant.

---

## Operations & Behavior Summary

The algorithm works as follows:

1. Start with the widest possible pair of bars.
2. Compute the area formed by those bars.
3. Store the best answer seen so far.
4. Compare the two heights.
5. Move the pointer that points to the shorter bar.
6. Recalculate the area for the new pair.
7. Continue until no valid width remains.
8. Return the largest area found.

The algorithm never revisits a position, which is why it runs efficiently.

---

## Complexity

| Type             | Complexity | Explanation                        |
| ---------------- | ---------- | ---------------------------------- |
| Time Complexity  | O(n)       | Each pointer moves at most n times |
| Space Complexity | O(1)       | No extra data structures are used  |

Where:

* n = number of bars in the height array

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int maxArea(vector<int> &height) {
        int n = (int)height.size();  // I store the number of bars so I can handle small arrays safely.
        if (n < 2) return 0;        // I need at least two bars to form a rectangle.

        int left = 0;               // I start from the leftmost bar.
        int right = n - 1;          // I start from the rightmost bar.
        long long best = 0;         // I keep the best area found so far in long long to avoid overflow.

        while (left + 1 < right) {  // I stop when the pointers become adjacent, because width then becomes 0.
            long long width = right - left - 1;  // I count only the bars strictly between the two chosen bars.
            long long current = 1LL * min(height[left], height[right]) * width; // I use the shorter bar as the height limit.
            if (current > best) best = current;   // I update the answer whenever I find a larger rectangle.

            if (height[left] <= height[right]) {
                left++;  // I move the shorter side inward, because that is the only side that may improve the height limit.
            } else {
                right--; // I do the same from the right side when the right bar is shorter.
            }
        }

        return (int)best;  // I return the best area found.
    }
}; 
```

### Java

```java
class Solution {
    public int maxArea(List<Integer> height) {
        int n = height.size();      // I store how many bars are present.
        if (n < 2) return 0;        // I need two bars to form any rectangle at all.

        int left = 0;              // I begin with the leftmost bar.
        int right = n - 1;         // I begin with the rightmost bar.
        long best = 0;             // I use long to safely hold the area while I compute.

        while (left + 1 < right) { // I stop when there is no bar left between the two pointers.
            long width = right - left - 1; // I count the bars strictly between the two selected bars.
            long current = (long)Math.min(height.get(left), height.get(right)) * width; // I use the shorter bar as the height limit.
            if (current > best) best = current; // I keep the best area seen so far.

            if (height.get(left) <= height.get(right)) {
                left++;   // I move the shorter side inward to look for a taller bar.
            } else {
                right--;  // I move the right side inward when it is the shorter one.
            }
        }

        return (int)best; // I convert back to int because the final answer fits in the given constraints.
    }
} 
```

### JavaScript

```javascript
class Solution {
    maxArea(height) {
        const n = height.length;   // I store the number of bars.
        if (n < 2) return 0;       // I need at least two bars to form a rectangle.

        let left = 0;              // I start from the left end.
        let right = n - 1;         // I start from the right end.
        let best = 0;              // I keep the maximum area found so far.

        while (left + 1 < right) {  // I continue only while there is at least one bar between the pointers.
            const width = right - left - 1; // I count only the bars between the chosen bars.
            const current = Math.min(height[left], height[right]) * width; // I use the shorter bar as the limiting height.
            if (current > best) best = current; // I update the best answer.

            if (height[left] <= height[right]) {
                left++;   // I move the shorter side inward because that is the only side that may increase the limiting height.
            } else {
                right--;  // I move the other side inward when it is shorter.
            }
        }

        return best; // I return the best area I found.
    }
}; 
```

### Python3

```python
class Solution:
    def maxArea(self, height):
        n = len(height)          # I store the total number of bars.
        if n < 2:
            return 0             # I need two bars to form any rectangle.

        left = 0                 # I start from the leftmost bar.
        right = n - 1            # I start from the rightmost bar.
        best = 0                 # I keep track of the largest area I have seen.

        while left + 1 < right:  # I stop when the pointers become adjacent, because then the width is 0.
            width = right - left - 1                     # I count only the bars between the two chosen bars.
            current = min(height[left], height[right]) * width  # I use the shorter bar as the height limit.
            if current > best:
                best = current   # I update the answer whenever I find a bigger rectangle.

            if height[left] <= height[right]:
                left += 1        # I move the shorter side inward to try for a taller limiting bar.
            else:
                right -= 1       # I move the right side inward when it is the shorter one.

        return best              # I return the best area found.
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is identical in all languages.

### Step 1: Initialize Two Pointers

One pointer starts from the left side.

The second pointer starts from the right side.

This gives the maximum possible width at the beginning.

---

### Step 2: Calculate Current Width

The width is not the distance between bars.

Instead, it is the number of bars strictly between them.

Formula:

width = right - left - 1

---

### Step 3: Calculate Area

The rectangle height is limited by the shorter bar.

Formula:

area = min(leftHeight, rightHeight) × width

---

### Step 4: Update Answer

Compare the current area with the best area found so far.

If the current area is larger, update the answer.

---

### Step 5: Move the Shorter Side

The shorter bar is currently limiting the rectangle height.

Keeping it while reducing width cannot improve the result.

So we move the pointer pointing to the shorter bar.

This gives us a chance to find a taller limiting bar.

---

### Step 6: Repeat

Continue performing the same operations until the pointers become adjacent.

At that point, the width becomes zero and no larger rectangle can be formed.

---

### Why Moving the Shorter Pointer Works

Suppose the left bar is shorter.

If we move the right pointer:

* Width decreases
* Limiting height remains unchanged

The area cannot improve reliably.

Instead, moving the shorter side may find a taller bar.

That is the only move that has a chance of producing a better area.

This is the key idea behind the Two Pointer Technique.

---

## Examples

### Example 1

Input

```text
height = [2, 5, 4, 3, 7]
```

Output

```text
10
```

Explanation

Choose bars with heights 5 and 7.

Bars between them:

```text
4, 3
```

Width:

```text
2
```

Area:

```text
min(5, 7) × 2 = 10
```

---

### Example 2

Input

```text
height = [1, 3, 4]
```

Output

```text
1
```

Explanation

Choose bars 1 and 4.

Width:

```text
1
```

Area:

```text
min(1,4) × 1 = 1
```

---

### Example 3

Input

```text
height = [6, 2, 5, 4, 5, 1, 6]
```

Output

```text
30
```

Explanation

Choose the first and last bar.

Width:

```text
5
```

Area:

```text
min(6,6) × 5 = 30
```

---

## How to Use / Run Locally

### C++

Compile

```bash
g++ solution.cpp -o solution
```

Run

```bash
./solution
```

---

### Java

Compile

```bash
javac Solution.java
```

Run

```bash
java Solution
```

---

### JavaScript

Run

```bash
node solution.js
```

---

### Python3

Run

```bash
python solution.py
```

---

## Notes & Optimizations

* A brute force solution takes O(n²) time.
* The Two Pointer approach reduces this to O(n).
* No additional memory is required.
* Works efficiently even when the input size reaches 100,000 elements.
* The algorithm is based on the same intuition used in Container With Most Water problems.
* Always remember that width is calculated using bars between the selected bars, not the distance itself.
* Edge cases such as very small arrays and equal-height bars are naturally handled by the algorithm.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)

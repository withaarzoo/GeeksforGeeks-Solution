# Max Profit from Two Machines | Greedy Sorting Solution for DSA and Competitive Programming

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

The "Max Profit from Two Machines" problem is a greedy algorithm problem commonly asked in coding interviews and competitive programming platforms like GeeksforGeeks.

We are given:

* Two machines: Machine A and Machine B
* Two profit arrays:

  * `a[i]` = profit if task `i` is assigned to Machine A
  * `b[i]` = profit if task `i` is assigned to Machine B
* Capacity limits:

  * Machine A can handle at most `x` tasks
  * Machine B can handle at most `y` tasks

The goal is to assign every task to exactly one machine while maximizing the total profit.

This problem tests:

* Greedy thinking
* Sorting logic
* Optimization techniques
* Array manipulation
* Competitive programming problem-solving skills

---

## Constraints

| Constraint                | Value                            |
| ------------------------- | -------------------------------- |
| `1 <= n <= 10^5`          | Number of tasks                  |
| `1 <= x, y <= 10^5`       | Machine capacities               |
| `x + y >= n`              | All tasks can always be assigned |
| `1 <= a[i], b[i] <= 10^4` | Profit values                    |

---

## Intuition

The first thing I noticed was that every task has two possible profits.

For any task:

* I either assign it to Machine A
* Or assign it to Machine B

So instead of directly deciding where every task goes, I thought about one important question:

"How much extra profit do I get if I move this task from B to A?"

That observation simplifies the entire problem.

If I assume all tasks are assigned to Machine B first, then:

* I already have a valid base profit
* Moving a task to A changes the total profit by:

`a[i] - b[i]`

Now the problem becomes:

* Find the tasks that give the biggest extra gain when moved to A

That naturally leads to sorting.

---

## Approach

Here’s the exact strategy I used to solve the problem efficiently.

### Step 1: Start with all tasks on Machine B

I first calculate the total profit assuming every task goes to Machine B.

This gives me a stable starting point.

---

### Step 2: Calculate profit difference

For every task:

`difference = a[i] - b[i]`

This value tells me:

* Positive value → A is better
* Negative value → B is better
* Larger value → stronger reason to assign task to A

---

### Step 3: Sort differences in descending order

I sort all differences from largest to smallest.

Why?

Because the tasks with the biggest profit advantage should be considered first for Machine A.

---

### Step 4: Respect machine limits

There are two important limits:

* Machine A can take at most `x` tasks
* Machine B can take at most `y` tasks

So:

* Minimum tasks that must go to A = `n - y`
* Maximum tasks that can go to A = `x`

I only consider assignments within this valid range.

---

### Step 5: Track the best profit

I keep adding sorted differences one by one.

This gives:

* Best gain for assigning first 1 task to A
* Best gain for assigning first 2 tasks to A
* And so on...

I keep the maximum valid answer.

---

## Data Structures Used

| Data Structure   | Purpose                       |
| ---------------- | ----------------------------- |
| Array / Vector   | Store profit values           |
| Difference Array | Store `a[i] - b[i]` values    |
| Sorting          | Arrange tasks by maximum gain |

No advanced data structures are needed here.

That keeps the solution fast and clean.

---

## Operations & Behavior Summary

The algorithm works in these major stages:

1. Read input arrays
2. Assume every task belongs to Machine B
3. Compute profit differences
4. Sort differences in descending order
5. Try assigning best tasks to Machine A
6. Respect machine capacity limits
7. Track the maximum possible profit
8. Return final answer

This is a classic greedy sorting solution.

---

## Complexity

| Type             | Complexity   | Explanation                                        |
| ---------------- | ------------ | -------------------------------------------------- |
| Time Complexity  | `O(n log n)` | Sorting the difference array dominates the runtime |
| Space Complexity | `O(n)`       | Extra array used to store profit differences       |

Where:

* `n` = number of tasks

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int maxProfit(int x, int y, vector<int> &a, vector<int> &b) {
        int n = a.size();                 // Total number of tasks.
        long long base = 0;               // Profit if every task is sent to machine B first.
        vector<int> diff;                 // Stores extra gain of moving a task from B to A.
        diff.reserve(n);                  // Avoid repeated resizing while filling the array.

        for (int i = 0; i < n; i++) {
            base += b[i];                 // Add B's profit for this task to the base total.
            diff.push_back(a[i] - b[i]);  // Store how much better or worse A is than B.
        }

        sort(diff.begin(), diff.end(), greater<int>()); // Largest gain tasks come first.

        int low = max(0, n - y);          // Minimum tasks that must go to A so B stays within capacity.
        int high = min(x, n);             // Maximum tasks that can go to A.

        long long running = 0;            // Sum of the best gains for the current number of A tasks.
        long long bestGain = (low == 0 ? 0 : LLONG_MIN); // Best valid gain found so far.

        for (int i = 0; i < n; i++) {
            running += diff[i];           // Gain if I take the first i+1 best tasks for A.
            int taken = i + 1;            // Number of tasks currently assigned to A.

            if (taken >= low && taken <= high) {
                bestGain = max(bestGain, running); // Keep the best valid choice.
            }

            if (taken > high) break;      // No need to check larger counts for A.
        }

        return (int)(base + bestGain);    // Final answer = base profit + best extra gain.
    }
}; 
```

### Java

```java
class Solution {
    public int maxProfit(int x, int y, int[] a, int[] b) {
        int n = a.length;                 // Total number of tasks.
        long base = 0L;                   // Profit if every task is sent to B first.
        int[] diff = new int[n];          // Stores gain of moving each task from B to A.

        for (int i = 0; i < n; i++) {
            base += b[i];                 // Add B's profit to the base total.
            diff[i] = a[i] - b[i];        // Store the profit change if this task moves to A.
        }

        Arrays.sort(diff);                // Sort in ascending order first.

        int low = Math.max(0, n - y);     // Minimum tasks that must go to A.
        int high = Math.min(x, n);        // Maximum tasks that can go to A.

        long running = 0L;                // Running sum of the best gains.
        long bestGain = (low == 0) ? 0L : Long.MIN_VALUE; // Best valid gain so far.

        for (int i = n - 1; i >= 0; i--) {
            running += diff[i];           // Add the next largest gain.
            int taken = n - i;            // Number of tasks chosen for A so far.

            if (taken >= low && taken <= high) {
                bestGain = Math.max(bestGain, running); // Update answer inside valid range.
            }

            if (taken > high) break;      // Larger counts are not allowed, so I stop.
        }

        return (int)(base + bestGain);    // Final profit after choosing the best valid set.
    }
} 
```

### JavaScript

```javascript
/**
 * @param {number} x
 * @param {number} y
 * @param {number[]} a
 * @param {number[]} b
 * @returns {number}
 */

class Solution {
    maxProfit(x, y, a, b) {
        const n = a.length;               // Total number of tasks.
        let base = 0;                     // Base profit if every task goes to B.
        const diff = new Array(n);        // Stores the gain of moving each task from B to A.

        for (let i = 0; i < n; i++) {
            base += b[i];                 // Add B's profit for this task.
            diff[i] = a[i] - b[i];        // Record how much A changes the profit.
        }

        diff.sort((p, q) => q - p);       // Sort from largest gain to smallest gain.

        const low = Math.max(0, n - y);   // Minimum tasks that must be assigned to A.
        const high = Math.min(x, n);      // Maximum tasks that A can handle.

        let running = 0;                  // Running sum of selected gains.
        let bestGain = low === 0 ? 0 : -1e18; // Best valid gain found so far.

        for (let i = 0; i < n; i++) {
            running += diff[i];           // Gain of taking the first i+1 best tasks.
            const taken = i + 1;          // Current number of tasks assigned to A.

            if (taken >= low && taken <= high) {
                bestGain = Math.max(bestGain, running); // Keep the best valid total gain.
            }

            if (taken > high) break;      // No need to go beyond A's capacity.
        }

        return base + bestGain;           // Final maximum profit.
    }
} 
```

### Python3

```python
class Solution:
    def maxProfit(self, x, y, a, b):
        # Total number of tasks.
        n = len(a)

        # Base profit if I send every task to machine B first.
        base = 0

        # This list stores the extra gain of moving a task from B to A.
        diff = []

        for i in range(n):
            base += b[i]              # Add B's profit for this task to the base total.
            diff.append(a[i] - b[i])  # Store how much more or less A gives for this task.

        diff.sort(reverse=True)       # I want the largest gains first.

        low = max(0, n - y)           # Minimum tasks that must go to A so B does not overflow.
        high = min(x, n)              # Maximum tasks that can go to A.

        running = 0                   # Running sum of selected gains.
        best_gain = 0 if low == 0 else float("-inf")  # Best valid gain seen so far.

        for i in range(n):
            running += diff[i]        # Gain if I take the first i+1 best tasks for A.
            taken = i + 1             # Number of tasks currently assigned to A.

            if low <= taken <= high:
                best_gain = max(best_gain, running)  # Keep the best valid choice.

            if taken > high:
                break                 # I stop once I go beyond A's capacity.

        return base + best_gain        # Final answer = base profit + best extra gain
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The core logic remains exactly the same across all languages.

Only syntax changes.

### Building the base profit

I first add all values from array `b`.

This means:

* Every task is initially assigned to Machine B

That gives me a guaranteed valid starting answer.

---

### Creating the difference array

For every task:

`a[i] - b[i]`

This tells me how much extra profit I gain if I move that task from B to A.

Example:

| Task | A Profit | B Profit | Difference |
| ---- | -------- | -------- | ---------- |
| 0    | 10       | 6        | 4          |
| 1    | 5        | 9        | -4         |

Task 0 should prefer A.

Task 1 should stay in B.

---

### Sorting the differences

Sorting is the key greedy step.

After sorting:

* The best tasks for A appear first
* The worst tasks for A appear later

This allows me to greedily choose the most profitable tasks.

---

### Understanding valid limits

This part is very important.

If Machine B can only handle `y` tasks, then:

* At least `n - y` tasks must go to A

Also:

* Machine A cannot exceed `x` tasks

So the valid number of tasks assigned to A must stay between:

`[n - y, x]`

Ignoring this range would produce invalid assignments.

---

### Using a running sum

I keep a running total while traversing the sorted differences.

That running sum represents:

* Extra profit gained by assigning current tasks to A

I continuously update the best answer.

---

### Why this greedy method works

The difference array directly measures benefit.

By sorting it:

* I always choose the tasks that improve profit the most

This guarantees the maximum answer.

---

## Examples

### Example 1

Input:

```text
x = 3
y = 3

a = [1, 2, 3, 4, 5]
b = [5, 4, 3, 2, 1]
```

Output:

```text
21
```

Explanation:

Difference array:

```text
[-4, -2, 0, 2, 4]
```

Sorted:

```text
[4, 2, 0, -2, -4]
```

Best tasks go to Machine A.

Final profit becomes:

```text
21
```

---

### Example 2

Input:

```text
x = 4
y = 4

a = [1, 4, 3, 2, 7, 5, 9, 6]
b = [1, 2, 3, 6, 5, 4, 9, 8]
```

Output:

```text
43
```

Explanation:

The algorithm greedily selects tasks with the highest profit advantage for Machine A.

---

### Example 3

Input:

```text
x = 3
y = 4

a = [8, 7, 15, 19, 16, 16, 18]
b = [1, 7, 15, 11, 12, 31, 9]
```

Output:

```text
110
```

Explanation:

The sorted profit differences help maximize total profit while respecting both machine capacities.

---

## How to Use / Run Locally

### C++

Compile:

```bash
g++ filename.cpp -o output
```

Run:

```bash
./output
```

---

### Java

Compile:

```bash
javac Main.java
```

Run:

```bash
java Main
```

---

### JavaScript

Run using Node.js:

```bash
node filename.js
```

---

### Python3

Run:

```bash
python filename.py
```

or

```bash
python3 filename.py
```

---

## Notes & Optimizations

* The greedy sorting approach is optimal for this problem
* Sorting the difference array is the most important step
* The solution handles large constraints efficiently
* This problem is a good example of transforming a decision problem into a profit-difference problem
* Using prefix sums is another possible variation, but a running sum is simpler and cleaner here
* Always remember to respect both machine limits carefully
* This approach is commonly used in competitive programming greedy problems

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)

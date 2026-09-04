# Bird and Max Fruit Gathering

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

## Problem Summary

In this problem, I am given an array `arr` where each value represents the number of fruits available on a tree. The trees are arranged in a circle.

The bird can start from any tree and move only to a neighboring tree. Since the trees form a circle, the first and last trees are also neighbors.

The bird can visit at most `m` trees, and I need to find the maximum total number of fruits it can collect.

For example:

```text
arr = [2, 1, 3, 5, 0, 1, 4]
m = 3
```

The bird can visit the consecutive trees:

```text
1 + 3 + 5 = 9
```

So the answer is `9`.

The main challenge is handling the circular nature of the array efficiently.

## Constraints

* `1 <= arr.size() <= 10^6`
* `0 <= arr[i] <= 10^6`
* `m <= 10^6`

The input size can be very large, so an `O(n²)` solution would be too slow.

## Intuition

I first noticed that because the bird can only move to neighboring trees, the trees it visits must always form a consecutive section of the circle.

So this is basically a maximum sum subarray problem, but with one extra detail: the array is circular.

For a normal array, I could use a sliding window to find the maximum sum of `m` consecutive elements.

The same idea works here. I just need to make sure the window can continue from the last element back to the first element.

Instead of creating a new doubled array, I use the modulo operator to wrap the index around.

Since every fruit value is non-negative, visiting more trees cannot decrease the total fruit count. Therefore, I can consider exactly `min(m, n)` trees.

## Approach

I use a fixed-size sliding window.

1. I find `n`, the number of trees.
2. I set `k = min(m, n)`.
3. I calculate the sum of the first `k` trees.
4. I store this sum as the initial maximum.
5. I move the window one position at a time.
6. When the window moves:

   * I subtract the tree that leaves the window.
   * I add the new tree entering the window.
7. I use modulo `% n` for the entering index so that the window wraps around the circle.
8. After checking every possible starting position, the largest window sum is the answer.

This gives me a linear-time solution without creating another array.

## Data Structures Used

I do not need any extra data structure such as a stack, queue, set, map, or another array.

I only use:

* `windowSum` — stores the fruit count of the current window.
* `ans` — stores the maximum fruit count found so far.
* Integer variables for indexes and array size.

This keeps the extra space constant.

## Operations & Behavior Summary

The algorithm behaves like this:

1. Determine the number of trees.
2. Limit the window size to `min(m, n)`.
3. Build the first window.
4. Save its sum as the current answer.
5. Move the window around the circular array.
6. Remove the old tree from the sum.
7. Add the new tree to the sum.
8. Use modulo to wrap around when the index reaches the beginning.
9. Compare the new sum with the current maximum.
10. Return the maximum sum.

In simple pseudocode:

```text
k = min(m, number of trees)

sum the first k trees
answer = current sum

for every other starting position:
    remove the tree leaving the window
    add the tree entering the window
    update the maximum

return maximum
```

## Complexity

| Complexity       |   Cost | Explanation                                                                     |
| ---------------- | -----: | ------------------------------------------------------------------------------- |
| Time Complexity  | `O(n)` | I check each possible starting position once, where `n` is the number of trees. |
| Space Complexity | `O(1)` | I only use a few variables and do not create any extra array or data structure. |

This is suitable for the constraint where the array can contain up to `10^6` elements.

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int maxFruits(vector<int>& arr, int m) {
        int n = arr.size();                 // Store the number of trees.
        int k = min(m, n);                  // We cannot use more than n trees.

        long long windowSum = 0;            // Store the sum of the current window.
        
        // Build the first window containing k consecutive trees.
        for (int i = 0; i < k; i++) {
            windowSum += arr[i];            // Add each fruit value to the window.
        }

        long long ans = windowSum;          // The first window is our initial maximum.

        // Move the window to every other starting position on the circle.
        for (int start = 1; start < n; start++) {
            int removed = start - 1;        // This tree leaves the current window.
            
            // This calculates the new tree entering the window.
            // Modulo makes the index wrap around to the beginning.
            int added = (start + k - 1) % n;

            windowSum -= arr[removed];      // Remove the old first tree.
            windowSum += arr[added];        // Add the new last tree.

            ans = max(ans, windowSum);      // Keep the best window found so far.
        }

        return (int)ans;                    // Return the maximum fruit value.
    }
};
```

### Java

```java
class Solution {
    public int maxFruits(ArrayList<Integer> arr, int m) {
        int n = arr.size();                  // Store the number of trees.
        int k = Math.min(m, n);              // We cannot use more than n trees.

        long windowSum = 0;                  // Store the sum of the current window.

        // Build the first window containing k consecutive trees.
        for (int i = 0; i < k; i++) {
            windowSum += arr.get(i);         // Add the fruit value to the window.
        }

        long ans = windowSum;                // The first window is our initial maximum.

        // Move the window to every other starting position on the circle.
        for (int start = 1; start < n; start++) {
            int removed = start - 1;         // This tree leaves the current window.

            // Modulo wraps the index back to the first tree when needed.
            int added = (start + k - 1) % n;

            windowSum -= arr.get(removed);   // Remove the old first tree.
            windowSum += arr.get(added);     // Add the new last tree.

            ans = Math.max(ans, windowSum);  // Keep the best window found so far.
        }

        return (int) ans;                    // Return the maximum fruit value.
    }
}
```

### JavaScript

```javascript
/**
 * @param {number[]} arr
 * @param {number} m
 * @returns {number}
 */
maxFruits(arr, m) {
    const n = arr.length;                    // Store the number of trees.
    const k = Math.min(m, n);                // We cannot use more than n trees.

    let windowSum = 0;                       // Store the current window sum.

    // Build the first window containing k consecutive trees.
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];                 // Add the fruit value to the window.
    }

    let ans = windowSum;                     // The first window is our initial maximum.

    // Move the window to every other starting position on the circle.
    for (let start = 1; start < n; start++) {
        const removed = start - 1;           // This tree leaves the current window.

        // Modulo wraps around when the window crosses the end of the array.
        const added = (start + k - 1) % n;

        windowSum -= arr[removed];            // Remove the old first tree.
        windowSum += arr[added];              // Add the new last tree.

        ans = Math.max(ans, windowSum);       // Keep the best window found so far.
    }

    return ans;                              // Return the maximum fruit value.
}
```

### Python3

```python
class Solution:

    def maxFruits(self, arr: list[int], m: int) -> int:
        """Find the maximum fruit value from at most m consecutive circular trees."""

        n = len(arr)                          # Store the number of trees.
        k = min(m, n)                         # We cannot use more than n trees.

        window_sum = 0                        # Store the current window sum.

        # Build the first window containing k consecutive trees.
        for i in range(k):
            window_sum += arr[i]              # Add the fruit value to the window.

        ans = window_sum                      # The first window is our initial maximum.

        # Move the window to every other starting position on the circle.
        for start in range(1, n):
            removed = start - 1               # This tree leaves the current window.

            # Modulo wraps around to the beginning when necessary.
            added = (start + k - 1) % n

            window_sum -= arr[removed]        # Remove the old first tree.
            window_sum += arr[added]          # Add the new last tree.

            ans = max(ans, window_sum)        # Keep the best window found so far.

        return ans                            # Return the maximum fruit value.
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is the same in all four implementations. The main difference is how each language handles arrays and integer types.

### 1. Find the number of trees

I first store the size of the array in `n`.

This tells me how many trees are present in the circle.

I then calculate:

```text
k = min(m, n)
```

If `m` is smaller than `n`, the bird can visit `m` trees.

If `m` is larger than `n`, there are not enough trees to visit more than `n` distinct positions, so I use `n`.

### 2. Calculate the first window

I take the first `k` elements and add them together.

For:

```text
arr = [2, 1, 3, 5, 0, 1, 4]
m = 3
```

the first window is:

```text
[2, 1, 3]
```

Its sum is:

```text
2 + 1 + 3 = 6
```

I use this as the initial maximum.

### 3. Slide the window

Instead of calculating the sum of every window from scratch, I reuse the previous sum.

Suppose the current window is:

```text
[2, 1, 3]
```

and I move it one position:

```text
[1, 3, 5]
```

I do not calculate `1 + 3 + 5` again.

I simply:

```text
6 - 2 + 5 = 9
```

This is the main reason the algorithm runs in `O(n)` time.

### 4. Remove the old tree

When the window moves one position forward, its first tree is no longer part of the window.

So I subtract that value from `windowSum`.

For example:

```text
[2, 1, 3]
```

moves to:

```text
[1, 3, 5]
```

The value `2` leaves the window.

So I subtract `2`.

### 5. Add the new tree

After removing the old tree, I add the new tree that enters the window.

In the same example, `5` enters the window.

So the sum changes from:

```text
6 - 2 + 5 = 9
```

Now the current window sum is `9`.

### 6. Handle the circular array

This is the most important part of the problem.

Consider:

```text
arr = [7, 2, 1, 3, 4]
m = 2
```

The last tree contains `4`, and the first tree contains `7`.

Because the trees form a circle, these two trees are neighbors.

So:

```text
[4, 7]
```

is a valid window.

To handle this without creating a second array, I use:

```text
(start + k - 1) % n
```

The modulo operation makes the index return to `0` after reaching `n - 1`.

For example:

```text
5 % 5 = 0
6 % 5 = 1
```

So the array naturally wraps around.

### 7. Update the answer

After calculating every new window sum, I compare it with the current maximum.

If the new sum is larger, I replace the answer.

For example:

```text
current answer = 9
new window sum = 11
```

Then:

```text
answer = 11
```

At the end, `answer` contains the maximum fruit value the bird can collect.

### 8. Why I do not use a doubled array

A common way to think about circular arrays is to create:

```text
arr + arr
```

For example:

```text
[7, 2, 1, 3, 4, 7, 2, 1, 3, 4]
```

Then normal sliding-window logic can be applied.

But I do not need to create this extra array.

Using modulo gives me the same circular behavior while keeping the auxiliary space at `O(1)`.

### 9. C++ consideration

In C++, I use a wide integer type for the running sum because the total can become much larger than a single array element.

The array itself remains unchanged.

### 10. Java consideration

In Java, I use `long` for the running sum for the same reason.

Since the problem provides an `ArrayList<Integer>`, I access elements using `arr.get(index)`.

### 11. JavaScript consideration

JavaScript uses the `Number` type for normal numeric calculations.

The values allowed by the given constraints remain safely representable, so a normal `Number` is enough here.

I use `%` to wrap the circular index.

### 12. Python3 consideration

Python integers can grow automatically, so I do not need to worry about integer overflow.

The list is used directly, and the algorithm still needs only constant extra space.

## Examples

### Example 1

Input:

```text
arr = [2, 1, 3, 5, 0, 1, 4]
m = 3
```

The possible windows are:

```text
2 + 1 + 3 = 6
1 + 3 + 5 = 9
3 + 5 + 0 = 8
5 + 0 + 1 = 6
0 + 1 + 4 = 5
1 + 4 + 2 = 7
4 + 2 + 1 = 7
```

The maximum is:

```text
9
```

Expected Output:

```text
9
```

### Example 2

Input:

```text
arr = [1, 6, 2, 5, 3, 4]
m = 2
```

Some of the best windows are:

```text
6 + 2 = 8
5 + 3 = 8
```

So the maximum fruit value is:

```text
8
```

Expected Output:

```text
8
```

### Example 3

Input:

```text
arr = [7, 2, 1, 3, 4]
m = 2
```

The circular window:

```text
4 + 7 = 11
```

is valid because the last and first trees are neighbors.

This is better than the other two-tree windows.

Expected Output:

```text
11
```

## How to Use / Run Locally

The solution is written in C++, Java, JavaScript, and Python3.

### C++

Save the solution in a file such as:

```text
solution.cpp
```

Compile it using:

```bash
g++ -std=c++17 solution.cpp -o solution
```

Then run:

```bash
./solution
```

On Windows, you can run:

```bash
solution.exe
```

### Java

Save the solution as:

```text
Solution.java
```

Compile it using:

```bash
javac Solution.java
```

Then run:

```bash
java Solution
```

### JavaScript

Save the solution as:

```text
solution.js
```

Make sure Node.js is installed, then run:

```bash
node solution.js
```

### Python3

Save the solution as:

```text
solution.py
```

Run it using:

```bash
python3 solution.py
```

For online judges such as GeeksforGeeks, the required class and method can be pasted directly into the provided editor.

## Notes & Optimizations

The most important optimization is using a sliding window instead of calculating every window sum from scratch.

If I calculated every group of `m` trees separately, the worst-case time complexity would become `O(n * m)`, which is too slow when both values are large.

The sliding window reduces this to `O(n)` because every move only requires one subtraction and one addition.

I also avoid creating a doubled array to represent the circular structure. Modulo indexing handles the wrap-around directly and keeps the auxiliary space at `O(1)`.

Important edge cases include:

* If `m = 1`, the answer is simply the largest single fruit value.
* If `m >= n`, the bird can collect fruit from every tree.
* If the best group crosses the boundary of the array, modulo indexing correctly handles it.
* Fruit values can be zero, so a window may contain trees with no fruit.
* Since all fruit values are non-negative, using `min(m, n)` trees is always optimal.

This approach gives an efficient solution for the GeeksforGeeks "Bird and Max Fruit Gathering" problem with `O(n)` time and `O(1)` extra space.

## Author

[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)

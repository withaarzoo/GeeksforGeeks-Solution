# Minimum Moves to Sort Permutation | GeeksforGeeks DSA Solution

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

Given a permutation `arr[]` containing every integer from `1` to `n` exactly once, the goal is to sort the array in ascending order.

In one operation, I can choose any element and move it either to the beginning of the array or to the end of the array.

I need to find the minimum number of operations required to transform the permutation into sorted order.

For example:

```text
Input:  [2, 1, 3]
Output: 1
```

I can move `1` to the beginning, and the array becomes `[1, 2, 3]`.

The main challenge is finding the largest part of the permutation that can already remain in place. Once I know that, every other element must be moved.

This solution uses a position-based approach to find the longest consecutive sequence of values that already appears in the correct relative order.

## Constraints

| Constraint                      | Description                                          |
| ------------------------------- | ---------------------------------------------------- |
| `1 <= arr[i] <= arr.size()`     | Every value is within the range from `1` to `n`      |
| `arr.size() <= 10^5`            | The permutation can contain up to `100,000` elements |
| Each value appears exactly once | `arr[]` is a permutation                             |

Because the input size can be large, an `O(n²)` solution is not suitable. I need a linear-time DSA solution.

## Intuition

My first thought was to focus on the elements that need to be moved. But that quickly becomes confusing because every element can only be moved to one of two places: the beginning or the end.

So I looked at the problem from the opposite direction.

I asked myself: which elements can I leave untouched?

Any elements that stay in the middle must already appear in the same relative order as they do in the final sorted permutation.

There is one more important detail. These values must form a consecutive sequence.

For example, if `2, 3, 4` already appear from left to right in the correct order, I can leave all three untouched. Then I can move values smaller than `2` to the beginning and values larger than `4` to the end.

So the problem becomes:

> Find the longest consecutive sequence of values whose positions are already increasing.

If the longest sequence has length `k`, then the remaining `n - k` elements must be moved.

This observation turns the problem into a simple position-tracking problem that can be solved in `O(n)` time.

## Approach

I use the following strategy:

1. Store the position of every value in the permutation.
2. Start checking consecutive values from `1` to `n`.
3. For every pair `i` and `i + 1`, compare their positions.
4. If `i` appears before `i + 1`, the current valid sequence can continue.
5. Otherwise, the sequence breaks, so I start counting a new sequence.
6. Keep track of the longest valid consecutive sequence.
7. Return `n - longestSequence`.

For example, suppose:

```text
arr = [4, 3, 1, 2]
```

The positions are:

```text
Value:     1  2  3  4
Position:  2  3  1  0
```

Now I compare consecutive values:

* `1` appears before `2`, so `[1, 2]` is valid.
* `2` does not appear before `3`, so the sequence breaks.
* `3` does not appear before `4`, so the sequence breaks again.

The longest valid sequence has length `2`.

Since `n = 4`, the answer is:

```text
4 - 2 = 2
```

## Data Structures Used

### Position Array

I use an array where:

```text
position[value] = index of value in arr
```

Since the input is a permutation containing values from `1` to `n`, an array is enough. I do not need a hash map.

This gives direct `O(1)` access to the position of every number.

### Variables

I use two simple variables:

* `current` stores the length of the consecutive valid sequence currently being checked.
* `longest` stores the maximum sequence length found so far.

No sorting, recursion, stack, queue, or complex data structure is required.

## Operations & Behavior Summary

The algorithm works in three main stages.

### Stage 1: Record Every Position

I scan the permutation once.

For every value, I store its index.

For example:

```text
arr = [3, 1, 4, 2]
```

I get:

```text
position[1] = 1
position[2] = 3
position[3] = 0
position[4] = 2
```

### Stage 2: Check Consecutive Values

I compare:

```text
position[1] and position[2]
position[2] and position[3]
position[3] and position[4]
```

If:

```text
position[i] < position[i + 1]
```

then `i` already appears before `i + 1`, so the current sequence can continue.

Otherwise, the sequence is broken.

### Stage 3: Calculate Minimum Moves

After finding the longest valid consecutive sequence:

```text
minimum moves = n - longest valid sequence
```

The values inside that sequence stay untouched.

Every other value can be moved to the beginning or end in one operation.

## Complexity

| Complexity       | Value  | Explanation                                                                        |
| ---------------- | ------ | ---------------------------------------------------------------------------------- |
| Time Complexity  | `O(n)` | I scan the array once to store positions and once more to check consecutive values |
| Space Complexity | `O(n)` | I use an extra position array of size `n + 1`                                      |

Here, `n` is the number of elements in the permutation.

This is the optimal approach for the given constraints because every element needs to be inspected at least once.

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int minMoves(vector<int>& arr) {
        int n = arr.size(); // Store the total number of elements in the permutation.

        vector<int> pos(n + 1); // pos[value] stores the current index of that value.

        for (int i = 0; i < n; i++) {
            pos[arr[i]] = i; // Record where each value appears so positions can be checked in O(1).
        }

        int current = 1; // Every single value is already a valid consecutive sequence of length 1.
        int longest = 1; // Store the maximum valid sequence length found so far.

        for (int value = 1; value < n; value++) {
            // If value and value + 1 already appear from left to right,
            // both can stay untouched in the sorted array.
            if (pos[value] < pos[value + 1]) {
                current++; // Extend the current consecutive sequence.
            } else {
                current = 1; // Their order is wrong, so a new sequence starts here.
            }

            longest = max(longest, current); // Keep the best sequence length.
        }

        return n - longest; // Move every element that cannot remain in the longest valid sequence.
    }
};
```

### Java

```java
class Solution {
    public int minMoves(int[] arr) {
        int n = arr.length; // Store the total number of elements in the permutation.

        int[] pos = new int[n + 1]; // pos[value] stores the index where that value appears.

        for (int i = 0; i < n; i++) {
            pos[arr[i]] = i; // Record each value's position for O(1) position comparison.
        }

        int current = 1; // A single value always forms a valid sequence of length 1.
        int longest = 1; // Store the longest valid consecutive sequence.

        for (int value = 1; value < n; value++) {
            // Check whether consecutive values already appear in increasing index order.
            if (pos[value] < pos[value + 1]) {
                current++; // Extend the sequence because their relative order is already correct.
            } else {
                current = 1; // Reset because this pair breaks the required order.
            }

            longest = Math.max(longest, current); // Update the maximum sequence length.
        }

        return n - longest; // All elements outside the longest sequence need to be moved.
    }
}
```

### JavaScript

```javascript
/**
 * @param {number[]} arr
 * @return {number}
 */
class Solution {
    minMoves(arr) {
        const n = arr.length; // Store the total number of elements in the permutation.

        const pos = new Array(n + 1); // pos[value] will store the index of that value.

        for (let i = 0; i < n; i++) {
            pos[arr[i]] = i; // Save each value's position for direct O(1) comparison later.
        }

        let current = 1; // A single value is always a valid consecutive sequence.
        let longest = 1; // Store the maximum sequence length found so far.

        for (let value = 1; value < n; value++) {
            // If value appears before value + 1, both can remain untouched.
            if (pos[value] < pos[value + 1]) {
                current++; // Extend the current valid sequence.
            } else {
                current = 1; // Reset because the consecutive values are in the wrong order.
            }

            longest = Math.max(longest, current); // Keep track of the longest valid sequence.
        }

        return n - longest; // Every value outside that sequence must be moved to an end.
    }
}
```

### Python3

```python
class Solution:
    def minMoves(self, arr):
        n = len(arr)  # Store the total number of elements in the permutation.

        pos = [0] * (n + 1)  # pos[value] will store the index where that value appears.

        for i in range(n):
            pos[arr[i]] = i  # Record each value's position for O(1) comparison later.

        current = 1  # A single value always forms a valid consecutive sequence.
        longest = 1  # Store the maximum valid sequence length found so far.

        for value in range(1, n):
            # If value comes before value + 1, their relative order is already correct.
            if pos[value] < pos[value + 1]:
                current += 1  # Extend the current consecutive sequence.
            else:
                current = 1  # Reset because this pair breaks the required order.

            longest = max(longest, current)  # Keep the longest valid sequence found.

        return n - longest  # Move every element that is outside the longest untouched sequence.
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The core logic is the same in C++, Java, JavaScript, and Python3. Only the syntax used to create arrays, access their length, and write loops is different.

### Step 1: Get the Array Size

I first store the size of the permutation in `n`.

This value is needed because the permutation contains exactly the integers from `1` to `n`.

It also tells me how many possible consecutive pairs I need to check.

### Step 2: Create a Position Array

I create an array of size `n + 1`.

The extra position is useful because the permutation values start from `1`, not `0`.

For every value in the input array, I store its original index.

After this step, I can instantly answer questions like:

```text
Where is 5?
Where is 6?
Does 5 appear before 6?
```

without searching through the array again.

### Step 3: Start with a Sequence of Length 1

Any single number can always remain untouched.

So initially:

```text
current = 1
longest = 1
```

This also correctly handles the edge case where the array contains only one element.

### Step 4: Check Each Consecutive Pair

For every value from `1` to `n - 1`, I compare:

```text
position[value] < position[value + 1]
```

If this condition is true, the two consecutive values already appear from left to right in the correct order.

For example:

```text
position[3] = 2
position[4] = 5
```

Since `2 < 5`, value `3` appears before value `4`.

The current sequence can continue.

### Step 5: Extend or Reset the Current Sequence

If the positions are increasing, I increase `current`.

If the positions are not increasing, the consecutive sequence breaks.

For example:

```text
position[4] = 6
position[5] = 2
```

Here, `4` appears after `5`, which is the wrong relative order for a sorted permutation.

So I reset:

```text
current = 1
```

I do not reset `longest`, because an earlier sequence may still be the largest one.

### Step 6: Update the Longest Sequence

After every comparison, I update the maximum sequence length.

This is important because `current` only represents the sequence currently being checked.

Once a sequence breaks, `current` becomes smaller, but I still need to remember the best sequence found earlier.

### Step 7: Return the Remaining Elements

Suppose the longest valid sequence has length `k`.

Those `k` elements can stay where they are.

The other `n - k` elements must be moved.

Therefore:

```text
answer = n - k
```

The behavior is identical in C++, Java, JavaScript, and Python3. Each language follows the same position-array algorithm and produces the same result.

## Examples

### Example 1

```text
Input:
arr = [2, 1, 3]

Output:
1
```

Trace:

```text
position[1] = 1
position[2] = 0
position[3] = 2
```

Check consecutive values:

```text
1 and 2: position[1] > position[2] -> sequence breaks
2 and 3: position[2] < position[3] -> valid sequence
```

The longest valid consecutive sequence has length `2`.

```text
Minimum moves = 3 - 2 = 1
```

One possible operation is moving `1` to the beginning.

Final array:

```text
[1, 2, 3]
```

### Example 2

```text
Input:
arr = [4, 3, 1, 2]

Output:
2
```

Positions:

```text
1 -> 2
2 -> 3
3 -> 1
4 -> 0
```

Check consecutive pairs:

```text
1 before 2 -> valid
2 before 3 -> invalid
3 before 4 -> invalid
```

The longest valid sequence is:

```text
[1, 2]
```

Its length is `2`.

```text
Minimum moves = 4 - 2 = 2
```

One possible sequence of operations is:

```text
[4, 3, 1, 2]
Move 3 to the end
[4, 1, 2, 3]
Move 4 to the end
[1, 2, 3, 4]
```

### Example 3

```text
Input:
arr = [1, 2, 3, 4, 5]

Output:
0
```

Every consecutive pair already appears in the correct order.

```text
1 before 2
2 before 3
3 before 4
4 before 5
```

The longest sequence has length `5`.

```text
Minimum moves = 5 - 5 = 0
```

The permutation is already sorted, so no operation is required.

## How to Use / Run Locally

The solution code can be compiled and tested locally in any standard environment.

### C++

Save the solution in a file named:

```text
main.cpp
```

Compile it using:

```bash
g++ main.cpp -o main
```

Run the compiled program:

```bash
./main
```

On Windows:

```bash
main.exe
```

### Java

Save the code in:

```text
Solution.java
```

Compile it using:

```bash
javac Solution.java
```

Run it using:

```bash
java Solution
```

Make sure Java is installed and available in your system path.

### JavaScript

Save the code in:

```text
solution.js
```

Run it using Node.js:

```bash
node solution.js
```

You need Node.js installed on your computer.

### Python3

Save the code in:

```text
solution.py
```

Run it using:

```bash
python3 solution.py
```

On some systems, the command may be:

```bash
python solution.py
```

## Notes & Optimizations

The important observation in this minimum moves to sort permutation problem is that I do not need to simulate every move.

Trying all possible elements to move to the beginning or end would lead to unnecessary work and could become too slow.

The position-array approach avoids simulation completely.

I only check whether consecutive values already appear in the correct relative order.

A few important edge cases are:

* A single-element permutation always requires `0` moves.
* An already sorted permutation requires `0` moves.
* A completely reversed permutation usually has no consecutive pair in the correct order, so the answer can be large.
* The solution depends on the input being a permutation containing each value from `1` to `n` exactly once.

An alternative approach could use a hash map to store positions, but an array is faster and simpler here because the value range is known.

Sorting the array is also unnecessary because the input values are already known to be exactly `1` through `n`.

The final `O(n)` time complexity is efficient enough for arrays of size up to `10^5` and is the preferred approach for this GeeksforGeeks DSA problem.

## Author

[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)

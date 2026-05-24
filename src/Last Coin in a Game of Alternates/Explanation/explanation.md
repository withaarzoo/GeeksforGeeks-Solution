# Last Coin in a Game of Alternates

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

The "Last Coin in a Game of Alternates" problem is a simple greedy algorithm problem where two players pick coins from either end of an array.

At every turn:

* A player can pick the leftmost coin or the rightmost coin
* Both players always choose the larger coin between the two ends
* The process continues until only one coin remains

The task is to find the value of the final remaining coin.

This problem is a good example of:

* Greedy strategy
* Two pointer technique
* Array simulation problems
* Basic competitive programming logic

### Input

An integer array `arr[]` representing coin values.

### Output

Return the value of the last remaining coin.

---

## Constraints

| Constraint              | Value      |
| ----------------------- | ---------- |
| `1 ≤ arr.size() ≤ 10^5` | Array size |
| `1 ≤ arr[i] ≤ 10^6`     | Coin value |

---

## Intuition

When I first looked at this problem, I noticed something important:

Both players always follow the exact same greedy rule.

They never think ahead.
They simply remove the larger coin from the two available ends.

That means I do not actually need to simulate two separate players.
I only need to simulate the removal process itself.

Since coins are removed only from the beginning or the end, the entire problem naturally fits the two pointer approach.

One pointer starts from the left side.
Another pointer starts from the right side.

At every step:

* Compare both ends
* Remove the larger one
* Move the corresponding pointer

The last position where both pointers meet becomes the answer.

---

## Approach

I solved this problem using two pointers.

### Step-by-step strategy

1. Start one pointer at the beginning of the array
2. Start another pointer at the end
3. Compare the values at both ends
4. Remove the larger coin
5. Move the corresponding pointer inward
6. Continue until both pointers point to the same index
7. Return that remaining coin

This works because:

* Every move removes exactly one coin
* Only the ends matter
* The greedy rule is fixed and predictable

So there is no need for recursion, dynamic programming, or extra memory.

---

## Data Structures Used

| Data Structure | Why It Was Used                                  |
| -------------- | ------------------------------------------------ |
| Array          | Stores the coin values                           |
| Two Pointers   | Efficiently track the active left and right ends |

No additional data structures are needed.

---

## Operations & Behavior Summary

Here is what the algorithm does internally:

1. Initialize:

   * `left = 0`
   * `right = n - 1`

2. Repeat while more than one coin exists:

   * Compare `arr[left]` and `arr[right]`
   * Remove the larger value
   * Move the corresponding pointer

3. Stop when:

   * `left == right`

4. Return:

   * `arr[left]`

This creates an efficient greedy simulation in linear time.

---

## Complexity

| Type             | Complexity | Explanation                                                |
| ---------------- | ---------- | ---------------------------------------------------------- |
| Time Complexity  | `O(n)`     | Each step removes one coin, so the array is processed once |
| Space Complexity | `O(1)`     | Only two pointers are used, no extra memory is required    |

Where:

* `n` = number of coins in the array

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int coin(vector<int>& arr) {
        
        // Pointer at the beginning
        int left = 0;
        
        // Pointer at the end
        int right = arr.size() - 1;

        // Continue until only one coin remains
        while (left < right) {
            
            // If left coin is larger,
            // remove it by moving left pointer forward
            if (arr[left] > arr[right]) {
                left++;
            }
            else {
                
                // Otherwise remove right coin
                // by moving right pointer backward
                right--;
            }
        }

        // Both pointers now point to the last remaining coin
        return arr[left];
    }
};
```

### Java

```java
class Solution {
    public int coin(int[] arr) {
        
        // Pointer at the beginning
        int left = 0;
        
        // Pointer at the end
        int right = arr.length - 1;

        // Continue until one coin remains
        while (left < right) {
            
            // Remove larger coin from left side
            if (arr[left] > arr[right]) {
                left++;
            }
            else {
                
                // Otherwise remove right coin
                right--;
            }
        }

        // Remaining coin
        return arr[left];
    }
}
```

### JavaScript

```javascript
/**
 * @param {number[]} arr
 * @returns {number}
 */

class Solution {
    coin(arr) {
        
        // Pointer at the beginning
        let left = 0;
        
        // Pointer at the end
        let right = arr.length - 1;

        // Continue until only one coin remains
        while (left < right) {
            
            // Remove larger coin from left side
            if (arr[left] > arr[right]) {
                left++;
            }
            else {
                
                // Otherwise remove right coin
                right--;
            }
        }

        // Last remaining coin
        return arr[left];
    }
}
```

### Python3

```python
class Solution:
    def coin(self, arr):
        
        # Pointer at the beginning
        left = 0
        
        # Pointer at the end
        right = len(arr) - 1

        # Continue until one coin remains
        while left < right:
            
            # Remove larger coin from left side
            if arr[left] > arr[right]:
                left += 1
            else:
                
                # Otherwise remove right coin
                right -= 1

        # Remaining coin
        return arr[left]
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains exactly the same in all languages.

The only difference is syntax.

### Step 1 — Initialize Two Pointers

The algorithm starts by placing:

* One pointer at the beginning
* One pointer at the end

This represents the two ends from where coins can be picked.

Example:

```text
[5, 3, 1, 6, 9]
 L           R
```

Only these two values matter at any moment.

---

### Step 2 — Compare Both Ends

At every iteration:

* Compare left coin
* Compare right coin

If the left value is larger:

```text
arr[left] > arr[right]
```

then the left coin gets removed.

Otherwise, the right coin gets removed.

This directly follows the greedy strategy mentioned in the problem.

---

### Step 3 — Move Pointers

If the left coin is removed:

```text
left++
```

If the right coin is removed:

```text
right--
```

This simulates removing coins without actually deleting elements from the array.

That is important because deleting array elements repeatedly would make the solution slower.

Pointer movement keeps the algorithm fast and memory efficient.

---

### Step 4 — Continue Until One Coin Remains

The loop continues while:

```text
left < right
```

The moment:

```text
left == right
```

only one coin remains.

That coin becomes the answer.

---

### Why This Greedy Solution Works

The problem already defines the behavior of both players.

There are no choices to optimize.

The players always remove the larger value from the ends.

So the entire process becomes deterministic.

That means a simple simulation is enough.

---

### Edge Cases

#### Single Coin

Input:

```text
[11]
```

No moves happen.

Answer:

```text
11
```

---

#### Equal End Values

Input:

```text
[5, 9, 2, 5]
```

When both ends are equal, removing either one works because both values are the same.

Most implementations naturally remove the right one using the `else` condition.

---

#### Strictly Increasing Array

Input:

```text
[1, 2, 3, 4, 5]
```

The larger coin is always on the right side.

So coins keep getting removed from the end.

---

## Examples

### Example 1

### Input

```text
arr = [5, 3, 1, 6, 9]
```

### Output

```text
1
```

### Trace

```text
Pick 9 → [5, 3, 1, 6]
Pick 6 → [5, 3, 1]
Pick 5 → [3, 1]
Pick 3 → [1]
```

Final remaining coin:

```text
1
```

---

### Example 2

### Input

```text
arr = [5, 9, 2, 5]
```

### Output

```text
2
```

### Trace

```text
Pick 5 → [5, 9, 2]
Pick 5 → [9, 2]
Pick 9 → [2]
```

Final remaining coin:

```text
2
```

---

### Example 3

### Input

```text
arr = [11]
```

### Output

```text
11
```

### Trace

Only one coin exists, so no move happens.

---

## How to Use / Run Locally

### C++

Compile:

```bash
g++ main.cpp -o main
```

Run:

```bash
./main
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
node main.js
```

---

### Python3

Run:

```bash
python main.py
```

---

## Notes & Optimizations

* This is a greedy simulation problem
* The two pointer technique makes the solution optimal
* No extra memory is needed
* The algorithm works efficiently even for large input sizes
* Since the process is fully deterministic, advanced algorithms like dynamic programming are unnecessary

### Alternative Approach

Another way would be physically removing elements from the array after every move.

But that would be inefficient because array deletions can take extra time.

Using pointers avoids that overhead completely.

### Important Observation

This problem is not about finding the best move.

The moves are already fixed by the problem statement.

That is why direct simulation works perfectly.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)

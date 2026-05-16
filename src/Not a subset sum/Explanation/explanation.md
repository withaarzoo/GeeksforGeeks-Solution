# Not a Subset Sum

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

The "Not a Subset Sum" problem asks us to find the smallest positive integer that cannot be formed using the sum of any subset of the given array.

We are given an array of positive integers. Using any combination of elements, we try to create different sums. The task is to return the first positive number that is impossible to create.

This is a very popular greedy algorithm problem in Data Structures and Algorithms because the optimal solution depends on a smart observation instead of brute force subset generation.

Example:

Input:
`[1, 2, 3]`

Possible subset sums:
`1, 2, 3, 4, 5, 6`

The smallest missing positive sum becomes:
`7`

This problem is commonly asked in coding interviews and competitive programming contests because it tests sorting, greedy thinking, and range-building logic.

---

## Constraints

| Constraint    | Value               |
| ------------- | ------------------- |
| Array Size    | `1 ≤ n ≤ 10^5`      |
| Element Value | `1 ≤ arr[i] ≤ 10^3` |

---

## Intuition

My first instinct was to think about generating every possible subset sum.

But that immediately felt too expensive because the number of subsets grows exponentially.

Then I noticed a pattern.

If I can already create every value from `1` to `x`, and the next number is smaller than or equal to `x + 1`, then I can extend that reachable range further.

That single observation turns the entire problem into a greedy sorting problem.

Instead of checking every subset, I only keep track of the current reachable range of sums.

That makes the solution extremely efficient.

---

## Approach

First, I sort the array in increasing order.

Then I maintain a variable called `smallestMissing`.

This variable represents the smallest value that I currently cannot form.

Initially:

* `smallestMissing = 1`

Because before using any numbers, I cannot form `1`.

Now I traverse the sorted array one by one.

If the current number is greater than `smallestMissing`, then I found a gap.

That means `smallestMissing` can never be formed.

Otherwise, if the current number is less than or equal to `smallestMissing`, I extend the reachable range by adding the current number.

At the end of traversal, `smallestMissing` becomes the answer.

This greedy approach works because the array is sorted.

---

## Data Structures Used

| Data Structure    | Purpose                             |
| ----------------- | ----------------------------------- |
| Array             | Stores the input numbers            |
| Integer Variable  | Tracks the smallest unreachable sum |
| Sorting Algorithm | Helps process smaller values first  |

No extra complex data structures are needed.

That is one reason this solution is both clean and efficient.

---

## Operations & Behavior Summary

1. Sort the array in ascending order
2. Start with `smallestMissing = 1`
3. Traverse each number in the array
4. If the current number is larger than `smallestMissing`, stop immediately
5. Otherwise, extend the reachable sum range
6. Return `smallestMissing`

The algorithm basically keeps expanding the range of constructible sums until a gap appears.

---

## Complexity

| Type             | Complexity   | Explanation                                                     |
| ---------------- | ------------ | --------------------------------------------------------------- |
| Time Complexity  | `O(n log n)` | Sorting the array takes `O(n log n)` and traversal takes `O(n)` |
| Space Complexity | `O(1)`       | No extra data structures are used apart from variables          |

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int findSmallest(vector<int> &arr) {
        
        // Sort the array so smaller values come first
        sort(arr.begin(), arr.end());

        // This stores the smallest value
        // that cannot currently be formed
        long long smallestMissing = 1;

        // Traverse every number in sorted order
        for (int num : arr) {

            // If current number is greater than the
            // smallest missing value, then we found a gap
            if (num > smallestMissing) {
                break;
            }

            // Otherwise, extend the reachable range
            smallestMissing += num;
        }

        // Final answer
        return smallestMissing;
    }
};
```

### Java

```java
class Solution {
    public int findSmallest(int[] arr) {

        // Sort the array first
        Arrays.sort(arr);

        // Smallest value that cannot be formed
        long smallestMissing = 1;

        // Traverse all numbers
        for (int num : arr) {

            // Gap found
            if (num > smallestMissing) {
                break;
            }

            // Extend reachable range
            smallestMissing += num;
        }

        // Return answer
        return (int)smallestMissing;
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
    findSmallest(arr) {

        // Sort numbers in increasing order
        arr.sort((a, b) => a - b);

        // Smallest value that cannot be formed
        let smallestMissing = 1;

        // Traverse array
        for (let num of arr) {

            // If a gap appears, stop
            if (num > smallestMissing) {
                break;
            }

            // Extend reachable range
            smallestMissing += num;
        }

        // Return final answer
        return smallestMissing;
    }
}
```

### Python3

```python
class Solution:
    def findSmallest(self, arr):

        # Sort the array first
        arr.sort()

        # Smallest value that cannot be formed
        smallestMissing = 1

        # Traverse every number
        for num in arr:

            # If current number creates a gap,
            # smallestMissing cannot be formed
            if num > smallestMissing:
                break

            # Otherwise extend reachable range
            smallestMissing += num

        # Final answer
        return smallestMissing
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic stays exactly the same across all languages.

Only syntax changes.

### Step 1: Sort the Array

Sorting is the most important preprocessing step.

Without sorting, the greedy logic breaks.

Example:

Input:
`[5, 1, 2]`

If I process `5` first, I incorrectly think `1` is missing.

But after sorting:

`[1, 2, 5]`

Now the logic works properly.

That is why every implementation starts with sorting.

---

### Step 2: Initialize the Smallest Missing Value

I start with:

```text
smallestMissing = 1
```

This means:

* I currently cannot form `1`
* No elements have been processed yet

This variable keeps changing as the reachable range grows.

---

### Step 3: Traverse the Sorted Array

Now I process each element carefully.

Suppose:

```text
smallestMissing = 8
```

This means I can already create every value from:

```text
1 to 7
```

Now I inspect the next number.

---

### Step 4: Check for a Gap

If:

```text
currentNumber > smallestMissing
```

then a gap exists.

Example:

```text
smallestMissing = 8
currentNumber = 10
```

I can create:

```text
1 to 7
```

But I cannot create `8`.

Even using `10`, the smallest new value becomes `10`.

So `8` remains impossible forever.

At this point, the algorithm stops.

---

### Step 5: Extend the Reachable Range

If:

```text
currentNumber <= smallestMissing
```

then I can safely extend the range.

Example:

```text
smallestMissing = 8
currentNumber = 5
```

Previously I could create:

```text
1 to 7
```

Now using `5`, I can create:

```text
5 to 12
```

Combined together, the full reachable range becomes:

```text
1 to 12
```

So I update:

```text
smallestMissing += currentNumber
```

---

### Step 6: Return the Final Answer

After processing all elements, the remaining value inside `smallestMissing` is the smallest positive integer that cannot be formed.

That becomes the final answer.

---

## Examples

### Example 1

Input:

```text
arr = [1, 2, 3]
```

Sorted array:

```text
[1, 2, 3]
```

Process:

* Start with `smallestMissing = 1`
* Add `1` → reachable up to `1`
* Add `2` → reachable up to `3`
* Add `3` → reachable up to `6`

Final answer:

```text
7
```

---

### Example 2

Input:

```text
arr = [3, 10, 9, 6, 20]
```

Sorted array:

```text
[3, 6, 9, 10, 20]
```

Start:

```text
smallestMissing = 1
```

The first number itself is greater than `1`.

So `1` cannot be formed.

Output:

```text
1
```

---

### Example 3

Input:

```text
arr = [1, 1, 1, 1]
```

Process:

* Reachable up to `1`
* Reachable up to `2`
* Reachable up to `3`
* Reachable up to `4`

Final answer:

```text
5
```

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

---

## Notes & Optimizations

* Sorting is mandatory for the greedy approach
* The algorithm avoids generating subset sums explicitly
* Brute force subset generation would take exponential time
* This greedy method works because the reachable range always stays continuous
* Using `long long` in C++ or `long` in Java is safer for large sums
* The solution is optimal for the given constraints

Alternative approaches like Dynamic Programming exist, but they use much more memory and become slower for large inputs.

This greedy solution is the best practical approach for competitive programming and coding interviews.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)

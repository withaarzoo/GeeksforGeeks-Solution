# Subset Sum on Generated Sequence

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

The problem is called **Subset Sum on Generated Sequence**.

There are `n` children standing in a queue. Each child has a value `arr[i]`. The teacher first writes `s` on a paper and gives it to the first child.

Each child then looks at all numbers already written on the paper, calculates their sum, adds their own `arr[i]`, and writes the result on the paper.

The task is to check whether the target value `x` can be formed by adding some of the numbers that were written on the paper.

For example, if the generated sequence is:

`1, 2, 5, 12, 22`

and `x = 7`, I can choose `2 + 5 = 7`, so the answer is `true`.

The solution uses the special increasing property of the generated sequence to solve the subset sum problem efficiently without using traditional `O(n * x)` dynamic programming.

## Constraints

| Constraint   | Range                     |
| ------------ | ------------------------- |
| `arr.size()` | `1 <= arr.size() <= 10^5` |
| `arr[i]`     | `1 <= arr[i] <= 10^9`     |
| `s`          | `1 <= s <= 10^9`          |
| `x`          | `0 <= x <= 10^9`          |

The large value of `x` makes a normal subset sum DP impractical, so the main challenge is finding and using the special property of the generated sequence.

## Intuition

My first thought was to generate all the numbers written on the paper and then solve a subset sum problem.

But a normal subset sum approach would be too slow because `x` can be as large as `10^9`.

Then I noticed something important about the generated sequence.

The first number is `s`.

Every next number is:

`sum of all previous numbers + arr[i]`

Since every `arr[i]` is positive, every new number is strictly greater than the sum of all previous numbers.

For example:

`1, 2, 5, 12, 22`

Here:

* `2 > 1`
* `5 > 1 + 2`
* `12 > 1 + 2 + 5`
* `22 > 1 + 2 + 5 + 12`

This means the sequence grows very quickly.

It also means I can use a greedy subset sum approach. I start from the largest generated number and take it whenever it is not greater than the remaining target.

Another useful observation is that I do not need to generate numbers greater than `x`. Once a generated number becomes greater than `x`, every following number will also be greater than `x`.

## Approach

I use two main steps.

First, I generate the useful part of the sequence.

I start with `s` and keep a running total of all numbers generated so far. For every value in `arr`, I calculate the next number as:

`next = currentSum + arr[i]`

If `next > x`, I stop generating because no later number can help form `x`.

Otherwise, I store the number and add it to the running total.

Second, I check whether `x` can be formed.

I start from the largest generated number and move toward the smallest one.

For every number:

* If it is less than or equal to the remaining target, I take it.
* I subtract it from the remaining target.
* Otherwise, I skip it.

If the remaining target becomes `0`, the answer is `true`.

If I finish all numbers and something is still left, the answer is `false`.

The greedy choice works because every generated number is greater than the sum of all numbers before it.

## Data Structures Used

### Array / Vector / List

I store the generated sequence in a simple array-like structure.

* C++ uses `vector<long long>`
* Java uses `ArrayList<Long>`
* JavaScript uses `Array`
* Python uses `list`
* C uses a dynamically allocated array

I only store generated values that are at most `x`, because larger values can never be part of a subset whose sum is `x`.

### Running Sum

I also keep one numeric variable for the sum of all generated numbers.

This lets me calculate the next sequence value in constant time without repeatedly summing the entire sequence.

## Operations & Behavior Summary

The algorithm works like this:

1. Add `s` to the generated sequence.
2. Set the running sum to `s`.
3. Process every value in `arr`.
4. Calculate the next generated number using `runningSum + arr[i]`.
5. Stop if the generated number becomes greater than `x`.
6. Otherwise, store the generated number.
7. Add it to the running sum.
8. Set `remaining = x`.
9. Traverse the generated sequence from right to left.
10. Take a number whenever it is less than or equal to `remaining`.
11. Subtract the selected number from `remaining`.
12. Return `true` when `remaining` becomes `0`.
13. Return `false` if the sequence ends while `remaining` is still greater than `0`.

## Complexity

| Type             | Complexity         | Explanation                                                                                                                                  |
| ---------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Time Complexity  | `O(min(n, log x))` | `n` is the size of `arr`. The generated sequence grows very quickly, so only `O(log x)` useful values can be generated before exceeding `x`. |
| Space Complexity | `O(min(n, log x))` | I store only generated values that are at most `x`. Because the sequence grows quickly, there are only `O(log x)` such values.               |

This is much faster than a traditional subset sum DP with `O(n * x)` complexity.

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    bool isPossible(vector<int>& arr, int s, int x) {
        // Store all useful numbers because I need to process them
        // from the largest value back to the smallest value.
        vector<long long> nums;

        // The initial number written on the paper is s.
        nums.push_back(s);

        // sum represents the sum of all numbers currently on the paper.
        long long sum = s;

        // Generate the sequence using the given arr values.
        for (int a : arr) {
            // The next child writes the sum of all previous numbers + arr[i].
            long long next = sum + a;

            // Once next is greater than x, every later number will also
            // be greater than x, so none of them can be part of x.
            if (next > x) {
                break;
            }

            // This number can still be useful for forming x.
            nums.push_back(next);

            // Add the new number to the total for generating the next value.
            sum += next;
        }

        // remaining is the part of x that I still need to form.
        long long remaining = x;

        // Start from the largest number because the sequence is superincreasing.
        for (int i = (int)nums.size() - 1; i >= 0; --i) {
            // If this number fits, taking it is always safe.
            if (nums[i] <= remaining) {
                remaining -= nums[i];
            }

            // If remaining becomes zero, x has been formed completely.
            if (remaining == 0) {
                return true;
            }
        }

        // If some value is still left, no valid subset can form x.
        return false;
    }
};
```

### Java

```java
class Solution {
    public boolean isPossible(int[] arr, int s, int x) {
        // Store the useful generated numbers so I can process
        // them later from largest to smallest.
        ArrayList<Long> nums = new ArrayList<>();

        // The first number on the paper is s.
        nums.add((long) s);

        // sum stores the sum of every number currently on the paper.
        long sum = s;

        // Generate the remaining numbers from arr.
        for (int a : arr) {
            // The next number is the current total plus arr[i].
            long next = sum + a;

            // If this number is already greater than x, all later
            // numbers will also be greater than x, so I can stop.
            if (next > x) {
                break;
            }

            // Keep this number because it can be used in the subset.
            nums.add(next);

            // Update the total for generating the next number.
            sum += next;
        }

        // This is the amount of x that is still left to form.
        long remaining = x;

        // Process the largest generated number first.
        for (int i = nums.size() - 1; i >= 0; i--) {
            // Because the sequence is superincreasing, taking a fitting
            // number is always the correct greedy choice.
            if (nums.get(i) <= remaining) {
                remaining -= nums.get(i);
            }

            // No value is left, so x has been formed.
            if (remaining == 0) {
                return true;
            }
        }

        // The required subset sum cannot be formed.
        return false;
    }
}
```

### JavaScript

```javascript
/**
 * @param {number[]} arr
 * @param {number} s
 * @param {number} x
 * @returns {boolean}
 */

class Solution {
    isPossible(arr, s, x) {
        // Store only the generated numbers that can possibly
        // contribute to the target x.
        const nums = [s];

        // sum is the total of all numbers currently on the paper.
        let sum = s;

        // Generate the sequence from arr.
        for (const a of arr) {
            // The next number is the current total plus arr[i].
            const next = sum + a;

            // Once next is greater than x, all future numbers will
            // also be greater than x, so there is no need to continue.
            if (next > x) {
                break;
            }

            // Keep this useful number for the greedy step.
            nums.push(next);

            // Update the total before generating the next number.
            sum += next;
        }

        // remaining tells me how much of x is still required.
        let remaining = x;

        // Start from the largest number and move backwards.
        for (let i = nums.length - 1; i >= 0; i--) {
            // If this number does not exceed the remaining target,
            // I take it because of the superincreasing property.
            if (nums[i] <= remaining) {
                remaining -= nums[i];
            }

            // The target has been formed completely.
            if (remaining === 0) {
                return true;
            }
        }

        // Some part of x is still left, so no subset can form it.
        return false;
    }
}
```

### Python3

```python
class Solution:
    def isPossible(self, arr, s, x):
        # Store the useful generated numbers so I can process
        # them later from largest to smallest.
        nums = [s]

        # sum is the total of all numbers currently on the paper.
        total = s

        # Generate the sequence using every value from arr.
        for a in arr:
            # The next number is the current total plus arr[i].
            next_num = total + a

            # If this number is greater than x, every later number
            # will also be greater than x, so I can stop generating.
            if next_num > x:
                break

            # Keep this number because it can be part of the subset.
            nums.append(next_num)

            # Add it to the total for generating the next number.
            total += next_num

        # remaining is the part of x that I still need to form.
        remaining = x

        # Process the generated numbers from largest to smallest.
        for num in reversed(nums):
            # If the current number fits, take it.
            # This greedy choice works because every number is greater
            # than the sum of all numbers before it.
            if num <= remaining:
                remaining -= num

            # If nothing remains, x has been formed.
            if remaining == 0:
                return True

        # The target could not be formed using the generated numbers.
        return False
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The implementation is based on the same idea in every language, so the core logic does not change between C++, Java, JavaScript, and Python3.

### 1. Start with `s`

The first number written on the paper is `s`.

So I add `s` to my generated sequence.

For example:

`arr = [1, 2, 4, 2]`

`s = 1`

The sequence starts as:

`1`

I also set the running sum to `1`.

### 2. Generate the next number

For every value `arr[i]`, I calculate:

`next = runningSum + arr[i]`

For the first value `1`:

`next = 1 + 1 = 2`

Now the sequence is:

`1, 2`

The running sum becomes:

`1 + 2 = 3`

For the next value `2`:

`next = 3 + 2 = 5`

The sequence becomes:

`1, 2, 5`

The running sum becomes:

`8`

Then:

`next = 8 + 4 = 12`

The sequence becomes:

`1, 2, 5, 12`

This continues until the next generated value becomes greater than `x`.

### 3. Stop when the generated value exceeds `x`

Suppose:

`x = 7`

While generating the sequence, we may get:

`1, 2, 5, 12`

At this point, `12 > 7`.

I stop immediately.

There is no reason to generate the remaining values because the sequence is strictly increasing and every future number will be even larger.

This optimization is important because `arr` can contain up to `10^5` values.

### 4. Start the greedy subset sum

Now I have the useful generated values.

For the example:

`1, 2, 5`

I set:

`remaining = 7`

I start from the largest value, which is `5`.

Since:

`5 <= 7`

I take `5`.

Now:

`remaining = 7 - 5 = 2`

Next I check `2`.

Since:

`2 <= 2`

I take it.

Now:

`remaining = 0`

So I return `true`.

### 5. Why the greedy approach works

The generated sequence has a special property:

`current number > sum of all previous numbers`

This is stronger than simply saying that the numbers are sorted.

For example:

`1, 2, 5, 12`

For `12`:

`1 + 2 + 5 = 8`

and:

`12 > 8`

Therefore, all smaller numbers together cannot replace `12`.

This property makes the greedy decision safe.

If the current number is greater than the remaining target, I skip it because even using every smaller number would not be enough to reach that current number.

If the current number fits into the remaining target, taking it is safe because the remaining smaller numbers can only contribute a value smaller than the current number.

### 6. Handling `x = 0`

When `x = 0`, the empty subset already has a sum of `0`.

So the answer should be `true`.

The greedy check naturally handles this because the remaining target starts as `0`.

### 7. Why I do not use dynamic programming

A standard subset sum DP usually needs an array of size `x + 1`.

Since:

`x <= 10^9`

allocating such an array is not practical.

The generated sequence gives us a much stronger property, allowing a greedy solution instead.

### 8. Integer types

The running sum can become larger than `10^9` while generating the sequence.

That is why C++ and Java should use `long long` and `long`.

JavaScript's `number` type safely handles the values needed here because the relevant calculations stay far below `2^53`.

Python integers automatically support large values.

## Examples

### Example 1

Input:

```text
arr = [1, 2, 4, 2]
s = 1
x = 7
```

Generated sequence:

`1, 2, 5, 12, 22`

Only values up to `7` are useful:

`1, 2, 5`

Greedy process:

`7 - 5 = 2`

`2 - 2 = 0`

Expected Output:

```text
true
```

The subset is `{2, 5}`.

### Example 2

Input:

```text
arr = [51, 88]
s = 100
x = 500
```

Generated sequence:

`100, 151, 339`

Greedy process:

* `339 <= 500`, take it
* Remaining = `161`
* `151 <= 161`, take it
* Remaining = `10`
* `100 > 10`, skip it

The remaining value is `10`, so the target cannot be formed.

Expected Output:

```text
false
```

### Example 3

Input:

```text
arr = [1]
s = 5
x = 0
```

The target is already `0`.

The empty subset has sum `0`.

Expected Output:

```text
true
```

## How to Use / Run Locally

The solution can be tested locally using any standard compiler or interpreter.

### C++

Save the solution in a file such as:

`solution.cpp`

Compile it using:

```bash
g++ -std=c++17 -O2 solution.cpp -o solution
```

Then run:

```bash
./solution
```

If you are using Windows with MinGW, run the generated executable from the terminal.

### Java

Save the solution in:

`Solution.java`

Compile it using:

```bash
javac Solution.java
```

Run it using:

```bash
java Solution
```

If you are using the GeeksforGeeks platform, the provided `Solution` class can be submitted directly according to the platform's expected function signature.

### JavaScript

Save the solution in:

`solution.js`

Run it using Node.js:

```bash
node solution.js
```

You can add your own input handling or test cases around the provided `Solution` class when testing locally.

### Python3

Save the solution in:

`solution.py`

Run it using:

```bash
python3 solution.py
```

Python does not require a separate compilation step.

## Notes & Optimizations

The most important optimization is stopping sequence generation as soon as the next value becomes greater than `x`.

There is no need to generate the complete sequence because every later value will be even larger.

I also avoid traditional subset sum dynamic programming. A DP solution based on the target value would require too much memory and time when `x` is as large as `10^9`.

The running sum is another important optimization. Instead of calculating the sum of all previous numbers every time, I maintain the sum in one variable and update it after generating each new number.

I use 64-bit integer types in C++ and Java because the running sum can become larger than the original input limits.

The sequence grows very quickly. Since every `arr[i]` is at least `1`, each new number is greater than the previous total. This is what reduces the number of useful generated values to roughly `O(log x)`.

The greedy subset sum works specifically because of this generated sequence property. A normal arbitrary sorted array would not allow the same greedy strategy.

This solution is useful for understanding how a special mathematical property can turn an otherwise expensive subset sum problem into an efficient greedy algorithm.

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)

# N-Digit Numbers with Increasing Digits

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

This problem asks me to generate all `n`-digit numbers whose digits are in strictly increasing order from left to right.

That means every next digit must be greater than the digit before it.

For example, `123` is valid, `1359` is valid, but `122`, `321`, and `143` are not.

The input is a single integer `n`.

The output is a list of all valid `n`-digit numbers in increasing order.

This is a classic competitive programming and DSA problem that is best solved with recursion and backtracking.

## Constraints

| Constraint                         | Meaning                                                                             |
| ---------------------------------- | ----------------------------------------------------------------------------------- |
| `1 <= n <= 10^5`                   | The input length can be large, but the digit system itself limits the valid answers |
| Digits are from `0` to `9`         | Only 10 total digits exist                                                          |
| Digits must be strictly increasing | Each next digit must be greater than the previous one                               |

## Intuition

My first thought was that I should not generate every possible number and then check it.

That would waste time.

I noticed something important: if the digits must be strictly increasing, then once I pick one digit, the next digit can only come from the larger digits after it.

So instead of building all numbers and filtering them later, I can build only the valid ones from the start.

That is why recursion fits this problem so well.

## Approach

I solve this using backtracking.

First, I check the impossible case. If `n > 10`, I return an empty list because there are only 10 digits total, and I cannot form a strictly increasing number with more than 10 digits.

If `n == 1`, I return all single-digit numbers from `0` to `9`, because every single digit is already valid.

For larger values of `n`, I start building numbers from the first digit.

I never start with `0` for multi-digit numbers because leading zero is not allowed.

At each step, I choose the next digit only from the digits greater than the last chosen digit.

This keeps every number valid automatically.

I stop when the current number reaches length `n`, and then I store it in the answer list.

Because I always move forward with larger digits, the final output is already in sorted order.

## Data Structures Used

| Data Structure  | Why I Used It                                   |
| --------------- | ----------------------------------------------- |
| Array/List      | To store the final valid numbers in order       |
| Recursion stack | To keep track of the current number being built |

I do not need any extra complex structure like a set, queue, or heap.

## Operations & Behavior Summary

1. Check whether `n` is too large to be possible.
2. Handle the special case for one-digit numbers.
3. Start recursion from each valid first digit.
4. At each recursive step, only choose digits larger than the previous digit.
5. Stop when the required length is reached.
6. Save the built number.
7. Return all collected numbers.

## Complexity

| Type             | Complexity   | Explanation                                                                                                                           |
| ---------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| Time Complexity  | `O(C(9, n))` | I generate only the valid increasing-digit numbers. The number of such combinations is bounded by choosing digits in increasing order |
| Space Complexity | `O(n)`       | I only use recursion depth proportional to `n`. No extra heavy data structure is needed                                               |

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    // Recursive function to build increasing numbers
    void solve(int lastDigit, int len, int n, int num, vector<int>& ans) {
        // If the required length is reached, store the number
        if (len == n) {
            ans.push_back(num);
            return;
        }

        // Try every digit greater than the previous digit
        for (int d = lastDigit + 1; d <= 9; d++) {
            // Append the current digit and continue recursion
            solve(d, len + 1, n, num * 10 + d, ans);
        }
    }

    vector<int> increasingNumbers(int n) {
        vector<int> ans;

        // More than 10 unique digits are impossible
        if (n > 10)
            return ans;

        // Every single digit is a valid answer
        if (n == 1) {
            for (int i = 0; i <= 9; i++)
                ans.push_back(i);
            return ans;
        }

        // Start every number with digits 1 to 9
        for (int d = 1; d <= 9; d++) {
            solve(d, 1, n, d, ans);
        }

        return ans;
    }
};
```

### Java

```java
class Solution {

    // Recursive function to generate increasing numbers
    static void solve(int lastDigit, int len, int n, int num, ArrayList<Integer> ans) {

        // Required length reached
        if (len == n) {
            ans.add(num);
            return;
        }

        // Choose every larger digit
        for (int d = lastDigit + 1; d <= 9; d++) {
            // Append digit and continue
            solve(d, len + 1, n, num * 10 + d, ans);
        }
    }

    public static ArrayList<Integer> increasingNumbers(int n) {

        ArrayList<Integer> ans = new ArrayList<>();

        // Impossible to have more than 10 unique digits
        if (n > 10)
            return ans;

        // All single digits are valid
        if (n == 1) {
            for (int i = 0; i <= 9; i++)
                ans.add(i);
            return ans;
        }

        // Start recursion from digits 1 to 9
        for (int d = 1; d <= 9; d++) {
            solve(d, 1, n, d, ans);
        }

        return ans;
    }
}
```

### JavaScript

```javascript
/**
 * @param {number} n
 * @returns {number[]}
 */
class Solution {

    // Recursive helper function
    solve(lastDigit, len, n, num, ans) {

        // If required length is formed, save the number
        if (len === n) {
            ans.push(num);
            return;
        }

        // Pick every larger digit
        for (let d = lastDigit + 1; d <= 9; d++) {
            // Append digit and continue recursion
            this.solve(d, len + 1, n, num * 10 + d, ans);
        }
    }

    increasingNumbers(n) {

        const ans = [];

        // Impossible case
        if (n > 10)
            return ans;

        // Every single digit is valid
        if (n === 1) {
            for (let i = 0; i <= 9; i++)
                ans.push(i);
            return ans;
        }

        // Start from every possible first digit
        for (let d = 1; d <= 9; d++) {
            this.solve(d, 1, n, d, ans);
        }

        return ans;
    }
}
```

### Python3

```python
class Solution:

    # Recursive helper function
    def solve(self, last_digit, length, n, num, ans):

        # Required length reached
        if length == n:
            ans.append(num)
            return

        # Choose every larger digit
        for digit in range(last_digit + 1, 10):
            # Append the digit and continue recursion
            self.solve(digit, length + 1, n, num * 10 + digit, ans)

    def increasingNumbers(self, n):

        ans = []

        # More than 10 unique digits are impossible
        if n > 10:
            return ans

        # Every single digit is valid
        if n == 1:
            return [i for i in range(10)]

        # Start recursion with first digit from 1 to 9
        for digit in range(1, 10):
            self.solve(digit, 1, n, digit, ans)

        return ans
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is the same in all four languages.

I first handle the edge cases.

If `n > 10`, I return nothing because there are not enough digits to build a strictly increasing number of that length.

If `n == 1`, I return all digits from `0` to `9`.

After that, I begin recursion from each possible first digit from `1` to `9`.

I do not start from `0` because a multi-digit number cannot have a leading zero.

The recursive function keeps four things in mind:

* the last digit I used,
* the current length of the number,
* the current number itself,
* the answer list.

Whenever the current length becomes equal to `n`, I add the number to the result list.

Otherwise, I try all digits greater than the last digit.

That is the key rule that keeps the number strictly increasing.

For example, if I have built `24`, then the next digit can only be `5` to `9`.

If I had allowed smaller or equal digits, then I would create invalid numbers and need extra checks later.

By forcing the order during generation, I save time and keep the code clean.

This same reasoning applies in C++, Java, JavaScript, and Python3.

The only difference between the languages is syntax.

The algorithmic idea stays the same.

## Examples

### Example 1

**Input:** `n = 1`
**Output:** `[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]`

**Trace:**
Every one-digit number is valid because there is no second digit to break the increasing order.

### Example 2

**Input:** `n = 2`
**Output:** `[12, 13, 14, 15, 16, 17, 18, 19, 23, 24, ..., 89]`

**Trace:**
I start from `1`, then choose only larger digits like `2`, `3`, `4`, and so on.
Then I move to `2`, `3`, and continue the same pattern.

### Example 3

**Input:** `n = 15`
**Output:** `[]`

**Trace:**
This is impossible because there are only 10 digits in total.
A strictly increasing number of length 15 cannot exist.

## How to Use / Run Locally

### C++

Save the file as `solution.cpp`, then compile and run:

```bash
g++ -std=c++17 solution.cpp -o solution
./solution
```

### Java

Save the file as `Main.java`, then compile and run:

```bash
javac Main.java
java Main
```

### JavaScript

Save the file as `solution.js`, then run:

```bash
node solution.js
```

### Python3

Save the file as `solution.py`, then run:

```bash
python3 solution.py
```

## Notes & Optimizations

The strongest optimization here is not to generate invalid numbers at all.

That is why recursion is better than brute force.

Another useful point is that the answer is naturally sorted if I always choose digits in increasing order.

So I do not need a separate sorting step at the end.

A small but important edge case is `n == 1`.

Many people forget that `0` is valid there.

For `n > 1`, I must avoid leading zero.

This problem also connects nicely with combinatorics, because every valid number is really a combination of digits chosen in sorted order.

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)

# Values with Equal Array Remainders

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

The problem asks us to find how many positive integers `k` make every element of an array leave the same remainder when divided by `k`.

For example, consider:

```text
arr = [38, 6, 34]
```

For `k = 1`:

```text
38 % 1 = 0
6  % 1 = 0
34 % 1 = 0
```

All remainders are equal.

For `k = 2`:

```text
38 % 2 = 0
6  % 2 = 0
34 % 2 = 0
```

Again, all remainders are equal.

For `k = 4`:

```text
38 % 4 = 2
6  % 4 = 2
34 % 4 = 2
```

So `k = 1, 2, 4` are valid, giving an answer of `3`.

There is one special case. If all array elements are equal, every positive integer `k` produces the same remainder for every element. Since there are infinitely many such values of `k`, we return `-1`.

This problem can be solved efficiently using the GCD of the differences between array elements.

## Constraints

| Constraint     | Value                     |
| -------------- | ------------------------- |
| Array size     | `1 <= arr.size() <= 10^5` |
| Array elements | `1 <= arr[i] <= 10^5`     |

## Intuition

I started by thinking about what it means for two numbers to have the same remainder.

If two numbers `a` and `b` have the same remainder when divided by `k`, their difference must be divisible by `k`.

For example:

```text
38 - 6 = 32
38 - 34 = 4
```

So any valid `k` must divide both `32` and `4`.

Instead of checking every pair of elements, I can use the first element as a reference and calculate the differences:

```text
arr[0] - arr[1]
arr[0] - arr[2]
arr[0] - arr[3]
...
```

Then I find the GCD of all these differences.

For:

```text
arr = [38, 6, 34]
```

I get:

```text
|38 - 6|  = 32
|38 - 34| = 4

gcd(32, 4) = 4
```

Now the valid values of `k` are exactly the positive divisors of `4`:

```text
1, 2, 4
```

So the answer is `3`.

If the GCD is `0`, it means every difference is `0`, which means all elements are equal. In that case, there are infinitely many valid values of `k`, so I return `-1`.

## Approach

I solve the problem in two main parts.

First, I find the GCD of all absolute differences from the first array element.

For example:

```text
arr = [38, 6, 34]

Reference = 38

38 - 6  = 32
38 - 34 = 4

GCD = gcd(32, 4)
    = 4
```

Second, I count the positive divisors of this GCD.

I do not check every number from `1` to `g`. Instead, I only check up to `sqrt(g)` because divisors come in pairs.

For `g = 4`:

```text
1 × 4
2 × 2
```

This gives the divisors:

```text
1, 2, 4
```

Therefore, the answer is `3`.

The complete flow is:

```text
Array
  |
  v
Calculate differences from arr[0]
  |
  v
Find GCD of all differences
  |
  +---- GCD = 0 ----> Return -1
  |
  v
Count positive divisors of GCD
  |
  v
Return divisor count
```

## Data Structures Used

No extra data structure is required.

I only use:

* Integer variables to store the current GCD, difference, divisor count, and loop variables.
* The input array itself.

This keeps the auxiliary space constant.

## Operations & Behavior Summary

The algorithm works as follows:

1. Start the GCD with `0`.
2. Take the first array element as the reference.
3. For every remaining element, calculate its absolute difference from the first element.
4. Update the GCD using the current difference.
5. If the final GCD is `0`, return `-1` because all elements are equal.
6. Otherwise, check every integer from `1` through `sqrt(GCD)`.
7. Whenever the integer divides the GCD, count it and its paired divisor.
8. Avoid counting the same divisor twice when the two divisors are equal.
9. Return the total number of divisors.

## Complexity

| Type             | Complexity       | Explanation                                                  |
| ---------------- | ---------------- | ------------------------------------------------------------ |
| Time Complexity  | `O(n + sqrt(g))` | `n` is the array size and `g` is the GCD of all differences. |
| Space Complexity | `O(1)`           | No extra data structure is used apart from a few variables.  |

The GCD calculation takes `O(n)` array iterations. Counting divisors takes `O(sqrt(g))`.

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    // I use Euclid's algorithm to find the GCD of two numbers.
    int gcd(int a, int b) {
        // I keep reducing the larger value using the remainder.
        while (b != 0) {
            // The remainder becomes the next value of b.
            int temp = a % b;
            
            // I move b into a for the next GCD step.
            a = b;
            
            // I store the remainder in b.
            b = temp;
        }
        
        // When b becomes 0, a is the GCD.
        return a;
    }

    int sameMod(vector<int> &arr) {
        // I start with 0 because gcd(0, x) is x.
        int g = 0;

        // I compare every element with the first element.
        // Only these differences are needed to find the common divisor.
        for (int i = 1; i < arr.size(); i++) {
            // I calculate the absolute difference because only divisibility matters.
            int diff = abs(arr[i] - arr[0]);

            // I update the GCD with the current difference.
            g = gcd(g, diff);
        }

        // If the GCD is 0, every element is equal.
        // Then every positive k works, so there are infinitely many answers.
        if (g == 0) {
            return -1;
        }

        // I will store the number of positive divisors of g.
        int ans = 0;

        // Divisors come in pairs, so I only need to check up to sqrt(g).
        for (int i = 1; 1LL * i * i <= g; i++) {
            // If i divides g, both i and g/i are divisors.
            if (g % i == 0) {
                // I count i as one divisor.
                ans++;

                // If the two divisors are different, I count g/i separately.
                if (i != g / i) {
                    ans++;
                }
            }
        }

        // I return the total number of valid positive values of k.
        return ans;
    }
};
```

### Java

```java
class Solution {
    // I use Euclid's algorithm to calculate the GCD of two numbers.
    private int gcd(int a, int b) {
        // I keep replacing the pair with (b, a % b).
        while (b != 0) {
            // I save the remainder for the next step.
            int temp = a % b;

            // I move b into a.
            a = b;

            // I move the remainder into b.
            b = temp;
        }

        // When b becomes 0, a is the GCD.
        return a;
    }

    public int sameMod(int[] arr) {
        // I start with 0 because gcd(0, x) is x.
        int g = 0;

        // I compare every element with the first element.
        for (int i = 1; i < arr.length; i++) {
            // I calculate the absolute difference because only divisibility matters.
            int diff = Math.abs(arr[i] - arr[0]);

            // I update the GCD using this difference.
            g = gcd(g, diff);
        }

        // If g is 0, all elements are equal.
        // Every positive k then gives the same remainder.
        if (g == 0) {
            return -1;
        }

        // I will count the positive divisors of g.
        int ans = 0;

        // I only check up to sqrt(g) because divisors occur in pairs.
        for (int i = 1; (long) i * i <= g; i++) {
            // If i divides g, then i and g/i are both divisors.
            if (g % i == 0) {
                // I count i.
                ans++;

                // I count the paired divisor only when it is different from i.
                if (i != g / i) {
                    ans++;
                }
            }
        }

        // I return the number of valid values of k.
        return ans;
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
    // I use Euclid's algorithm to calculate the GCD of two numbers.
    gcd(a, b) {
        // I repeatedly replace the pair with (b, a % b).
        while (b !== 0) {
            // I save the remainder before updating the values.
            const temp = a % b;

            // I move b into a.
            a = b;

            // I move the remainder into b.
            b = temp;
        }

        // When b becomes 0, a is the GCD.
        return a;
    }

    sameMod(arr) {
        // I start with 0 because gcd(0, x) is x.
        let g = 0;

        // I compare every element with the first element.
        for (let i = 1; i < arr.length; i++) {
            // I calculate the absolute difference because only divisibility matters.
            const diff = Math.abs(arr[i] - arr[0]);

            // I update the GCD using the current difference.
            g = this.gcd(g, diff);
        }

        // If g is 0, all elements are equal.
        // Therefore, every positive k is valid and the answer is infinite.
        if (g === 0) {
            return -1;
        }

        // I will count all positive divisors of g.
        let ans = 0;

        // I only check up to sqrt(g) because divisors occur in pairs.
        for (let i = 1; i * i <= g; i++) {
            // If i divides g, then i and g/i are both divisors.
            if (g % i === 0) {
                // I count i.
                ans++;

                // I count the paired divisor only if it is different.
                if (i !== g / i) {
                    ans++;
                }
            }
        }

        // I return the total number of valid k values.
        return ans;
    }
}
```

### Python3

```python
class Solution:
    def gcd(self, a, b):
        # I use Euclid's algorithm to calculate the GCD.
        while b != 0:
            # The remainder becomes the next value of b.
            a, b = b, a % b

        # When b becomes 0, a is the GCD.
        return a

    def sameMod(self, arr):
        # I start with 0 because gcd(0, x) is x.
        g = 0

        # I compare every element with the first element.
        for i in range(1, len(arr)):
            # I calculate the absolute difference because only divisibility matters.
            diff = abs(arr[i] - arr[0])

            # I update the GCD using the current difference.
            g = self.gcd(g, diff)

        # If g is 0, all elements are equal.
        # Every positive k then produces the same remainder.
        if g == 0:
            return -1

        # I will count the positive divisors of g.
        ans = 0

        # I only check up to sqrt(g) because divisors occur in pairs.
        i = 1
        while i * i <= g:
            # If i divides g, then i and g/i are both divisors.
            if g % i == 0:
                # I count i.
                ans += 1

                # I count g/i separately if it is a different divisor.
                if i != g // i:
                    ans += 1

            # I move to the next possible divisor.
            i += 1

        # I return the total number of valid k values.
        return ans
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The main logic is the same in all four languages. Only the syntax for loops, functions, and integer operations changes.

### 1. Finding the GCD of differences

I start with a GCD value of `0`.

This is useful because:

```text
gcd(0, x) = x
```

So I can process the differences one by one without needing a special case for the first difference.

For every element after the first one, I calculate:

```text
difference = |arr[i] - arr[0]|
```

Then I update:

```text
g = gcd(g, difference)
```

For example:

```text
arr = [20, 8, 14]

|20 - 8|  = 12
|20 - 14| = 6

gcd(12, 6) = 6
```

So every valid `k` must be a divisor of `6`.

### 2. Why the GCD works

Suppose all elements leave the same remainder when divided by `k`.

For any two elements:

```text
arr[i] % k = arr[0] % k
```

Therefore:

```text
(arr[i] - arr[0]) % k = 0
```

So `k` divides every difference.

If `k` divides every difference, it must also divide their GCD.

Therefore, every possible `k` is a positive divisor of the GCD.

This converts the original remainder problem into a simple divisor-counting problem.

### 3. Handling equal elements

If all elements are equal, every difference becomes zero.

For example:

```text
arr = [5, 5, 5]

|5 - 5| = 0
|5 - 5| = 0
```

So:

```text
g = gcd(0, 0)
  = 0
```

Every positive integer `k` works because all elements are identical.

Since there are infinitely many positive integers, the required answer is:

```text
-1
```

### 4. Counting divisors efficiently

Once I have a non-zero GCD, I need to count its positive divisors.

A direct approach would check:

```text
1, 2, 3, ..., g
```

But this can take too much time when `g` is large.

Instead, I use the fact that divisors come in pairs.

For example, if:

```text
g = 24
```

the divisor pairs are:

```text
1 × 24
2 × 12
3 × 8
4 × 6
```

Once I reach `sqrt(24)`, I have already found every pair.

So I only need to check values where:

```text
i * i <= g
```

Whenever:

```text
g % i == 0
```

I count:

```text
i
g / i
```

There is one exception.

For a perfect square such as `36`:

```text
6 × 6 = 36
```

Both values are the same, so I count `6` only once.

### 5. C++ behavior

In C++, I use `vector<int>` for the input array and integer variables for the calculation.

The GCD can be calculated with Euclid's algorithm.

For divisor counting, I use a loop up to the square root of the GCD. I use a wider integer type for the multiplication in the loop condition so that `i * i` does not overflow.

### 6. Java behavior

In Java, the input is an `int[]`.

The same GCD logic is used with a private helper method.

For the divisor loop, I use `long` in the multiplication used for the square-root boundary. This keeps the calculation safe while the actual GCD remains an integer.

### 7. JavaScript behavior

In JavaScript, the array contains regular JavaScript numbers.

I use the same Euclidean GCD algorithm and the same divisor-pair technique.

The given constraints keep the values well within JavaScript's safe integer range, so regular `Number` arithmetic is sufficient.

### 8. Python3 behavior

Python's integer arithmetic handles the given constraints directly.

I calculate the GCD with Euclid's algorithm and use a `while` loop to check divisors up to the square root of the GCD.

No list, set, dictionary, or other extra structure is needed.

## Examples

### Example 1

Input:

```text
arr = [38, 6, 34]
```

Differences from the first element:

```text
|38 - 6|  = 32
|38 - 34| = 4
```

GCD:

```text
gcd(32, 4) = 4
```

Divisors:

```text
1, 2, 4
```

Output:

```text
3
```

### Example 2

Input:

```text
arr = [3, 2]
```

Difference:

```text
|3 - 2| = 1
```

GCD:

```text
g = 1
```

The only positive divisor is:

```text
1
```

Output:

```text
1
```

### Example 3

Input:

```text
arr = [5, 5, 5]
```

All differences are zero:

```text
|5 - 5| = 0
|5 - 5| = 0
```

Therefore:

```text
g = 0
```

All elements are equal, so every positive integer `k` is valid.

Output:

```text
-1
```

## How to Use / Run Locally

The provided snippets contain the `Solution` class and method expected by the GeeksforGeeks problem. To test them locally, I can place the class inside a small driver program and provide an input array.

### C++

Save the solution as `solution.cpp`.

Compile it using:

```bash
g++ -std=c++17 solution.cpp -o solution
```

Then run:

```bash
./solution
```

### Java

Save the solution as `Solution.java`.

Compile it using:

```bash
javac Solution.java
```

Then run:

```bash
java Solution
```

### JavaScript

Save the solution as `solution.js`.

Run it using Node.js:

```bash
node solution.js
```

### Python3

Save the solution as `solution.py`.

Run it using:

```bash
python3 solution.py
```

For local testing, I can add a small input section and call `sameMod()` with test arrays such as `[38, 6, 34]`, `[3, 2]`, and `[5, 5, 5]`.

## Notes & Optimizations

The key optimization is using the GCD of the differences instead of checking every possible `k`.

A brute-force approach could try many values of `k` and check every array element. That can become expensive because the array can contain up to `10^5` elements.

The GCD approach reduces the problem to:

```text
Find GCD of differences
        +
Count divisors of GCD
```

Important edge cases:

* If the array contains only one element, there are infinitely many valid positive values of `k`, so the GCD remains `0` and the answer is `-1`.
* If all elements are equal, the GCD is `0`, so the answer is `-1`.
* If the GCD is `1`, only `k = 1` works, so the answer is `1`.
* If the GCD is a perfect square, its square-root divisor must be counted only once.

The solution uses `O(1)` extra space and avoids storing the differences in another array. This makes it suitable for the given competitive programming constraints.

## Author

[Md Aarzoo Islam] [Instagram](https://www.instagram.com/codewithaarzoo.in/?utm_source=chatgpt.com)

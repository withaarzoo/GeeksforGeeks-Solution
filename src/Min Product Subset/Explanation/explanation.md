# Min Product Subset

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

The problem gives me an integer array `arr`. I need to find the minimum product that can be obtained by choosing any non-empty subset of the array and multiplying all elements in that subset.

The subset does not have to contain every element. I can choose one element, several elements, or all elements, as long as the subset is non-empty.

For example, for `arr = [1, 2, 3]`, choosing `[1]` gives a product of `1`, which is the minimum possible product.

For `arr = [4, -2, 5]`, choosing all three elements gives:

`4 × (-2) × 5 = -40`

Since a negative number is smaller than every positive number and zero, `-40` is the minimum product.

The main challenge is to find this minimum product efficiently without generating all possible subsets.

## Constraints

* `1 <= arr.size() <= 10`
* `-10 <= arr[i] <= 10`
* The subset must contain at least one element.
* The expected time complexity is `O(n)`.
* The expected auxiliary space complexity is `O(1)`.

## Intuition

My first thought was that checking every possible subset would work, but that would be unnecessary because the number of subsets grows very quickly.

I instead looked at how the sign of a product changes.

If I have at least one negative number, I want the final product to be negative because every negative value is smaller than zero and every positive value.

A product becomes negative when I multiply an odd number of negative values.

So, if the array contains an odd number of negative elements, I can include all non-zero elements. The product will remain negative.

If the number of negative elements is even, using all of them produces a positive product. In that case, I remove the negative number with the smallest absolute value. This changes the number of selected negative values from even to odd while keeping the product as small as possible.

If there are no negative numbers, I cannot create a negative product. Then zero is better than every positive number if zero exists. Otherwise, the smallest positive number is the answer.

This observation lets me solve the problem with one pass through the array.

## Approach

I scan the array once and keep track of a few values.

1. I count the number of negative elements.
2. I check whether the array contains zero.
3. I multiply all non-zero elements into a running product.
4. For negative elements, I find the one with the smallest absolute value.
5. For positive elements, I keep the smallest positive value.
6. If there are no negative elements:

   * I return `0` if zero exists.
   * Otherwise, I return the smallest positive number.
7. If the number of negative elements is even, I remove the negative element with the smallest absolute value from the product.
8. I return the resulting product.

The important part is that I never generate subsets. I only use the sign of the product and a few values collected during the scan.

## Data Structures Used

No extra data structure is required.

I only use a few variables:

* `negativeCount` to count negative elements.
* `hasZero` to remember whether zero exists.
* `product` to store the product of non-zero elements.
* `smallestAbsNegative` to find which negative number should be removed when the negative count is even.
* `smallestPositive` to handle arrays containing only positive numbers and zero.

Because I do not store another copy of the array or generate subsets, the auxiliary space remains `O(1)`.

## Operations & Behavior Summary

The algorithm can be viewed as this plain-English pseudocode:

1. Start with a product of `1`.
2. Scan every element.
3. If the element is zero, remember that zero exists.
4. If the element is negative:

   * Increase the negative count.
   * Update the smallest absolute negative value.
   * Multiply it into the product.
5. If the element is positive:

   * Update the smallest positive value.
   * Multiply it into the product.
6. After scanning:

   * If there are no negative elements and zero exists, return `0`.
   * If there are no negative elements and zero does not exist, return the smallest positive value.
   * If the negative count is even, remove the negative value with the smallest absolute value from the product.
   * Otherwise, keep the product unchanged.
7. Return the final product.

## Complexity

| Complexity       | Cost   | Explanation                                                                        |
| ---------------- | ------ | ---------------------------------------------------------------------------------- |
| Time Complexity  | `O(n)` | I scan the array once, where `n` is the number of elements in `arr`.               |
| Space Complexity | `O(1)` | I only use a fixed number of variables and do not create any extra data structure. |

This is better than a brute-force subset approach, which would require checking up to `2^n - 1` non-empty subsets.

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int minProd(vector<int>& arr) {
        int negativeCount = 0;          // Stores how many negative elements I have.
        int smallestPositive = INT_MAX; // Stores the smallest positive element.
        int smallestAbsNegative = INT_MAX; // Stores the smallest absolute negative value.
        long long product = 1;          // Stores the product of all non-zero elements.
        bool hasZero = false;           // Tells me whether the array contains zero.

        for (int x : arr) {
            if (x == 0) {
                hasZero = true;         // Zero can be the answer when no negative exists.
                continue;               // Zero is not included in a negative product.
            }

            product *= x;               // I initially multiply every non-zero element.

            if (x < 0) {
                negativeCount++;        // Count this negative element.
                smallestAbsNegative = min(
                    smallestAbsNegative, -x
                );                      // Find the negative with the smallest absolute value.
            } else {
                smallestPositive = min(
                    smallestPositive, x
                );                      // Track the smallest positive value.
            }
        }

        if (negativeCount == 0) {
            if (hasZero) {
                return 0;               // With no negative, zero is smaller than all positives.
            }

            return smallestPositive;   // Only positive values exist, so the smallest one is best.
        }

        if (negativeCount % 2 == 0) {
            product /= -smallestAbsNegative;
            // An even number of negatives gives a positive product.
            // I remove the negative with the smallest absolute value to leave an odd count.
        }

        return (int)product;            // The resulting product is the minimum possible product.
    }
};
```

### Java

```java
class Solution {
    public int minProd(int[] arr) {
        int negativeCount = 0;          // Stores how many negative elements I have.
        int smallestPositive = Integer.MAX_VALUE; // Stores the smallest positive element.
        int smallestAbsNegative = Integer.MAX_VALUE; // Stores the smallest absolute negative value.
        long product = 1;               // Stores the product of all non-zero elements.
        boolean hasZero = false;        // Tells me whether the array contains zero.

        for (int x : arr) {
            if (x == 0) {
                hasZero = true;         // Zero can be the answer when no negative exists.
                continue;               // Zero is not included in a negative product.
            }

            product *= x;               // I initially multiply every non-zero element.

            if (x < 0) {
                negativeCount++;        // Count this negative element.
                smallestAbsNegative = Math.min(
                    smallestAbsNegative, -x
                );                      // Find the negative with the smallest absolute value.
            } else {
                smallestPositive = Math.min(
                    smallestPositive, x
                );                      // Track the smallest positive value.
            }
        }

        if (negativeCount == 0) {
            if (hasZero) {
                return 0;               // With no negative, zero is smaller than all positives.
            }

            return smallestPositive;   // Only positive values exist, so the smallest one is best.
        }

        if (negativeCount % 2 == 0) {
            product /= -smallestAbsNegative;
            // An even number of negatives gives a positive product.
            // I remove the negative with the smallest absolute value to leave an odd count.
        }

        return (int) product;           // The resulting product is the minimum possible product.
    }
}
```

### JavaScript

```javascript
class Solution {
    minProd(arr) {
        let negativeCount = 0;          // Stores how many negative elements I have.
        let smallestPositive = Infinity; // Stores the smallest positive element.
        let smallestAbsNegative = Infinity; // Stores the smallest absolute negative value.
        let product = 1;                // Stores the product of all non-zero elements.
        let hasZero = false;            // Tells me whether the array contains zero.

        for (const x of arr) {
            if (x === 0) {
                hasZero = true;         // Zero can be the answer when no negative exists.
                continue;               // Zero is not included in a negative product.
            }

            product *= x;               // I initially multiply every non-zero element.

            if (x < 0) {
                negativeCount++;        // Count this negative element.
                smallestAbsNegative = Math.min(
                    smallestAbsNegative, -x
                );                      // Find the negative with the smallest absolute value.
            } else {
                smallestPositive = Math.min(
                    smallestPositive, x
                );                      // Track the smallest positive value.
            }
        }

        if (negativeCount === 0) {
            if (hasZero) {
                return 0;               // With no negative, zero is smaller than all positives.
            }

            return smallestPositive;   // Only positive values exist, so the smallest one is best.
        }

        if (negativeCount % 2 === 0) {
            product /= -smallestAbsNegative;
            // An even number of negatives gives a positive product.
            // I remove the negative with the smallest absolute value to leave an odd count.
        }

        return product;                 // The resulting product is the minimum possible product.
    }
};
```

### Python3

```python
class Solution:
    def minProd(self, arr):
        negative_count = 0              # Stores how many negative elements I have.
        smallest_positive = float('inf') # Stores the smallest positive element.
        smallest_abs_negative = float('inf') # Stores the smallest absolute negative value.
        product = 1                     # Stores the product of all non-zero elements.
        has_zero = False                # Tells me whether the array contains zero.

        for x in arr:
            if x == 0:
                has_zero = True         # Zero can be the answer when no negative exists.
                continue                # Zero is not included in a negative product.

            product *= x                 # I initially multiply every non-zero element.

            if x < 0:
                negative_count += 1     # Count this negative element.
                smallest_abs_negative = min(
                    smallest_abs_negative, -x
                )                       # Find the negative with the smallest absolute value.
            else:
                smallest_positive = min(
                    smallest_positive, x
                )                       # Track the smallest positive value.

        if negative_count == 0:
            if has_zero:
                return 0                # With no negative, zero is smaller than all positives.

            return smallest_positive    # Only positive values exist, so the smallest one is best.

        if negative_count % 2 == 0:
            product //= -smallest_abs_negative
            # An even number of negatives gives a positive product.
            # I remove the negative with the smallest absolute value to leave an odd count.

        return product                   # The resulting product is the minimum possible product.
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The core logic is the same in all four languages. Only the syntax and basic language features are different.

### 1. Counting negative numbers

I keep a counter for negative values.

The reason is simple: the sign of a product depends on whether the number of negative factors is odd or even.

For example:

* One negative → negative product.
* Two negatives → positive product.
* Three negatives → negative product.
* Four negatives → positive product.

So the negative count tells me whether I should use all negative values or remove one.

### 2. Handling zero

Zero needs special attention because multiplying anything by zero produces zero.

However, if the array contains a negative value, I do not want zero because a negative product is always smaller.

For example:

`[-5, 0, 4]`

I can select `[-5]` and get `-5`, which is smaller than `0`.

Therefore, zero only becomes the answer when there are no negative numbers.

### 3. Multiplying all non-zero elements

I initially multiply every non-zero element.

If the number of negative values is odd, this product already has the negative sign I want.

For example:

`[-2, 3, 4]`

The product is:

`-2 × 3 × 4 = -24`

Since `-24` is smaller than any product made only from positive values, including the positive elements is useful.

### 4. Finding the smallest absolute negative

Suppose the array contains an even number of negative elements:

`[-2, -5, 3]`

Using all non-zero elements gives:

`(-2) × (-5) × 3 = 30`

The result is positive because there are two negative values.

I need to remove one negative value.

If I remove `-2`, the result is:

`-5 × 3 = -15`

If I remove `-5`, the result is:

`-2 × 3 = -6`

`-15` is smaller, so I should remove `-2`.

This means I should always remove the negative number with the smallest absolute value.

### 5. When there are no negative values

If every element is positive, multiplying multiple elements only makes the product larger.

For example:

`[2, 4, 6]`

The possible positive single-element products are `2`, `4`, and `6`.

The smallest is `2`.

If zero also exists:

`[0, 2, 4]`

I can choose `[0]`, so the answer is `0`.

### 6. Why I do not generate subsets

A brute-force solution could generate every non-empty subset and calculate its product.

For an array of `n` elements, there can be `2^n - 1` non-empty subsets.

That approach is unnecessary here because I can determine the optimal subset directly from:

* the number of negative values,
* the presence of zero,
* the smallest absolute negative value,
* and the smallest positive value.

So one linear scan is enough.

### 7. C++ behavior

In C++, I use integer variables for the counters and values. I use a wider integer type for the intermediate product so that multiplication has more range than a standard `int`.

The final answer is returned in the type expected by the GeeksforGeeks function signature.

### 8. Java behavior

In Java, the same logic is implemented with `int` for array values and counters and `long` for the intermediate product.

`Integer.MAX_VALUE` is useful for initializing the minimum-value trackers because the first actual array value will be smaller.

### 9. JavaScript behavior

In JavaScript, the values are handled using the standard `Number` type.

The algorithm still performs the same constant-space, single-pass logic. The given constraints are small, so normal JavaScript numeric operations are sufficient for this problem.

### 10. Python3 behavior

Python integers can automatically grow when necessary, so there is no separate integer type needed for the product.

I use `float('inf')` to initialize the minimum-value trackers and update them while scanning the array.

## Examples

### Example 1

Input:

`arr = [1, 2, 3]`

There are no negative values and no zero.

The smallest positive value is `1`.

Expected output:

`1`

The best subset is `[1]`.

### Example 2

Input:

`arr = [4, -2, 5]`

There is one negative value, so the product can be negative.

I use all non-zero elements:

`4 × (-2) × 5 = -40`

Expected output:

`-40`

The best subset is `[4, -2, 5]`.

### Example 3

Input:

`arr = [-2, -3, 4]`

There are two negative values, so using both would make the product positive:

`(-2) × (-3) × 4 = 24`

I remove `-2` because it has the smallest absolute value.

The remaining subset is:

`[-3, 4]`

Its product is:

`-3 × 4 = -12`

Expected output:

`-12`

## How to Use / Run Locally

The GeeksforGeeks version provides a class and method that the platform calls automatically. If I want to run the solution locally, I can add a small driver program that creates an array and calls the solution method.

### C++

1. Create a C++ source file such as `solution.cpp`.
2. Add the `Solution` class and `minProd` method.
3. Add a `main()` function for local testing.
4. Compile it with a C++ compiler.
5. Run the generated executable.

A typical compile command is:

`g++ -std=c++17 solution.cpp -o solution`

Then run:

`./solution`

### Java

1. Create a file named `Solution.java`.
2. Add the `Solution` class and `minProd` method.
3. Add a `main()` method for local testing.
4. Compile the file.
5. Run the compiled class.

Compile:

`javac Solution.java`

Run:

`java Solution`

### JavaScript

1. Create a file such as `solution.js`.
2. Add the `Solution` class and `minProd` method.
3. Create an object from the class.
4. Call `minProd()` with a test array.
5. Run the file using Node.js.

Run:

`node solution.js`

### Python3

1. Create a file such as `solution.py`.
2. Add the `Solution` class and `minProd` method.
3. Create an object from the class.
4. Call the method with a test array.
5. Run the file with Python 3.

Run:

`python3 solution.py`

The exact GeeksforGeeks submission does not need a custom driver because the platform provides the input handling and calls the required method.

## Notes & Optimizations

The biggest optimization is avoiding subset generation.

A brute-force approach checks every possible subset, which can take `O(2^n)` time. The optimized solution needs only `O(n)` time.

A few edge cases are especially important:

* A single positive number returns that number.
* A single negative number returns that negative number.
* A single zero returns `0`.
* An array containing negative numbers and zero should prefer a negative product.
* An even number of negative values requires removing one negative value.
* When removing a negative value, I remove the one with the smallest absolute value.
* If there are no negative values, I choose zero if available; otherwise, I choose the smallest positive value.

The solution does not need sorting. Sorting would increase the time complexity to `O(n log n)` without providing any real benefit.

It also does not need dynamic programming, recursion, backtracking, or any extra array.

This makes the single-pass `O(n)` time and `O(1)` auxiliary space approach the most suitable solution for this problem.

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)

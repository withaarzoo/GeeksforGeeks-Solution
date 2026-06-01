# Max Product Subset | GeeksforGeeks Solution | DSA Problem Explained

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

The **Max Product Subset** problem asks us to find the maximum possible product that can be formed using any subset of elements from a given array.

A subset can contain one element, multiple elements, or even almost the entire array. The goal is to choose elements in a way that produces the largest possible product.

Since the answer can become very large, the final result is returned modulo **10⁹ + 7**.

This is a popular array and greedy algorithm problem that tests understanding of positive numbers, negative numbers, zeros, and product optimization.

## Constraints

| Constraint          | Value             |
| ------------------- | ----------------- |
| Array Size          | 1 ≤ n ≤ 2 × 10⁴   |
| Element Value       | -10 ≤ arr[i] ≤ 10 |
| Expected Complexity | O(n)              |

## Intuition

When I first looked at the problem, I noticed that positive numbers always help increase the product.

Negative numbers are interesting because two negative numbers create a positive product. That means negative numbers can actually be useful when they appear in pairs.

Zeros are mostly ignored because multiplying by zero destroys the product.

The key observation is that if the number of negative values is odd, one negative number must be removed. To maximize the final product, I should remove the negative number that is closest to zero because it causes the smallest loss.

Once this observation becomes clear, the problem turns into a simple greedy solution.

## Approach

1. Count positive numbers, negative numbers, and zeros.
2. Multiply all non-zero values into the product.
3. Track the negative number closest to zero.
4. Handle special edge cases:

   * Array contains only zeros.
   * Array contains a single negative number and remaining values are zeros.
   * Array contains only one element.
5. If the count of negative numbers is odd:

   * Remove the negative number closest to zero from the product.
6. Return the final answer modulo 10⁹ + 7.

This approach guarantees the maximum possible subset product.

## Data Structures Used

| Data Structure           | Purpose                                         |
| ------------------------ | ----------------------------------------------- |
| Integer Variables        | Store counts of positives, negatives, and zeros |
| Running Product Variable | Maintain subset product                         |
| Temporary Variables      | Track the negative number closest to zero       |

No additional arrays, hash maps, stacks, queues, or trees are required.

## Operations & Behavior Summary

The algorithm performs the following operations:

1. Scan the array once.
2. Count negatives and zeros.
3. Build the product using non-zero elements.
4. Remember the negative value with the smallest absolute value.
5. Check edge cases.
6. If negatives are odd, remove one negative.
7. Return the maximum product.

The entire solution works in a single traversal of the array.

## Complexity

| Metric           | Complexity | Explanation                             |
| ---------------- | ---------- | --------------------------------------- |
| Time Complexity  | O(n)       | Every element is processed exactly once |
| Space Complexity | O(1)       | Only a few variables are used           |

## Multi-language Solutions

### C++

```cpp
class Solution {
    static const long long MOD = 1000000007LL;

    // I use fast power to find modular inverse under MOD.
    long long modPow(long long base, long long exp) {
        long long result = 1;
        base %= MOD;

        while (exp > 0) {
            if (exp & 1) {
                result = (result * base) % MOD;
            }
            base = (base * base) % MOD;
            exp >>= 1;
        }
        return result;
    }

  public:
    int findMaxProduct(vector<int>& arr) {
        int n = (int)arr.size();

        // If there is only one number, I return it directly.
        // This keeps the answer correct for cases like [-1].
        if (n == 1) {
            return arr[0];
        }

        int zeroCount = 0;
        int positiveCount = 0;
        int negativeCount = 0;

        // I store the smallest absolute value among negative numbers.
        // If negatives are odd, this is the one I remove.
        int minNegAbs = 11;

        long long product = 1;

        for (int x : arr) {
            if (x == 0) {
                zeroCount++;
                continue; // Zero does not help the product unless everything is bad.
            }

            if (x > 0) {
                positiveCount++;
            } else {
                negativeCount++;
                minNegAbs = min(minNegAbs, abs(x));
            }

            // I multiply absolute values so the product stays non-negative here.
            product = (product * (long long)abs(x)) % MOD;
        }

        // If all elements are zero, the best product is zero.
        if (zeroCount == n) {
            return 0;
        }

        // If there is exactly one negative and everything else is zero,
        // zero is better than a negative product.
        if (negativeCount == 1 && positiveCount == 0) {
            return 0;
        }

        // If the number of negatives is odd, I remove the smallest absolute negative.
        if (negativeCount % 2 == 1) {
            long long inv = modPow(minNegAbs, MOD - 2);
            product = (product * inv) % MOD;
        }

        return (int)product;
    }
};
```

### Java

```java
class Solution {
    static final long MOD = 1000000007L;

    // I use fast power to compute modular inverse with Fermat's theorem.
    private long modPow(long base, long exp) {
        long result = 1L;
        base %= MOD;

        while (exp > 0) {
            if ((exp & 1L) == 1L) {
                result = (result * base) % MOD;
            }
            base = (base * base) % MOD;
            exp >>= 1;
        }
        return result;
    }

    public int findMaxProduct(int[] arr) {
        int n = arr.length;

        // I return the only element directly so [-1] stays -1.
        if (n == 1) {
            return arr[0];
        }

        int zeroCount = 0;
        int positiveCount = 0;
        int negativeCount = 0;

        // I keep the smallest absolute negative value for later removal.
        int minNegAbs = 11;

        long product = 1L;

        for (int x : arr) {
            if (x == 0) {
                zeroCount++;
                continue; // Zero does not help unless all choices are weak.
            }

            if (x > 0) {
                positiveCount++;
            } else {
                negativeCount++;
                minNegAbs = Math.min(minNegAbs, Math.abs(x));
            }

            // I multiply absolute values and keep the number inside modulo.
            product = (product * Math.abs((long)x)) % MOD;
        }

        // If everything is zero, the answer is zero.
        if (zeroCount == n) {
            return 0;
        }

        // If there is only one negative and no positive number,
        // I prefer zero over a negative answer.
        if (negativeCount == 1 && positiveCount == 0) {
            return 0;
        }

        // If negatives are odd, I remove the negative closest to zero.
        if ((negativeCount & 1) == 1) {
            long inv = modPow(minNegAbs, MOD - 2);
            product = (product * inv) % MOD;
        }

        return (int)product;
    }
}
```

### JavaScript

```javascript
class Solution {
    findMaxProduct(arr) {
        const MOD = 1000000007n;
        const n = arr.length;

        // I return the only element directly so [-1] stays -1.
        if (n === 1) {
            return arr[0];
        }

        let zeroCount = 0;
        let positiveCount = 0;
        let negativeCount = 0;

        // I keep the smallest absolute negative value for later removal.
        let minNegAbs = 11;

        let product = 1n;

        for (const x of arr) {
            if (x === 0) {
                zeroCount++;
                continue; // Zero does not help the product in normal cases.
            }

            if (x > 0) {
                positiveCount++;
            } else {
                negativeCount++;
                minNegAbs = Math.min(minNegAbs, Math.abs(x));
            }

            // I multiply absolute values so the running product stays positive.
            product = (product * BigInt(Math.abs(x))) % MOD;
        }

        // If every value is zero, the answer must be zero.
        if (zeroCount === n) {
            return 0;
        }

        // If there is exactly one negative and no positive number,
        // zero is better than a negative product.
        if (negativeCount === 1 && positiveCount === 0) {
            return 0;
        }

        // Fast modular exponentiation for inverse.
        const modPow = (base, exp) => {
            let result = 1n;
            base %= MOD;

            while (exp > 0n) {
                if (exp & 1n) {
                    result = (result * base) % MOD;
                }
                base = (base * base) % MOD;
                exp >>= 1n;
            }
            return result;
        };

        // If the number of negatives is odd, I remove the one closest to zero.
        if (negativeCount % 2 === 1) {
            const inv = modPow(BigInt(minNegAbs), MOD - 2n);
            product = (product * inv) % MOD;
        }

        return Number(product);
    }
}
```

### Python3

```python
class Solution:
    def findMaxProduct(self, arr):
        MOD = 1000000007
        n = len(arr)

        # I return the only element directly so [-1] stays -1.
        if n == 1:
            return arr[0]

        zero_count = 0
        positive_count = 0
        negative_count = 0

        # I keep the smallest absolute negative value for later removal.
        min_neg_abs = 11

        product = 1

        for x in arr:
            if x == 0:
                zero_count += 1
                continue  # Zero does not help unless every other choice is worse.

            if x > 0:
                positive_count += 1
            else:
                negative_count += 1
                min_neg_abs = min(min_neg_abs, abs(x))

            # I multiply absolute values and keep the result under modulo.
            product = (product * abs(x)) % MOD

        # If all values are zero, the best product is zero.
        if zero_count == n:
            return 0

        # If there is only one negative and no positive number,
        # zero is better than a negative answer.
        if negative_count == 1 and positive_count == 0:
            return 0

        # If negatives are odd, I remove the smallest absolute negative.
        if negative_count % 2 == 1:
            inv = pow(min_neg_abs, MOD - 2, MOD)
            product = (product * inv) % MOD

        return product
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains identical in all language implementations.

First, I handle special cases where the answer can be determined immediately.

If the array contains only one element, that element itself becomes the answer.

Next, I iterate through the array and count:

* Positive numbers
* Negative numbers
* Zero values

While processing negative values, I also keep track of the negative number that is closest to zero.

At the same time, I multiply all non-zero values into a running product.

After processing the array, I check whether every element is zero. If that happens, the answer is simply zero.

Then I check the case where there is exactly one negative number and all remaining elements are zeros. In that scenario, choosing zero produces a larger result than choosing the negative value.

If the count of negative numbers is odd, the product remains negative. To fix this, I remove the negative value with the smallest absolute value.

Finally, I return the resulting product modulo 10⁹ + 7.

The implementation details differ slightly between C++, Java, JavaScript, and Python, but the underlying algorithm stays exactly the same.

## Examples

### Example 1

Input

```text
arr[] = [-1, 0, -2, 4, 3]
```

Output

```text
24
```

Explanation

```text
(-1 × -2 × 4 × 3)
= 24
```

The count of negative numbers is even, so all useful non-zero elements are included.

---

### Example 2

Input

```text
arr[] = [-1, 0]
```

Output

```text
0
```

Explanation

```text
Possible products:
-1
0
```

Zero is larger than -1, so the answer is 0.

---

### Example 3

Input

```text
arr[] = [5]
```

Output

```text
5
```

Explanation

The array contains only one element, so that element itself is the maximum product subset.

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

### Java

Compile

```bash
javac Solution.java
```

Run

```bash
java Solution
```

### JavaScript

Run

```bash
node solution.js
```

### Python3

Run

```bash
python solution.py
```

## Notes & Optimizations

* Positive numbers should always be included.
* Zero values should usually be ignored.
* Negative numbers should be paired whenever possible.
* If the count of negatives is odd, remove the negative closest to zero.
* Watch out for edge cases involving:

  * Single element arrays
  * All zeros
  * One negative with remaining zeros
* A greedy approach is sufficient.
* No sorting is required.
* The solution achieves optimal O(n) time complexity.

### Alternative Approach

A sorting-based solution can also be written, but it increases time complexity to O(n log n). Since sorting is unnecessary here, the linear-time greedy solution is preferred.

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)

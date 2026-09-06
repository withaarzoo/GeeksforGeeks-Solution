# Sum of Pairwise ANDs

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

Given an integer array `arr`, I need to find the sum of the bitwise AND of every possible pair where the first index is smaller than the second index.

For every valid pair `(i, j)`:

```text
i < j
```

I calculate:

```text
arr[i] & arr[j]
```

and add all these values together.

For example:

```text
arr = [5, 10, 15]

5  & 10 = 0
5  & 15 = 5
10 & 15 = 10

Total = 0 + 5 + 10 = 15
```

The challenge is that the array can contain up to `10^5` elements, so checking every pair directly would take `O(n²)` time.

The goal is to calculate the **sum of pairwise bitwise ANDs** efficiently.

## Constraints

| Constraint    | Value                     |
| ------------- | ------------------------- |
| Array size    | `1 <= arr.size() <= 10^5` |
| Array element | `1 <= arr[i] <= 10^8`     |

Because the array can contain `100,000` elements, an `O(n²)` pair-by-pair solution is too slow.

## Intuition

My first thought was to generate every pair and calculate its bitwise AND.

That would look like:

```text
(0, 1)
(0, 2)
(0, 3)
...
(1, 2)
(1, 3)
...
```

But this creates roughly `n² / 2` pairs.

With `n = 100000`, that is far too many operations.

I then looked at how bitwise AND actually works.

A bit becomes `1` in `a & b` only when that same bit is `1` in both `a` and `b`.

So instead of thinking about complete numbers, I can think about one bit at a time.

Suppose a particular bit is set in `count` array elements. Any two of those elements will have that bit set in their AND.

The number of such pairs is:

```text
count × (count - 1) / 2
```

If the current bit has value `2^k`, its total contribution is:

```text
(count × (count - 1) / 2) × 2^k
```

I repeat this for every bit and add all contributions.

This avoids generating the actual pairs.

## Approach

I process every bit independently.

For each bit:

1. I go through the entire array.
2. I count how many numbers have that bit set.
3. I calculate how many pairs can be formed from those numbers.
4. I multiply the number of pairs by the value of the current bit.
5. I add that contribution to the final answer.

For example:

```text
arr = [5, 10, 15]

5  = 0101
10 = 1010
15 = 1111
```

For bit `0`:

```text
5  -> 1
10 -> 0
15 -> 1

count = 2
pairs = 2 × 1 / 2 = 1

contribution = 1 × 1 = 1
```

For bit `1`:

```text
5  -> 0
10 -> 1
15 -> 1

count = 2
pairs = 1

contribution = 1 × 2 = 2
```

For bit `2`:

```text
5  -> 1
10 -> 0
15 -> 1

count = 2
pairs = 1

contribution = 1 × 4 = 4
```

For bit `3`:

```text
5  -> 0
10 -> 1
15 -> 1

count = 2
pairs = 1

contribution = 1 × 8 = 8
```

So:

```text
1 + 2 + 4 + 8 = 15
```

The important part is that I count the contribution of each bit without explicitly calculating every pair.

## Data Structures Used

I don't need any special data structure for this solution.

Only a few variables are used:

* `ans` stores the final sum.
* `count` stores how many numbers contain the current bit.
* `pairs` stores how many pairs can be formed for that bit.

No extra array, hash map, set, or matrix is required.

This keeps the extra space at `O(1)`.

## Operations & Behavior Summary

The algorithm can be summarized like this:

```text
Start
  |
  v
Set answer = 0
  |
  v
For every bit:
  |
  +--> Count array elements having this bit set
  |
  +--> Calculate count * (count - 1) / 2
  |
  +--> Multiply pairs by the value of the bit
  |
  +--> Add contribution to answer
  |
  v
After all bits are processed
  |
  v
Return answer
```

I use the combination formula because every two numbers having the same bit set will contribute that bit to their pairwise AND.

## Complexity

| Type  | Complexity | Explanation                                                                |
| ----- | ---------- | -------------------------------------------------------------------------- |
| Time  | `O(n × k)` | `n` is the number of array elements and `k` is the number of bits checked. |
| Space | `O(1)`     | Only a few variables are used and no extra data structure is created.      |

Since `arr[i] <= 10^8`, only around 27 bits are actually needed. The implementation checks 31 bits, which is still a constant amount.

Therefore, the practical complexity is close to `O(n)`.

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    long long pairAndSum(vector<int> &arr) {
        // I store the final sum in long long because the answer can be
        // much larger than the maximum value of a single array element.
        long long ans = 0;

        // I check each bit independently.
        // 31 bits are enough for the given constraint arr[i] <= 10^8.
        for (int bit = 0; bit < 31; bit++) {
            // I count how many numbers have the current bit set.
            long long count = 0;

            // I examine every array element for the current bit.
            for (int x : arr) {
                // If the current bit is 1, this number can form a pair
                // whose AND also has this bit set.
                if (x & (1LL << bit)) {
                    count++;
                }
            }

            // Any two numbers among these count numbers will have
            // the current bit set in their bitwise AND.
            long long pairs = count * (count - 1) / 2;

            // Each occurrence of this bit contributes 2^bit to the answer.
            ans += pairs * (1LL << bit);
        }

        // I return the sum of pairwise AND values.
        return ans;
    }
};
```

### Java

```java
class Solution {
    public long pairAndSum(int[] arr) {
        // I use long because the total answer can be larger than an int.
        long ans = 0;

        // I process every possible bit independently.
        // 31 bits are enough for values up to 10^8.
        for (int bit = 0; bit < 31; bit++) {
            // I count how many array elements have this bit set.
            long count = 0;

            // I check the current bit in every array element.
            for (int x : arr) {
                // If this bit is set, this number can participate
                // in a pair contributing this bit to the AND.
                if ((x & (1L << bit)) != 0) {
                    count++;
                }
            }

            // I can choose any two of these numbers to form a pair.
            long pairs = count * (count - 1) / 2;

            // Every such pair contributes 2^bit for the current bit.
            ans += pairs * (1L << bit);
        }

        // I return the complete sum.
        return ans;
    }
}
```

### JavaScript

```javascript
/**
 *@param {number[]} arr
 *@return {string}
 **/
class Solution {
    pairAndSum(arr) {
        // I use BigInt because JavaScript's Number cannot safely
        // represent every possible large integer exactly.
        let ans = 0n;

        // I process each bit separately.
        // 27 bits are enough for 10^8, and 31 keeps the loop general.
        for (let bit = 0; bit < 31; bit++) {
            // I count how many elements have the current bit set.
            let count = 0n;

            // I check the current bit for every array element.
            for (const x of arr) {
                // I use BigInt for the bit check so all arithmetic
                // involved in the final answer stays exact.
                const value = BigInt(x);

                // If the current bit is set, this number can form
                // a pair contributing this bit to the AND.
                if ((value & (1n << BigInt(bit))) !== 0n) {
                    count++;
                }
            }

            // I choose any two numbers from the count numbers.
            const pairs = count * (count - 1n) / 2n;

            // Each pair contributes 2^bit for this bit.
            ans += pairs * (1n << BigInt(bit));
        }

        // The expected JavaScript solution format returns the large
        // integer as a string so no precision is lost.
        return ans.toString();
    }
}
```

### Python3

```python
class Solution:
    def pairAndSum(self, arr):
        # I store the final answer in an integer, which supports
        # arbitrarily large values in Python.
        ans = 0

        # I process every bit independently.
        # 31 bits are enough for the given constraint.
        for bit in range(31):
            # I count how many numbers have the current bit set.
            count = 0

            # I check the current bit in every array element.
            for x in arr:
                # If this bit is set, this number can participate
                # in a pair contributing this bit to the AND.
                if x & (1 << bit):
                    count += 1

            # I choose any two numbers among the numbers
            # that contain this bit.
            pairs = count * (count - 1) // 2

            # Each such pair contributes 2^bit to the answer.
            ans += pairs * (1 << bit)

        # I return the complete sum.
        return ans
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The main logic is the same in every language. I only change the syntax and the integer type according to the language.

### 1. Initialize the answer

I start with an answer of zero.

The answer needs a larger integer type because there can be a very large number of pairs, and the total sum can become much larger than an individual `arr[i]`.

For C++ and Java, I use a 64-bit integer type.

In JavaScript, I use `BigInt` because normal JavaScript `Number` values cannot safely represent every possible large integer.

Python integers automatically support large values.

### 2. Process every bit

I loop through the bits from the lowest bit upward.

For the given constraint, 31 bits are more than enough.

For a bit position `k`, its numeric value is:

```text
2^k
```

I can also create this value using a left shift:

```text
1 << k
```

For languages where integer overflow or signed shifting can matter, I use the appropriate wider integer type.

### 3. Count numbers containing the current bit

For every array element, I check:

```text
number & (1 << bit)
```

If the result is non-zero, the current bit is set in that number.

For example:

```text
number = 13
binary = 1101

bit = 2
mask = 0100

1101
0100
----
0100
```

The result is non-zero, so bit `2` is set.

I increase `count` whenever this happens.

### 4. Calculate the number of valid pairs

After checking all elements, suppose:

```text
count = 5
```

That means five numbers have the current bit set.

I can choose any two of them:

```text
5 × 4 / 2 = 10
```

So there are 10 pairs where this bit will appear in the AND result.

I don't need to know which exact pairs they are.

### 5. Add the bit contribution

If the current bit is bit `k`, its value is:

```text
2^k
```

Therefore:

```text
contribution = pairs × 2^k
```

I add this contribution to the final answer.

### 6. Repeat for every bit

I repeat the same process for every bit.

Each bit is independent, so there is no need to calculate complete AND values for individual pairs.

Once all bits are processed, the accumulated value is the sum of the bitwise AND of every valid pair.

### 7. Why this works

Consider two numbers:

```text
a = 1011
b = 1110
```

Their AND is:

```text
1011
1110
----
1010
```

A bit survives only when both numbers contain that bit.

So if I know how many numbers contain a particular bit, I already know how many pairs will contribute that bit.

That is the key observation behind the entire solution.

### 8. Edge case: one element

If the array contains only one element:

```text
arr = [7]
```

There is no pair because we need:

```text
i < j
```

The bit count may be one for some bits, but:

```text
1 × 0 / 2 = 0
```

So the final answer correctly remains zero.

### 9. Why I don't use nested loops

The direct solution would be:

```text
for every i
    for every j > i
        calculate arr[i] & arr[j]
```

That requires `O(n²)` time.

For `n = 100000`, this is not practical.

The bit-counting approach checks every element for each bit, giving:

```text
O(n × k)
```

Since `k` is a small constant, this is effectively linear time.

## Examples

### Example 1

Input:

```text
arr = [5, 10, 15]
```

Binary representation:

```text
5  = 0101
10 = 1010
15 = 1111
```

Direct pair results:

```text
5  & 10 = 0
5  & 15 = 5
10 & 15 = 10
```

Therefore:

```text
0 + 5 + 10 = 15
```

Output:

```text
15
```

Using the bit-counting approach:

```text
bit 0 -> 2 numbers -> 1 pair -> 1
bit 1 -> 2 numbers -> 1 pair -> 2
bit 2 -> 2 numbers -> 1 pair -> 4
bit 3 -> 2 numbers -> 1 pair -> 8

Total = 15
```

### Example 2

Input:

```text
arr = [10, 20, 30, 40]
```

The pairwise AND values are:

```text
10 & 20 = 0
10 & 30 = 10
10 & 40 = 8
20 & 30 = 20
20 & 40 = 0
30 & 40 = 8
```

So:

```text
0 + 10 + 8 + 20 + 0 + 8 = 46
```

Output:

```text
46
```

The optimized solution reaches the same answer by counting the contribution of each set bit instead of calculating all six pairs individually.

### Example 3

Input:

```text
arr = [7]
```

There is only one element, so there are no valid pairs.

Output:

```text
0
```

## How to Use / Run Locally

The solution can be tested locally by putting the required function inside a complete program with input/output handling.

### C++

Save the solution as:

```text
solution.cpp
```

Compile it with:

```bash
g++ -std=c++17 solution.cpp -o solution
```

Run it with:

```bash
./solution
```

On Windows:

```bash
solution.exe
```

### Java

Save the solution in:

```text
Solution.java
```

Compile it with:

```bash
javac Solution.java
```

Run it with:

```bash
java Solution
```

### JavaScript

Save the solution as:

```text
solution.js
```

Run it using Node.js:

```bash
node solution.js
```

### Python3

Save the solution as:

```text
solution.py
```

Run it with:

```bash
python3 solution.py
```

## Notes & Optimizations

The biggest optimization is avoiding the `O(n²)` pair enumeration.

The direct approach is easy to understand, but it becomes too slow when the array contains `10^5` elements.

The bit-counting solution works because bitwise AND can be analyzed independently for every bit.

A few important points:

* I use `long long` in C++ because the answer can be large.
* I use `long` in Java for the same reason.
* I use `BigInt` in JavaScript to avoid precision problems with large integers.
* Python's built-in integer type handles large values automatically.
* Only a constant number of bits need to be checked because `arr[i] <= 10^8`.
* If `count` is `0` or `1`, that bit contributes nothing because no pair can contain it in both numbers.
* No extra array or hash-based structure is required.

The key formula to remember is:

```text
Number of pairs = count × (count - 1) / 2
```

Whenever a particular bit appears in `count` numbers, this formula tells me exactly how many pairwise AND results will contain that bit.

## Author

[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)

# Count Pairs Divisible By K

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
* [Step-by-step Detailed Explanation](#step-by-step-detailed-explanation-c-java-javascript-python3)
* [Examples](#examples)
* [How to Use / Run Locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

## Problem Summary

The **Count Pairs Divisible By K** problem asks us to find the total number of pairs in an array whose sum is divisible by a given positive integer `k`.

For every pair of indexes `(i, j)`, where `i < j`, we need to check whether:

```text
(arr[i] + arr[j]) % k == 0
```

If the condition is true, that pair is counted.

A simple solution would check every possible pair. That works for small arrays, but it takes `O(n²)` time and becomes too slow when the array is large.

The optimized solution uses remainders and a frequency array. Instead of comparing every pair directly, I count how many previously seen numbers can form a valid pair with the current number.

The input contains:

* An integer array `arr`
* A positive integer `k`

The output is:

* The total number of pairs whose sum is divisible by `k`

This solution runs in linear time and is useful for learning arrays, hashing, remainder arithmetic, and pair-counting techniques in competitive programming.

## Constraints

| Constraint    | Range                         |
| ------------- | ----------------------------- |
| Array size    | `1 <= arr.size() <= 5 * 10^4` |
| Array element | `1 <= arr[i] <= 10^6`         |
| Divisor       | `1 <= k <= 5 * 10^4`          |

The large array size is the main reason an `O(n²)` brute-force solution is not suitable.

## Intuition

My first instinct was to check every possible pair and test whether its sum was divisible by `k`.

That approach is easy to understand, but it checks too many pairs.

Then I noticed that the actual values are not important. What matters is the remainder of each value after division by `k`.

Suppose a number gives remainder `r`.

To make the sum divisible by `k`, I need another number with remainder:

```text
(k - r) % k
```

For example, if `k = 4` and the current number has remainder `1`, I need a previous number with remainder `3`.

Their remainders add up to `4`, so their actual sum is divisible by `4`.

This made the problem much simpler. Instead of storing all previous values and checking them again, I only need to remember how many times each remainder has appeared.

## Approach

I process the array from left to right.

For each number, I follow these steps:

1. Find its remainder after division by `k`.
2. Find the complementary remainder needed to make the sum divisible by `k`.
3. Check how many previously processed numbers have that complementary remainder.
4. Add that count to the answer.
5. Store the current remainder so future elements can use it.

The complementary remainder is calculated as:

```text
(k - remainder) % k
```

The final `% k` is important.

If the current remainder is `0`, then the required remainder should also be `0`. Without the final modulo operation, the formula would return `k`, which is not a valid remainder.

I count valid previous elements before storing the current element. This prevents the current number from being paired with itself.

It also makes sure every valid pair is counted exactly once.

## Data Structures Used

### Frequency Array

I use an array of size `k`.

Each index represents a possible remainder from `0` to `k - 1`.

For example, if:

```text
freq[2] = 4
```

it means four previously processed numbers have remainder `2` when divided by `k`.

I chose a frequency array because the remainder range is fixed and known in advance. Direct array access takes constant time, so finding and updating a remainder count is fast.

### Integer Counter

I use one variable to store the total number of valid pairs.

Whenever the current number finds matching previous remainders, I add their frequency directly to this counter.

No pair list or extra collection is needed.

## Operations & Behavior Summary

The algorithm works like this:

1. Create a frequency array of size `k` and fill it with zero.
2. Set the answer to zero.
3. Read the current number from the array.
4. Calculate its remainder using `number % k`.
5. Calculate the required complementary remainder.
6. Look up how many previous numbers have that remainder.
7. Add that frequency to the answer.
8. Increase the frequency of the current remainder.
9. Repeat until every array element has been processed.
10. Return the final pair count.

The important idea is that the frequency array only contains information about elements that appeared earlier.

Because of this, every pair is counted when its second element is reached.

## Complexity

| Complexity       | Value  | Explanation                                                                                |
| ---------------- | ------ | ------------------------------------------------------------------------------------------ |
| Time Complexity  | `O(n)` | Every element is processed exactly once, where `n` is the number of elements in the array. |
| Space Complexity | `O(k)` | A frequency array of size `k` stores the count of every possible remainder.                |

The algorithm does not depend on the size of the array values. It only depends on the number of elements and the divisor `k`.

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int countKdivPairs(vector<int>& arr, int k) {
        // freq[r] stores how many previous numbers have remainder r
        vector<int> freq(k, 0);

        // answer stores the total number of valid pairs found
        int answer = 0;

        // I process each number once from left to right
        for (int num : arr) {
            // I only need the remainder of the current number
            int remainder = num % k;

            // This remainder is needed to make the sum divisible by k
            int needed = (k - remainder) % k;

            // Every previous number with this remainder forms a valid pair
            answer += freq[needed];

            // I store the current remainder for numbers processed later
            freq[remainder]++;
        }

        // I return the total number of valid pairs
        return answer;
    }
};
```

### Java

```java
class Solution {
    public int countKdivPairs(int[] arr, int k) {
        // freq[r] stores how many previous numbers have remainder r
        int[] freq = new int[k];

        // answer stores the total number of valid pairs found
        int answer = 0;

        // I process each number once from left to right
        for (int num : arr) {
            // I only need the remainder of the current number
            int remainder = num % k;

            // This remainder is needed to make the sum divisible by k
            int needed = (k - remainder) % k;

            // Every previous number with this remainder forms a valid pair
            answer += freq[needed];

            // I store the current remainder for numbers processed later
            freq[remainder]++;
        }

        // I return the total number of valid pairs
        return answer;
    }
}
```

### JavaScript

```javascript
class Solution {
    countKdivPairs(arr, k) {
        // freq[r] stores how many previous numbers have remainder r
        const freq = new Array(k).fill(0);

        // answer stores the total number of valid pairs found
        let answer = 0;

        // I process each number once from left to right
        for (const num of arr) {
            // I only need the remainder of the current number
            const remainder = num % k;

            // This remainder is needed to make the sum divisible by k
            const needed = (k - remainder) % k;

            // Every previous number with this remainder forms a valid pair
            answer += freq[needed];

            // I store the current remainder for numbers processed later
            freq[remainder]++;
        }

        // I return the total number of valid pairs
        return answer;
    }
}
```

### Python3

```python
class Solution:
    def countKdivPairs(self, arr, k):
        # freq[r] stores how many previous numbers have remainder r
        freq = [0] * k

        # answer stores the total number of valid pairs found
        answer = 0

        # I process each number once from left to right
        for num in arr:
            # I only need the remainder of the current number
            remainder = num % k

            # This remainder is needed to make the sum divisible by k
            needed = (k - remainder) % k

            # Every previous number with this remainder forms a valid pair
            answer += freq[needed]

            # I store the current remainder for numbers processed later
            freq[remainder] += 1

        # I return the total number of valid pairs
        return answer
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The main logic is the same in C++, Java, JavaScript, and Python3.

First, I create a frequency collection with exactly `k` positions.

If `k = 4`, the possible remainders are:

```text
0, 1, 2, 3
```

So I need four frequency positions.

At the beginning, every frequency is zero because no array element has been processed yet.

Next, I create a variable for the answer.

This variable starts at zero and increases whenever the current element can form valid pairs with earlier elements.

Then I process the array from left to right.

For each number, I calculate:

```text
remainder = number % k
```

This tells me which remainder group the current number belongs to.

After that, I calculate:

```text
needed = (k - remainder) % k
```

This gives the remainder I need from a previously processed number.

For example, suppose:

```text
k = 5
remainder = 2
```

Then:

```text
needed = (5 - 2) % 5
needed = 3
```

So the current number can form a valid pair with every previous number whose remainder is `3`.

I then add the frequency of the needed remainder to the answer.

If three previous numbers have the required remainder, the current number creates three new valid pairs. There is no need to inspect those three values separately.

Only after counting the new pairs do I increase the frequency of the current remainder.

This order matters.

If I stored the current remainder first, the current element could sometimes count itself as a valid partner. This is especially important when the remainder is `0` or when a remainder is its own complement.

For example, with `k = 4`, remainder `2` needs another remainder `2`.

The same issue happens with remainder `0`, because remainder `0` also needs remainder `0`.

By counting first and inserting second, I only match the current number with elements that came before it.

The language-specific behavior is nearly identical.

In C++, I use a fixed-size dynamic array structure for the remainder frequencies and loop through the input array.

In Java, I use an integer array. Java automatically initializes all positions to zero.

In JavaScript, I create an array of size `k` and fill every position with zero before processing the input.

In Python3, I create a list containing `k` zero values.

The algorithm itself does not change between languages. Only the syntax for creating arrays, writing loops, and updating values is different.

## Examples

### Example 1

Input:

```text
arr = [2, 2, 1, 7, 5, 3]
k = 4
```

Expected Output:

```text
5
```

Brief trace:

* The first `2` has remainder `2`. No previous remainder `2` exists.
* The second `2` finds one previous remainder `2`. Answer becomes `1`.
* `1` has remainder `1` and needs remainder `3`. None exists yet.
* `7` has remainder `3` and finds one previous remainder `1`. Answer becomes `2`.
* `5` has remainder `1` and finds one previous remainder `3`. Answer becomes `3`.
* `3` has remainder `3` and finds two previous numbers with remainder `1`. Answer becomes `5`.

The final answer is `5`.

### Example 2

Input:

```text
arr = [5, 9, 36, 74, 52, 31, 42]
k = 3
```

Expected Output:

```text
7
```

Brief trace:

Each number is converted into its remainder after division by `3`.

The algorithm counts how many previous numbers have the complementary remainder needed to make the sum divisible by `3`.

After processing the complete array, the total number of valid pairs is `7`.

### Example 3

Input:

```text
arr = [4, 8, 12]
k = 4
```

Expected Output:

```text
3
```

Brief trace:

Every number has remainder `0`.

* The first number creates `0` pairs.
* The second number creates `1` pair.
* The third number creates `2` more pairs.

The total is:

```text
0 + 1 + 2 = 3
```

This example shows why remainder `0` must correctly pair with another remainder `0`.

## How to Use / Run Locally

First, create a file for the language you want to use and paste the complete solution into it.

### C++

Save the file as:

```text
main.cpp
```

Compile it:

```bash
g++ main.cpp -o main
```

Run it:

```bash
./main
```

On Windows, run:

```bash
main.exe
```

### Java

Save the file as:

```text
Solution.java
```

Compile it:

```bash
javac Solution.java
```

Run it:

```bash
java Solution
```

If you are using the GeeksforGeeks class format, you may need a separate driver class for local testing.

### JavaScript

Save the file as:

```text
solution.js
```

Run it with Node.js:

```bash
node solution.js
```

Make sure Node.js is installed on your computer before running the command.

### Python3

Save the file as:

```text
solution.py
```

Run it:

```bash
python3 solution.py
```

On some systems, the command may be:

```bash
python solution.py
```

For local testing, add your own input array, value of `k`, and a function call outside the solution class.

## Notes & Optimizations

The brute-force approach checks every pair and takes `O(n²)` time. It may work for small inputs, but it is too slow for the given constraints.

The optimized remainder frequency approach reduces the time complexity to `O(n)`.

The formula:

```text
(k - remainder) % k
```

must be used carefully. The final modulo handles the case where the current remainder is `0`.

The current remainder should be stored only after counting valid previous elements. Reversing this order can count the current element as a pair with itself.

When `k = 1`, every number has remainder `0`, so every possible pair is valid. The same algorithm handles this case without any special condition.

A hash map can also be used instead of a frequency array. That can be useful when `k` is extremely large and only a few remainders appear. For the given constraints, an array is simple and efficient.

The algorithm counts pairs by index, not unique value combinations. If the same values appear multiple times at different positions, each valid index pair is counted separately.

This remainder-based pair counting technique is useful in many DSA and competitive programming problems involving divisibility, modular arithmetic, array pairs, and frequency counting.

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)

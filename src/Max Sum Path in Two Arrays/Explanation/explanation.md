# Max Sum Path in Two Arrays

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

The **Max Sum Path in Two Arrays** problem asks us to find the maximum possible path sum using two sorted arrays of distinct integers.

We can start from the beginning of either array and move only forward. If both arrays contain the same value, that common element becomes a switching point. At that point, we can continue in the same array or switch to the other array.

When switching arrays, the common element must be counted only once.

The main goal is to choose the better path between every pair of common elements. Since both arrays are sorted in increasing order, a two-pointer approach can process them efficiently.

The input contains two sorted integer arrays:

* `a` is the first sorted array.
* `b` is the second sorted array.

The output is a single integer representing the maximum sum path that can be formed.

## Constraints

| Constraint                 | Range                   |
| -------------------------- | ----------------------- |
| Size of array `a`          | `1 <= a.size() <= 10^4` |
| Size of array `b`          | `1 <= b.size() <= 10^4` |
| Values in array `a`        | `1 <= a[i] <= 10^5`     |
| Values in array `b`        | `1 <= b[i] <= 10^5`     |
| Array order                | Strictly increasing     |
| Elements inside each array | Distinct                |

## Intuition

My first observation was that both arrays are already sorted. This is the most useful part of the problem.

I do not need to search for every common element separately. I can move through both arrays at the same time using two pointers.

Between two common elements, there are two possible path sums. One comes from the first array, and the other comes from the second array.

When I reach a common element, I can switch arrays. So I only need to keep the larger sum collected before that common point.

After choosing the better path, I add the common element once and start calculating the next segment.

This means I never need to build or store the actual path. I only need two running sums, two pointers, and the final answer.

## Approach

I use one pointer for each sorted array.

The first pointer moves through array `a`, and the second pointer moves through array `b`.

I also maintain two running sums:

* One sum stores values collected from array `a`.
* The other sum stores values collected from array `b`.

Then I compare the current elements of both arrays.

If the current value in `a` is smaller, I add it to the first running sum and move the pointer of `a`.

If the current value in `b` is smaller, I add it to the second running sum and move the pointer of `b`.

If both values are equal, I have found a common element.

At this point, I add the larger of the two running sums to the final answer. Then I add the common element once.

After processing the common element, I reset both running sums because a new path segment starts from that point.

When one array ends, the other array may still contain some values. I add those remaining values to the correct running sum.

Finally, I add the larger remaining sum to the answer.

This two-pointer algorithm solves the Max Sum Path in Two Arrays problem in linear time.

## Data Structures Used

This solution does not need any extra data structure.

I only use a few variables:

* Two pointers to track the current positions in both arrays.
* Two running sums to store the path sums between common elements.
* One variable to store the final maximum path sum.

I do not use an extra array, hash map, set, stack, queue, or dynamic programming table.

The sorted order of the input arrays is enough to solve the problem efficiently.

## Operations & Behavior Summary

The algorithm works in the following order:

1. Start both pointers at index `0`.
2. Set both running sums to `0`.
3. Compare the current values from both sorted arrays.
4. Add the smaller value to its own running sum.
5. Move only the pointer of the smaller value.
6. If both values are equal, treat that value as a switching point.
7. Add the larger running sum to the final answer.
8. Add the common element only once.
9. Reset both running sums.
10. Move both pointers forward.
11. Continue until one array ends.
12. Add all remaining values from both arrays to their own running sums.
13. Add the larger remaining sum to the final answer.
14. Return the maximum path sum.

The important idea is that every common element divides the arrays into separate segments. For each segment, I only keep the path with the larger sum.

## Complexity

| Complexity       | Value      | Explanation                                                                                                               |
| ---------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------- |
| Time Complexity  | `O(n + m)` | Each element of both arrays is visited at most once, where `n` is the size of array `a` and `m` is the size of array `b`. |
| Space Complexity | `O(1)`     | Only a fixed number of variables are used. No extra data structure grows with the input size.                             |

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int maxPathSum(vector<int> &a, vector<int> &b) {
        // i moves through a, while j moves through b.
        int i = 0;
        int j = 0;

        // These store the sums between two common elements.
        int sumA = 0;
        int sumB = 0;

        // This stores the best total path sum.
        int answer = 0;

        // I compare both arrays until one of them ends.
        while (i < a.size() && j < b.size()) {
            if (a[i] < b[j]) {
                // This value belongs only to the current path in a.
                sumA += a[i];
                i++;
            } 
            else if (a[i] > b[j]) {
                // This value belongs only to the current path in b.
                sumB += b[j];
                j++;
            } 
            else {
                // At a common element, I choose the better previous path.
                answer += max(sumA, sumB);

                // The common element must be counted only once.
                answer += a[i];

                // A new segment starts after this common element.
                sumA = 0;
                sumB = 0;

                // Both pointers move because the common value was processed.
                i++;
                j++;
            }
        }

        // If a still has elements, they belong to its final segment.
        while (i < a.size()) {
            sumA += a[i];
            i++;
        }

        // If b still has elements, they belong to its final segment.
        while (j < b.size()) {
            sumB += b[j];
            j++;
        }

        // I finish by choosing the better remaining path.
        answer += max(sumA, sumB);

        return answer;
    }
};
```

### Java

```java
class Solution {
    public int maxPathSum(int[] a, int[] b) {
        // i moves through a, while j moves through b.
        int i = 0;
        int j = 0;

        // These store the sums between two common elements.
        int sumA = 0;
        int sumB = 0;

        // This stores the best total path sum.
        int answer = 0;

        // I compare both arrays until one of them ends.
        while (i < a.length && j < b.length) {
            if (a[i] < b[j]) {
                // This value belongs only to the current path in a.
                sumA += a[i];
                i++;
            } 
            else if (a[i] > b[j]) {
                // This value belongs only to the current path in b.
                sumB += b[j];
                j++;
            } 
            else {
                // At a common element, I choose the better previous path.
                answer += Math.max(sumA, sumB);

                // The common element must be counted only once.
                answer += a[i];

                // A new segment starts after this common element.
                sumA = 0;
                sumB = 0;

                // Both pointers move because the common value was processed.
                i++;
                j++;
            }
        }

        // If a still has elements, they belong to its final segment.
        while (i < a.length) {
            sumA += a[i];
            i++;
        }

        // If b still has elements, they belong to its final segment.
        while (j < b.length) {
            sumB += b[j];
            j++;
        }

        // I finish by choosing the better remaining path.
        answer += Math.max(sumA, sumB);

        return answer;
    }
}
```

### JavaScript

```javascript
/**
 * @param {number[]} a
 * @param {number[]} b
 * @returns {number}
 */

class Solution {
    maxPathSum(a, b) {
        // i moves through a, while j moves through b.
        let i = 0;
        let j = 0;

        // These store the sums between two common elements.
        let sumA = 0;
        let sumB = 0;

        // This stores the best total path sum.
        let answer = 0;

        // I compare both arrays until one of them ends.
        while (i < a.length && j < b.length) {
            if (a[i] < b[j]) {
                // This value belongs only to the current path in a.
                sumA += a[i];
                i++;
            } 
            else if (a[i] > b[j]) {
                // This value belongs only to the current path in b.
                sumB += b[j];
                j++;
            } 
            else {
                // At a common element, I choose the better previous path.
                answer += Math.max(sumA, sumB);

                // The common element must be counted only once.
                answer += a[i];

                // A new segment starts after this common element.
                sumA = 0;
                sumB = 0;

                // Both pointers move because the common value was processed.
                i++;
                j++;
            }
        }

        // If a still has elements, they belong to its final segment.
        while (i < a.length) {
            sumA += a[i];
            i++;
        }

        // If b still has elements, they belong to its final segment.
        while (j < b.length) {
            sumB += b[j];
            j++;
        }

        // I finish by choosing the better remaining path.
        answer += Math.max(sumA, sumB);

        return answer;
    }
}
```

### Python3

```python
class Solution:
    def maxPathSum(self, a, b):
        # i moves through a, while j moves through b.
        i = 0
        j = 0

        # These store the sums between two common elements.
        sumA = 0
        sumB = 0

        # This stores the best total path sum.
        answer = 0

        # I compare both arrays until one of them ends.
        while i < len(a) and j < len(b):
            if a[i] < b[j]:
                # This value belongs only to the current path in a.
                sumA += a[i]
                i += 1

            elif a[i] > b[j]:
                # This value belongs only to the current path in b.
                sumB += b[j]
                j += 1

            else:
                # At a common element, I choose the better previous path.
                answer += max(sumA, sumB)

                # The common element must be counted only once.
                answer += a[i]

                # A new segment starts after this common element.
                sumA = 0
                sumB = 0

                # Both pointers move because the common value was processed.
                i += 1
                j += 1

        # If a still has elements, they belong to its final segment.
        while i < len(a):
            sumA += a[i]
            i += 1

        # If b still has elements, they belong to its final segment.
        while j < len(b):
            sumB += b[j]
            j += 1

        # I finish by choosing the better remaining path.
        answer += max(sumA, sumB)

        return answer
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The same algorithm is used in C++, Java, JavaScript, and Python3. Only the syntax changes between the languages.

First, I create two pointers.

One pointer starts at the first element of array `a`, and the other starts at the first element of array `b`.

Next, I create two running sums.

The first running sum stores all values from the current segment of array `a`.

The second running sum stores all values from the current segment of array `b`.

I also create a variable for the final answer.

The main loop continues while both pointers are still inside their arrays.

If the current element of `a` is smaller than the current element of `b`, I add the value from `a` to its running sum.

Then I move only the pointer of `a`.

I do not move the pointer of `b` because its current value may match a later value in `a`.

The same logic works in the opposite direction.

If the current value of `b` is smaller, I add it to the running sum of `b` and move only the pointer of `b`.

When both current values are equal, I have reached a common element.

This is the only place where switching between arrays is allowed.

Before adding the common element, I compare both running sums.

I keep the larger one because it represents the better path to reach the common point.

I do not add both running sums. Doing that would combine two different paths, which is not allowed.

After choosing the larger segment sum, I add the common element once.

I do not add the common value from both arrays because both values represent the same switching point.

Then I reset both running sums to zero.

This reset is necessary because the previous segment has already been included in the final answer. If I do not reset the sums, those values would be counted again.

Both pointers then move forward because the common element has been fully processed.

Eventually, one of the arrays may end before the other.

The remaining values still matter. I add them to the running sum of their array.

At the end, I compare the two remaining sums one final time.

I add the larger one to the answer and return the result.

In C++, the logic uses `vector<int>` and standard index-based traversal.

In Java, the same process works with integer arrays and their `length` property.

In JavaScript, arrays and numeric variables are used with the same two-pointer flow.

In Python3, the logic stays identical, with `len()` used to check array sizes.

The behavior of the algorithm does not change between these languages.

## Examples

### Example 1

Input:

```text
a = [2, 3, 7, 10, 12]
b = [1, 5, 7, 8]
```

Expected Output:

```text
35
```

Trace:

Before the common element `7`:

```text
First array sum  = 2 + 3 = 5
Second array sum = 1 + 5 = 6
```

I choose `6` because it is larger.

Then I add the common element `7`.

After `7`:

```text
First array sum  = 10 + 12 = 22
Second array sum = 8
```

I choose `22`.

Final result:

```text
6 + 7 + 22 = 35
```

### Example 2

Input:

```text
a = [1, 2, 3]
b = [3, 4, 5]
```

Expected Output:

```text
15
```

Trace:

Before the common element `3`:

```text
First array sum  = 1 + 2 = 3
Second array sum = 0
```

I choose the first path and add the common value `3`.

After that, the second array has the larger remaining path:

```text
4 + 5 = 9
```

Final result:

```text
1 + 2 + 3 + 4 + 5 = 15
```

### Example 3

Input:

```text
a = [1, 4, 5, 6, 8]
b = [2, 3, 4, 6, 9]
```

Expected Output:

```text
29
```

Trace:

Before the common element `4`:

```text
First array sum  = 1
Second array sum = 2 + 3 = 5
```

I choose `5` and add `4`.

Between common elements `4` and `6`:

```text
First array sum  = 5
Second array sum = 0
```

I choose `5` and add `6`.

After `6`:

```text
First array sum  = 8
Second array sum = 9
```

I choose `9`.

Final result:

```text
5 + 4 + 5 + 6 + 9 = 29
```

## How to Use / Run Locally

First, clone the GitHub repository or download the source files.

### C++

Save the C++ solution in a file such as:

```text
main.cpp
```

Compile it with:

```bash
g++ main.cpp -o main
```

Run it with:

```bash
./main
```

On Windows, run:

```bash
main.exe
```

### Java

Save the Java solution in:

```text
Main.java
```

Compile it with:

```bash
javac Main.java
```

Run it with:

```bash
java Main
```

Make sure the public class name matches the file name when running the solution locally.

### JavaScript

Save the JavaScript solution in:

```text
main.js
```

Make sure Node.js is installed.

Run the file with:

```bash
node main.js
```

### Python3

Save the Python solution in:

```text
main.py
```

Run it with:

```bash
python3 main.py
```

On some systems, the command may be:

```bash
python main.py
```

The GeeksforGeeks version only requires the solution class and function. For local testing, add your own input arrays and print the returned result.

## Notes & Optimizations

The arrays must be sorted for the two-pointer approach to work correctly.

The solution assumes that elements inside each individual array are distinct, as given in the problem constraints.

If there are no common elements, the answer is simply the larger total sum of the two arrays.

If every element is common, each value is counted once and both pointers move together through the arrays.

A brute-force approach could try different switching choices, but that would do unnecessary work.

Another possible approach is to store common elements and segment sums separately. However, that requires extra space and does not improve the time complexity.

The two-pointer technique is the best fit here because the arrays are already sorted.

The algorithm is already optimized to `O(n + m)` time and `O(1)` extra space, so there is no need for dynamic programming or additional data structures.

For larger constraints, the sum variables may need a wider integer type depending on the programming language and platform.

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)

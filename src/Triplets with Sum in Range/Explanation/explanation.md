# Triplets with Sum in Range

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

Given an integer array `arr` and two integers `l` and `r`, the task is to count how many different triplets of elements have a sum that falls inside the inclusive range `[l, r]`.

A triplet must contain three different positions from the array.

For example, if the array is:

`[8, 3, 5, 2]`

and the range is `[7, 11]`, the triplet `[2, 3, 5]` has a sum of `10`, so it is counted.

The goal is to solve the problem efficiently instead of checking every possible triplet with three nested loops.

This repository contains an optimized solution using sorting and the two-pointer technique.

## Constraints

| Constraint                | Meaning                                            |
| ------------------------- | -------------------------------------------------- |
| `1 <= arr.size() <= 10^3` | The array can contain up to 1000 elements.         |
| `1 <= arr[i] <= 10^3`     | Every array element is between 1 and 1000.         |
| `1 <= l <= r <= 10^9`     | The required sum range is between 1 and 1 billion. |

## Intuition

My first thought was to choose three elements and check their sum. That would work, but three nested loops would give `O(n^3)` time complexity.

With up to 1000 elements, that can become too slow.

I then noticed that sorting the array gives me a useful property. Once the array is sorted, I can fix one element and use two pointers to find valid pairs for the other two elements.

There is another useful trick here.

Instead of directly counting triplets whose sum is between `l` and `r`, I count two simpler things:

* Number of triplets with sum `<= r`
* Number of triplets with sum `<= l - 1`

The required answer is:

`count(sum <= r) - count(sum <= l - 1)`

This converts the range-counting problem into a simpler two-pointer problem.

## Approach

I first sort the array.

Then I create a helper function that counts the number of triplets whose sum is less than or equal to a given target.

For every index `i`, I treat `arr[i]` as the first element.

I place:

* `left` at `i + 1`
* `right` at the last index

I calculate the sum of these three elements.

If the sum is less than or equal to the target, I know that every index between `left` and `right - 1` can also create a valid triplet because the array is sorted.

So instead of checking every pair separately, I add `right - left` directly to the answer and move `left` forward.

If the sum is greater than the target, I move `right` backward to reduce the sum.

I repeat this for every possible first element.

Finally, I calculate:

`countLessEqual(r) - countLessEqual(l - 1)`

This gives the number of triplets whose sum belongs to `[l, r]`.

## Data Structures Used

### Sorted Array

I use the input array itself after sorting it.

Sorting is important because it allows the two-pointer technique to work. I can increase `left` to increase the sum or decrease `right` to decrease the sum.

### Two Pointers

I use two integer variables, `left` and `right`, instead of creating another data structure.

`left` represents the second element of the triplet, while `right` represents the third element.

No hash map, set, or additional array is required.

## Operations & Behavior Summary

1. Sort the input array.
2. Create a helper function to count triplets with sum `<= target`.
3. Fix the first element using index `i`.
4. Set `left = i + 1`.
5. Set `right = n - 1`.
6. Calculate the current triplet sum.
7. If the sum is `<= target`, add `right - left` to the count.
8. Move `left` forward.
9. If the sum is `> target`, move `right` backward.
10. Continue until `left` and `right` meet.
11. Repeat for every possible `i`.
12. Calculate `countLessEqual(r) - countLessEqual(l - 1)`.
13. Return the final count.

## Complexity

| Type             | Complexity             | Explanation                                                                                                                                  |
| ---------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Time Complexity  | `O(n^2)`               | Sorting takes `O(n log n)`, and the two-pointer traversal takes `O(n)` for each of the `n` choices of the first element.                     |
| Space Complexity | `O(1)` auxiliary space | Only a few variables and two pointers are used. No extra data structure is required apart from the sorting implementation's internal memory. |

Here, `n` is the number of elements in the input array.

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    
    // Count how many triplets have a sum <= target.
    long long countLessEqual(vector<int> &arr, int target) {
        int n = arr.size(); // Store the number of elements in the array.
        long long count = 0; // Store the number of valid triplets.

        // Fix the first element of the triplet one by one.
        for (int i = 0; i < n - 2; i++) {
            int left = i + 1; // Start the second element just after i.
            int right = n - 1; // Start the third element at the end.

            // Move the two pointers until they cross.
            while (left < right) {
                // Calculate the current triplet sum.
                long long sum = (long long)arr[i] + arr[left] + arr[right];

                if (sum <= target) {
                    // Because the array is sorted, every index from left to right - 1
                    // can pair with arr[right] and still produce a sum <= target.
                    count += right - left;

                    // Move left forward to check larger second elements.
                    left++;
                } else {
                    // The sum is too large, so move right backward
                    // to make the next sum smaller.
                    right--;
                }
            }
        }

        return count; // Return the total number of triplets with sum <= target.
    }

    int countTriplets(vector<int> &arr, int l, int r) {
        // Sort the array so the two-pointer technique can be used.
        sort(arr.begin(), arr.end());

        // Count triplets with sum <= r, then remove those with sum < l.
        long long result = countLessEqual(arr, r) - countLessEqual(arr, l - 1);

        // The maximum number of triplets for n <= 1000 fits in int.
        return (int)result;
    }
};
```

### Java

```java
class Solution {

    // Count how many triplets have a sum <= target.
    private long countLessEqual(int[] arr, int target) {
        int n = arr.length; // Store the number of elements in the array.
        long count = 0; // Store the number of valid triplets.

        // Fix the first element of the triplet one by one.
        for (int i = 0; i < n - 2; i++) {
            int left = i + 1; // Start the second element just after i.
            int right = n - 1; // Start the third element at the end.

            // Move the two pointers until they cross.
            while (left < right) {
                // Use long so the addition is safe for the allowed values.
                long sum = (long) arr[i] + arr[left] + arr[right];

                if (sum <= target) {
                    // Since the array is sorted, every index from left to right - 1
                    // forms a valid triplet with arr[i] and arr[right].
                    count += right - left;

                    // Move left forward to try a larger second element.
                    left++;
                } else {
                    // The sum is too large, so decrease the third element.
                    right--;
                }
            }
        }

        return count; // Return the number of triplets with sum <= target.
    }

    public int countTriplets(int[] arr, int l, int r) {
        // Sort the array so the two-pointer technique works correctly.
        Arrays.sort(arr);

        // Count sums <= r and subtract sums <= l - 1.
        long result = countLessEqual(arr, r) - countLessEqual(arr, l - 1);

        // For n <= 1000, the answer fits safely inside an int.
        return (int) result;
    }
}
```

### JavaScript

```javascript
class Solution {
    // Count how many triplets have a sum <= target.
    countLessEqual(arr, target) {
        const n = arr.length; // Store the number of elements in the array.
        let count = 0; // Store the number of valid triplets.

        // Fix the first element of the triplet one by one.
        for (let i = 0; i < n - 2; i++) {
            let left = i + 1; // Start the second element just after i.
            let right = n - 1; // Start the third element at the end.

            // Move the two pointers until they cross.
            while (left < right) {
                // Calculate the sum of the current three elements.
                const sum = arr[i] + arr[left] + arr[right];

                if (sum <= target) {
                    // Because the array is sorted, all indices from left to right - 1
                    // also produce valid triplets with arr[i] and arr[right].
                    count += right - left;

                    // Move left forward to check the next possible pair.
                    left++;
                } else {
                    // The sum is too large, so move right backward
                    // to reduce the sum.
                    right--;
                }
            }
        }

        return count; // Return the number of triplets with sum <= target.
    }

    countTriplets(arr, l, r) {
        // Sort numerically because JavaScript's default sort is lexicographical.
        arr.sort((a, b) => a - b);

        // Count sums <= r and subtract sums <= l - 1.
        const result = this.countLessEqual(arr, r) -
                       this.countLessEqual(arr, l - 1);

        // The maximum answer for n <= 1000 fits safely in JavaScript's Number.
        return result;
    }
}
```

### Python3

```python
class Solution:
   
    # Count how many triplets have a sum <= target.
    def countLessEqual(self, arr: list[int], target: int) -> int:
        n = len(arr)  # Store the number of elements in the array.
        count = 0  # Store the number of valid triplets.

        # Fix the first element of the triplet one by one.
        for i in range(n - 2):
            left = i + 1  # Start the second element just after i.
            right = n - 1  # Start the third element at the end.

            # Move the two pointers until they cross.
            while left < right:
                # Calculate the sum of the current three elements.
                total = arr[i] + arr[left] + arr[right]

                if total <= target:
                    # Because the array is sorted, every index from left to right - 1
                    # also forms a valid triplet with arr[i] and arr[right].
                    count += right - left

                    # Move left forward to check larger second elements.
                    left += 1
                else:
                    # The sum is too large, so move right backward
                    # to make the sum smaller.
                    right -= 1

        return count  # Return the number of triplets with sum <= target.

    def countTriplets(self, arr: list[int], l: int, r: int) -> int:
        # Sort the array so the two-pointer technique can be used.
        arr.sort()

        # Count sums <= r and subtract sums <= l - 1.
        result = self.countLessEqual(arr, r) - self.countLessEqual(arr, l - 1)

        # Return the number of triplets whose sum is inside [l, r].
        return result
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The main logic is the same in all four languages. The only differences are syntax, sorting functions, and a few language-specific details.

### 1. Sorting the array

I start by sorting the array.

For example:

`[8, 3, 5, 2]`

becomes:

`[2, 3, 5, 8]`

This makes the two-pointer technique possible.

If the current sum is too large, I can move `right` backward and know that the sum will become smaller.

If the current sum is small enough, I can move `left` forward and know that the second element becomes larger.

In C++, I use `sort()`.

In Java, I use `Arrays.sort()`.

In JavaScript, I use `arr.sort((a, b) => a - b)` because the default JavaScript sort compares values as strings.

In Python3, `arr.sort()` sorts the integer values directly.

### 2. Counting triplets up to a target

I use a helper function conceptually called `countLessEqual`.

Its job is simple:

"Count every triplet whose sum is less than or equal to `target`."

This helper is called twice later.

### 3. Fixing the first element

I use a loop over the array.

The current index `i` becomes the first element of the triplet.

I only go until `n - 3`, because two more elements are needed after `i`.

For example, with five elements, the first element can only be selected from the first three positions.

### 4. Setting the two pointers

After fixing `i`, I set:

`left = i + 1`

and:

`right = n - 1`

This means the two remaining elements are searched between these two positions.

### 5. Checking the current sum

I calculate:

`arr[i] + arr[left] + arr[right]`

There are two possible cases.

If the sum is too large, I decrease `right`.

If the sum is small enough, I count multiple triplets at once.

### 6. Why `right - left` triplets can be counted at once

This is the most important part of the algorithm.

Suppose the sorted array is:

`[1, 2, 3, 4, 5]`

and the current pointers are:

`left = 1`

`right = 4`

The current triplet is:

`1 + 2 + 5 = 8`

Suppose the target is `8`.

Since the array is sorted, the following are also valid:

`1 + 3 + 5 = 9`

Actually, this one is not valid, which shows why the exact pointer relationship matters.

For the correct counting case, suppose the target is `10`:

`1 + 2 + 5 = 8`

Then:

`1 + 3 + 5 = 9`

and:

`1 + 4 + 5 = 10`

are all valid.

So when `arr[i] + arr[left] + arr[right] <= target`, every second-element index from `left` through `right - 1` works with the current `right`.

The number of such choices is:

`right - left`

This lets me count several triplets in one operation.

### 7. Moving `left`

When the current sum is valid, I move `left` forward.

The current `right` has already been used to count all valid second-element positions from `left` to `right - 1`.

Moving `left` allows me to find the next group of possible pairs.

### 8. Moving `right`

When the sum is greater than the target, I move `right` backward.

Because the array is sorted, choosing a smaller value at `right` can only decrease the triplet sum.

Moving `left` in this situation would make the sum larger, so it would not help.

### 9. Converting the range into two prefix counts

After counting triplets for one target, I can solve the original range condition.

For the required range:

`[l, r]`

I calculate:

`count(sum <= r) - count(sum <= l - 1)`

The first value includes everything up to `r`.

The second value removes everything below `l`.

What remains is exactly the number of sums in `[l, r]`.

### 10. Integer types

The number of possible triplets is:

`n * (n - 1) * (n - 2) / 6`

For `n = 1000`, this is much larger than a typical small integer value.

So C++ and Java use `long long` and `long` for the internal count.

Python3 integers automatically handle large integer values.

JavaScript's `Number` can safely represent the maximum possible answer for these constraints.

### 11. Edge cases

If the array contains fewer than three elements, there cannot be any triplet.

If no triplet has a sum inside the given range, the answer is `0`.

If all possible triplets have sums inside the range, every possible combination of three positions is counted.

Duplicate values are also handled correctly. Different positions are considered different elements, so the algorithm does not remove duplicates from the array.

## Examples

### Example 1

Input:

```text
arr = [8, 3, 5, 2]
l = 7
r = 11
```

After sorting:

```text
[2, 3, 5, 8]
```

The possible triplets include:

`2 + 3 + 5 = 10`

`2 + 3 + 8 = 13`

`2 + 5 + 8 = 15`

`3 + 5 + 8 = 16`

Only `10` belongs to `[7, 11]`.

Expected output:

```text
1
```

### Example 2

Input:

```text
arr = [5, 1, 4, 3, 2]
l = 2
r = 7
```

After sorting:

```text
[1, 2, 3, 4, 5]
```

Some valid triplets are:

`1 + 2 + 3 = 6`

`1 + 2 + 4 = 7`

Both sums are inside `[2, 7]`.

Expected output:

```text
2
```

### Example 3

Input:

```text
arr = [1, 1, 1, 1]
l = 3
r = 3
```

Every combination of three positions produces:

`1 + 1 + 1 = 3`

There are four different ways to choose three positions from four elements.

Expected output:

```text
4
```

## How to Use / Run Locally

### C++

Save the solution in a file such as `solution.cpp`.

If your file contains a complete program with input handling, compile it using:

```bash
g++ -std=c++17 solution.cpp -o solution
```

Then run:

```bash
./solution
```

On Windows, you can run:

```bash
solution.exe
```

For a GeeksforGeeks submission, paste the C++ class and method into the required editor instead of adding your own `main()` unless the platform asks for one.

### Java

Save the solution in a Java file.

Compile it with:

```bash
javac Solution.java
```

Then run:

```bash
java Solution
```

For GeeksforGeeks, use the required `Solution` class and submit the method according to the platform's expected format.

### JavaScript

Save the solution in a file such as `solution.js`.

Run it with Node.js:

```bash
node solution.js
```

You can check that Node.js is installed with:

```bash
node --version
```

For an online judge, use the class and method format expected by the platform.

### Python3

Save the solution in a file such as `solution.py`.

Run it with:

```bash
python3 solution.py
```

You can check the installed Python version with:

```bash
python3 --version
```

For GeeksforGeeks, paste the `Solution` class and required method into the editor.

## Notes & Optimizations

The straightforward three-loop solution takes `O(n^3)` time. I avoid that completely by sorting the array and using two pointers.

The range condition is also important. Trying to count `[l, r]` directly makes the pointer logic harder to manage. Counting `<= r` and subtracting `<= l - 1` makes the problem much simpler.

I sort the input array in place, so I do not need another array just for sorting.

The helper function is called twice, once for `r` and once for `l - 1`. Both calls take `O(n^2)`, so the overall complexity remains `O(n^2)`.

I use a wider integer type for the answer in C++ and Java because the number of possible triplets can be large.

The solution also handles duplicate values correctly because triplets are based on array positions, not unique values.

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)

# Max Product Subsequence of Size K

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

The problem gives an integer array `arr` and an integer `k`.

I need to choose exactly `k` elements from the array so that their product is as large as possible.

The selected elements must form a subsequence, which means I cannot reuse an element. The order of the selected elements does not affect the product.

For example:

```text
arr = [1, 2, 0, 3]
k = 2
```

The best choice is `2` and `3`.

```text
2 * 3 = 6
```

So the answer is:

```text
6
```

The main challenge is handling negative numbers. Two negative numbers produce a positive product, so sometimes the smallest elements in the sorted array are more useful than the largest ones.

This solution uses sorting and a two-pointer approach to find the maximum product subsequence efficiently.

## Constraints

| Constraint       | Range                  |
| ---------------- | ---------------------- |
| Array size       | `arr.size() <= 30`     |
| Element value    | `-10 <= arr[i] <= 10`  |
| Subsequence size | `1 <= k <= arr.size()` |

## Intuition

My first thought was to try every possible subsequence of size `k`. But that would generate a large number of combinations, so I wanted to find a smarter way.

The important observation is how negative numbers behave.

For example:

```text
(-8) * (-7) = 56
```

This can be much larger than:

```text
4 * 5 = 20
```

So I cannot simply choose the `k` largest numbers.

I sort the array first. After sorting, I can look at the two smallest available elements and the two largest available elements.

For every pair, I compare:

```text
smallest pair = arr[left] * arr[left + 1]
largest pair  = arr[right - 1] * arr[right]
```

I choose the pair that gives the larger product.

If `k` is odd and there is a positive number available, I take the largest element first. Then the remaining number of elements is even, so I can select the rest in pairs.

There is also one special case: if every element is non-positive and `k` is odd, the final product must be non-positive. In that situation, I take the `k` largest elements because they produce the maximum possible product.

## Approach

I solve the problem in these steps:

1. Sort the array in ascending order.

2. If `k == 1`, return the largest element.

3. If the largest element is non-positive and `k` is odd, take the `k` largest elements directly.

4. Create two pointers:

   * `left` points to the smallest available element.
   * `right` points to the largest available element.

5. If `k` is odd, take the largest element first and reduce `k` by one.

6. Now `k` is even, so process two elements at a time.

7. Calculate the product of the two elements at the left end.

8. Calculate the product of the two elements at the right end.

9. Choose the pair with the larger product.

10. Move the corresponding pointer by two positions.

11. Repeat until exactly `k` elements have been selected.

For example:

```text
Sorted array:

[-6, -5, -2, 1, 4, 7]
  ^                 ^
 left              right

k = 4

Left pair:
(-6) * (-5) = 30

Right pair:
4 * 7 = 28

Choose the left pair.

Remaining:
[-2, 1, 4, 7]
       ^     ^
      left  right

Left pair:
(-2) * 1 = -2

Right pair:
4 * 7 = 28

Choose the right pair.

Selected:
[-6, -5, 4, 7]

Product:
30 * 28 = 840
```

The important part is that I always compare pairs instead of choosing individual elements. This allows the solution to take advantage of two negative numbers producing a positive product.

## Data Structures Used

No extra data structure is required.

The solution uses:

* `arr` — the given array, which I sort in place.
* `left` — a pointer/index for the smallest available elements.
* `right` — a pointer/index for the largest available elements.
* `product` — stores the product of the selected elements.

Sorting the existing array avoids creating another array.

## Operations & Behavior Summary

The algorithm can be summarized as:

```text
Sort the array

If k == 1:
    return the largest element

If all values are non-positive and k is odd:
    multiply the k largest elements
    return the result

Set left = first index
Set right = last index

If k is odd:
    multiply the largest element
    move right
    decrease k

While k > 0:
    calculate product of left pair
    calculate product of right pair

    choose the pair with larger product

    move the selected side by 2
    decrease k by 2

Return the product
```

This reduces the problem from checking many subsequences to sorting once and then making a single scan using two pointers.

## Complexity

| Type  | Complexity             | Explanation                                                   |
| ----- | ---------------------- | ------------------------------------------------------------- |
| Time  | `O(n log n)`           | Sorting takes `O(n log n)`, while pair selection takes `O(n)` |
| Space | `O(1)` auxiliary space | Only a few variables and pointers are used                    |

Here, `n` is the number of elements in the array.

The sorting step is the most expensive part. After sorting, I only process the required elements in pairs, so that part takes linear time.

## Multi-language Solutions

### C++

```cpp

class Solution {
  public:
    int maxProduct(vector<int> &arr, int k) {
        // Sort the array so I can access the smallest and largest
        // elements using two pointers.
        sort(arr.begin(), arr.end());

        int n = arr.size();

        // If I need only one element, the largest element gives
        // the maximum possible product.
        if (k == 1) {
            return arr[n - 1];
        }

        // If every element is non-positive and k is odd,
        // the product cannot be made positive.
        // I take the k largest elements because they give
        // the maximum product in this case.
        if (arr[n - 1] <= 0 && k % 2 == 1) {
            int product = 1;

            // The last k elements are the largest elements.
            for (int i = n - k; i < n; ++i) {
                product *= arr[i];
            }

            return product;
        }

        int left = 0;       // Points to the two smallest available elements.
        int right = n - 1; // Points to the two largest available elements.
        int product = 1;   // Stores the product of the selected elements.

        // If k is odd, I must select one element first.
        // The largest element is the best choice.
        if (k % 2 == 1) {
            product *= arr[right];
            --right;
            --k;
        }

        // Now k is even, so I select elements in pairs.
        while (k > 0) {
            // Product of the two smallest available elements.
            // Two negative values can produce a large positive product.
            int leftProduct = arr[left] * arr[left + 1];

            // Product of the two largest available elements.
            int rightProduct = arr[right - 1] * arr[right];

            // Take whichever pair gives the larger product.
            if (leftProduct > rightProduct) {
                product *= leftProduct;
                left += 2; // Remove the two elements used from the left.
            } else {
                product *= rightProduct;
                right -= 2; // Remove the two elements used from the right.
            }

            // Two elements have been selected.
            k -= 2;
        }

        return product;
    }
};

```

### Java

```java

class Solution {
    public int maxProduct(int[] arr, int k) {
        // Sort the array so I can work with the smallest
        // and largest elements using two pointers.
        Arrays.sort(arr);

        int n = arr.length;

        // If k is 1, the largest element itself gives
        // the maximum possible product.
        if (k == 1) {
            return arr[n - 1];
        }

        // If all elements are non-positive and k is odd,
        // the final product cannot be positive.
        // I choose the k largest elements to get the maximum product.
        if (arr[n - 1] <= 0 && k % 2 == 1) {
            int product = 1;

            // The last k elements are the largest elements.
            for (int i = n - k; i < n; i++) {
                product *= arr[i];
            }

            return product;
        }

        int left = 0;       // Points to the smallest available elements.
        int right = n - 1; // Points to the largest available elements.
        int product = 1;   // Stores the product of selected elements.

        // For odd k, I first take the largest element.
        // This leaves an even number of elements to select in pairs.
        if (k % 2 == 1) {
            product *= arr[right];
            right--;
            k--;
        }

        // Select the remaining elements two at a time.
        while (k > 0) {
            // Product of the two smallest available elements.
            int leftProduct = arr[left] * arr[left + 1];

            // Product of the two largest available elements.
            int rightProduct = arr[right - 1] * arr[right];

            // Choose the pair that gives the larger product.
            if (leftProduct > rightProduct) {
                product *= leftProduct;
                left += 2; // Move past the two selected left elements.
            } else {
                product *= rightProduct;
                right -= 2; // Move past the two selected right elements.
            }

            // Two elements have been selected.
            k -= 2;
        }

        return product;
    }
}

```

### JavaScript

```javascript

/*
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
class Solution {
    maxProduct(arr, k) {
        // Sort the array numerically so the smallest and largest
        // elements can be accessed from both ends.
        arr.sort((a, b) => a - b);

        const n = arr.length;

        // If I need only one element, the largest element
        // gives the maximum possible product.
        if (k === 1) {
            return arr[n - 1];
        }

        // If all elements are non-positive and k is odd,
        // the product cannot be positive.
        // I take the k largest elements because they give
        // the maximum product in this situation.
        if (arr[n - 1] <= 0 && k % 2 === 1) {
            let product = 1;

            // The last k elements are the largest elements.
            for (let i = n - k; i < n; i++) {
                product *= arr[i];
            }

            return product;
        }

        let left = 0;       // Points to the two smallest available elements.
        let right = n - 1;  // Points to the two largest available elements.
        let product = 1;    // Stores the product of selected elements.

        // If k is odd, I take the largest element first.
        // This leaves an even number of elements for pair selection.
        if (k % 2 === 1) {
            product *= arr[right];
            right--;
            k--;
        }

        // Select the remaining elements in pairs.
        while (k > 0) {
            // Product of the two smallest available elements.
            // Two negative numbers can create a large positive product.
            const leftProduct = arr[left] * arr[left + 1];

            // Product of the two largest available elements.
            const rightProduct = arr[right - 1] * arr[right];

            // Choose whichever pair gives the larger product.
            if (leftProduct > rightProduct) {
                product *= leftProduct;
                left += 2; // Move past the two selected left elements.
            } else {
                product *= rightProduct;
                right -= 2; // Move past the two selected right elements.
            }

            // Two elements have been selected.
            k -= 2;
        }

        return product;
    }
}

```

### Python3

```python

class Solution:
    def maxProduct(self, arr: list[int], k: int) -> int:
        # Sort the array so I can access the smallest and largest
        # elements using two pointers.
        arr.sort()

        n = len(arr)

        # If I need only one element, the largest element gives
        # the maximum possible product.
        if k == 1:
            return arr[n - 1]

        # If all elements are non-positive and k is odd,
        # the product cannot be positive.
        # I take the k largest elements because they give
        # the maximum product in this case.
        if arr[n - 1] <= 0 and k % 2 == 1:
            product = 1

            # The last k elements are the largest elements.
            for i in range(n - k, n):
                product *= arr[i]

            return product

        left = 0       # Points to the smallest available elements.
        right = n - 1  # Points to the largest available elements.
        product = 1    # Stores the product of selected elements.

        # If k is odd, I take the largest element first.
        # This leaves an even number of elements to choose in pairs.
        if k % 2 == 1:
            product *= arr[right]
            right -= 1
            k -= 1

        # Select the remaining elements two at a time.
        while k > 0:
            # Product of the two smallest available elements.
            # Two negative numbers can create a large positive product.
            left_product = arr[left] * arr[left + 1]

            # Product of the two largest available elements.
            right_product = arr[right - 1] * arr[right]

            # Choose the pair that gives the larger product.
            if left_product > right_product:
                product *= left_product
                left += 2  # Move past the two selected left elements.
            else:
                product *= right_product
                right -= 2  # Move past the two selected right elements.

            # Two elements have been selected.
            k -= 2

        return product

```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The implementation in each language follows the same algorithm. Only the syntax and sorting functions are different.

### 1. Sorting the array

I first sort the array in ascending order.

```text
Before:
[2, -6, 4, -5, 7, 1]

After:
[-6, -5, 1, 2, 4, 7]
```

This gives me direct access to both ends of the array.

The left side contains the smallest values, while the right side contains the largest values.

In C++, I use `sort()`.

In Java, I use `Arrays.sort()`.

In JavaScript, I use a numeric comparison function because the default `sort()` treats values as strings.

In Python3, the built-in `sort()` correctly sorts integers.

### 2. Handling `k == 1`

If only one element is required, the answer is simply the largest element.

```text
arr = [-4, 2, 8, 3]
k = 1

Answer = 8
```

There is no reason to run the pair-selection logic in this case.

### 3. Handling all non-positive values

Suppose the array is:

```text
[-9, -6, -4, -2]
```

and:

```text
k = 3
```

Since all values are non-positive and `k` is odd, the product will always be non-positive.

So I want the product with the smallest negative magnitude possible.

I choose the three largest values:

```text
[-6, -4, -2]

Product = (-6) * (-4) * (-2)
        = -48
```

Choosing smaller values would make the negative result worse.

### 4. Creating the two pointers

I set:

```text
left  = 0
right = n - 1
```

For a sorted array:

```text
[-10, -8, -3, 2, 5, 9]
   ^                 ^
 left              right
```

The left pointer lets me examine two small elements.

The right pointer lets me examine two large elements.

### 5. Handling odd `k`

If `k` is odd, I first select the largest element.

For example:

```text
arr = [-8, -7, 1, 3, 6]
k = 3
```

I select:

```text
6
```

Now:

```text
k = 2
```

The remaining selection can be made using one pair.

This works because the largest element is the best single positive element to include.

### 6. Comparing the two possible pairs

For every pair-selection step, I calculate:

```text
left pair:
arr[left] * arr[left + 1]

right pair:
arr[right - 1] * arr[right]
```

For example:

```text
[-10, -8, -2, 1, 4, 7]
  ^                 ^

Left pair:
(-10) * (-8) = 80

Right pair:
4 * 7 = 28
```

The left pair is better, so I choose `-10` and `-8`.

This is the main trick in the solution.

### 7. Moving the pointers

If I choose the left pair:

```text
left += 2
```

If I choose the right pair:

```text
right -= 2
```

I move by two because two elements have already been selected.

### 8. Updating `k`

After choosing a pair:

```text
k -= 2
```

This keeps track of how many elements are still required.

When `k` reaches zero, exactly the required number of elements has been selected.

### 9. C++ behavior

The C++ version uses `vector<int>` as the input array and `sort()` from the standard library.

The product is stored in an `int`, which matches the expected constraints of the problem.

The two-pointer logic remains exactly the same as the general approach.

### 10. Java behavior

The Java version receives the array as an `int[]`.

I use `Arrays.sort(arr)` to sort the array.

The pointers are simple integer indexes, and the product is updated after every selected pair.

### 11. JavaScript behavior

JavaScript needs one important sorting detail.

This:

```javascript
arr.sort()
```

does not perform numeric sorting reliably because JavaScript's default sort compares values as strings.

So the numeric form is:

```javascript
arr.sort((a, b) => a - b)
```

After that, the two-pointer logic is identical to the other implementations.

### 12. Python3 behavior

Python makes the implementation shorter because `list.sort()` directly sorts integers numerically.

The algorithm still uses the same `left` and `right` pointers and compares the two possible pairs at every step.

## Examples

### Example 1

Input:

```text
arr = [1, 2, 0, 3]
k = 2
```

Sorted array:

```text
[0, 1, 2, 3]
```

Compare the available pairs:

```text
0 * 1 = 0
2 * 3 = 6
```

Choose `2` and `3`.

Output:

```text
6
```

### Example 2

Input:

```text
arr = [1, 2, -1, -3, -6, 4]
k = 4
```

Sorted array:

```text
[-6, -3, -1, 1, 2, 4]
```

First comparison:

```text
(-6) * (-3) = 18
2 * 4        = 8
```

Choose `-6` and `-3`.

Next comparison:

```text
(-1) * 1 = -1
2 * 4    = 8
```

Choose `2` and `4`.

Selected elements:

```text
[-6, -3, 2, 4]
```

Product:

```text
(-6) * (-3) * 2 * 4
= 144
```

Output:

```text
144
```

### Example 3

Input:

```text
arr = [-8, -6, -4, -2]
k = 3
```

All elements are non-positive and `k` is odd.

So I choose the three largest elements:

```text
[-6, -4, -2]
```

Product:

```text
(-6) * (-4) * (-2)
= -48
```

Output:

```text
-48
```

## How to Use / Run Locally

The code blocks above are intentionally empty so the solution code can be added separately.

### C++

Save the solution as `solution.cpp`.

Compile it with:

```bash
g++ -std=c++17 solution.cpp -o solution
```

Run it with:

```bash
./solution
```

On Windows, run:

```bash
solution.exe
```

### Java

Save the solution as `Solution.java`.

Compile it with:

```bash
javac Solution.java
```

Run it with:

```bash
java Solution
```

### JavaScript

Save the solution as `solution.js`.

Run it with Node.js:

```bash
node solution.js
```

You can check whether Node.js is installed with:

```bash
node --version
```

### Python3

Save the solution as `solution.py`.

Run it with:

```bash
python3 solution.py
```

You can check the Python version with:

```bash
python3 --version
```

## Notes & Optimizations

The most important edge case is the presence of negative numbers.

I cannot simply select the largest `k` elements because two negative numbers can create a much larger positive product.

For example:

```text
(-10) * (-9) = 90
```

while:

```text
7 * 8 = 56
```

So both ends of the sorted array need to be considered.

Another important case is when all values are non-positive and `k` is odd. There is no way to make the final product positive, so I choose the `k` largest values instead.

The solution modifies the input array by sorting it. If the original order must be preserved for another operation later, I would need to make a copy first. That would increase the extra space usage.

A brute-force solution would try every combination of `k` elements. That becomes expensive because the number of possible subsequences grows rapidly with `n`.

The sorting plus two-pointer method reduces the main work to `O(n log n)` time and uses only constant auxiliary space.

This makes the solution useful for the GeeksforGeeks **Max Product Subsequence of Size K** problem and is a good example of combining sorting, greedy pair selection, and two-pointer techniques.

## Author

Md Aarzoo Islam — [CodeWithAarzoo on Instagram](https://www.instagram.com/codewithaarzoo.in/?utm_source=chatgpt.com)

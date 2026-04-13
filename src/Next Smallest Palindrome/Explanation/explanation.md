# Next Smallest Palindrome

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
* [How to use / Run locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

## Problem Summary

Given a number in the form of an array `num[]`, where each element is a digit from `1` to `9`, I need to find the next smallest palindrome that is strictly greater than the given number.

A palindrome is a number that reads the same from left to right and right to left.

Example:

* Input: `[2, 3, 5, 4, 5]`
* Output: `[2, 3, 6, 3, 2]`

## Constraints

* `1 <= n <= 10^5`
* `1 <= num[i] <= 9`

## Intuition

I thought about how palindrome numbers work.

In every palindrome, the right half is always a mirror image of the left half.

So instead of changing the whole number, I only need to focus on the left side and middle.

My first idea was:

1. Copy the left half to the right half.
2. Check whether this new palindrome is already greater than the original number.
3. If it is not greater, then increase the middle digit(s) and propagate the carry if needed.

I also noticed one important edge case:

If all digits are `9`, then the next palindrome becomes:

* `9` -> `11`
* `99` -> `101`
* `999` -> `1001`

## Approach

1. Check whether all digits are `9`.
2. If yes, return `1` followed by zeros and then `1`.
3. Otherwise, compare the left and right halves from the middle outward.
4. Determine whether the left side is smaller than the right side.
5. Copy the left half into the right half.
6. If the copied palindrome is not strictly greater, then add `1` to the middle digit(s).
7. Handle carry propagation toward the left side.
8. Mirror the updated left side again to the right side.

## Data Structures Used

* Array / Vector / List to store digits.
* A few integer variables for pointers and carry.

No extra large data structures are needed.

## Operations & Behavior Summary

* Compare middle digits.
* Mirror left side to right side.
* Detect whether increment is required.
* Add carry to middle digits.
* Update both halves together.
* Handle odd and even length arrays.
* Handle all-9 cases separately.

## Complexity

* Time Complexity: `O(n)`

  * I scan the array a constant number of times.
  * `n` is the number of digits.

* Space Complexity: `O(1)`

  * I only use a few extra variables.
  * No extra array proportional to input size is used.

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    vector<int> nextPalindrome(vector<int>& num) {
        int n = num.size();

        // Case 1: If all digits are 9, answer is 100...001
        bool allNine = true;
        for (int x : num) {
            if (x != 9) {
                allNine = false;
                break;
            }
        }
        if (allNine) {
            vector<int> ans(n + 1, 0);
            ans[0] = 1;
            ans[n] = 1;
            return ans;
        }

        // Step 1: Check whether left side is smaller than right side
        int i = (n - 1) / 2;
        int j = n / 2;

        while (i >= 0 && num[i] == num[j]) {
            i--;
            j++;
        }

        bool leftSmaller = (i < 0 || num[i] < num[j]);

        // Step 2: Mirror left half to right half
        i = (n - 1) / 2;
        j = n / 2;
        while (i >= 0) {
            num[j] = num[i];
            i--;
            j++;
        }

        // Step 3: If left side was smaller, add 1 to the middle and handle carry
        if (leftSmaller) {
            int carry = 1;
            i = (n - 1) / 2;
            j = n / 2;

            while (i >= 0 && carry) {
                int val = num[i] + carry;
                num[i] = val % 10;
                carry = val / 10;
                num[j] = num[i];
                i--;
                j++;
            }
        }

        return num;
    }
}; 
```

### Java

```java
class Solution {
    static int[] nextPalindrome(int[] num) {
        int n = num.length;

        // Case 1: If all digits are 9, answer is 100...001
        boolean allNine = true;
        for (int x : num) {
            if (x != 9) {
                allNine = false;
                break;
            }
        }
        if (allNine) {
            int[] ans = new int[n + 1];
            ans[0] = 1;
            ans[n] = 1;
            return ans;
        }

        // Step 1: Check whether left side is smaller than right side
        int i = (n - 1) / 2;
        int j = n / 2;

        while (i >= 0 && num[i] == num[j]) {
            i--;
            j++;
        }

        boolean leftSmaller = (i < 0 || num[i] < num[j]);

        // Step 2: Mirror left half to right half
        i = (n - 1) / 2;
        j = n / 2;
        while (i >= 0) {
            num[j] = num[i];
            i--;
            j++;
        }

        // Step 3: If left side was smaller, add 1 to the middle and handle carry
        if (leftSmaller) {
            int carry = 1;
            i = (n - 1) / 2;
            j = n / 2;

            while (i >= 0 && carry > 0) {
                int val = num[i] + carry;
                num[i] = val % 10;
                carry = val / 10;
                num[j] = num[i];
                i--;
                j++;
            }
        }

        return num;
    }
}
```

### JavaScript

```javascript
class Solution {
    nextPalindrome(num) {
        let n = num.length;

        // Case 1: If all digits are 9, answer is 100...001
        let allNine = true;
        for (let x of num) {
            if (x !== 9) {
                allNine = false;
                break;
            }
        }
        if (allNine) {
            let ans = new Array(n + 1).fill(0);
            ans[0] = 1;
            ans[n] = 1;
            return ans;
        }

        // Step 1: Check whether left side is smaller than right side
        let i = Math.floor((n - 1) / 2);
        let j = Math.floor(n / 2);

        while (i >= 0 && num[i] === num[j]) {
            i--;
            j++;
        }

        let leftSmaller = (i < 0 || num[i] < num[j]);

        // Step 2: Mirror left half to right half
        i = Math.floor((n - 1) / 2);
        j = Math.floor(n / 2);
        while (i >= 0) {
            num[j] = num[i];
            i--;
            j++;
        }

        // Step 3: If left side was smaller, add 1 to the middle and handle carry
        if (leftSmaller) {
            let carry = 1;
            i = Math.floor((n - 1) / 2);
            j = Math.floor(n / 2);

            while (i >= 0 && carry) {
                let val = num[i] + carry;
                num[i] = val % 10;
                carry = Math.floor(val / 10);
                num[j] = num[i];
                i--;
                j++;
            }
        }

        return num;
    }
}
```

### Python3

```python
class Solution:
    def nextPalindrome(self, num):
        n = len(num)

        # Case 1: If all digits are 9, answer is 100...001
        if all(x == 9 for x in num):
            return [1] + [0] * (n - 1) + [1]

        # Step 1: Check whether left side is smaller than right side
        i = (n - 1) // 2
        j = n // 2

        while i >= 0 and num[i] == num[j]:
            i -= 1
            j += 1

        leftSmaller = (i < 0 or num[i] < num[j])

        # Step 2: Mirror left half to right half
        i = (n - 1) // 2
        j = n // 2
        while i >= 0:
            num[j] = num[i]
            i -= 1
            j += 1

        # Step 3: If left side was smaller, add 1 to the middle and handle carry
        if leftSmaller:
            carry = 1
            i = (n - 1) // 2
            j = n // 2

            while i >= 0 and carry:
                val = num[i] + carry
                num[i] = val % 10
                carry = val // 10
                num[j] = num[i]
                i -= 1
                j += 1

        return num
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

### Step 1: Check if all digits are 9

If every digit is `9`, then normal mirroring will not work.

Example:

* `9` -> `11`
* `99` -> `101`
* `999` -> `1001`

So I directly return a new palindrome.

### Step 2: Find the middle positions

I use:

```text
i = (n - 1) / 2
j = n / 2
```

For odd length:

```text
1 2 3 2 1
    ^
```

For even length:

```text
1 2 2 1
  ^ ^
```

### Step 3: Compare left and right side

I move outward while digits are equal.

This helps me know whether the left side is already smaller.

If left side is smaller, then only mirroring will not be enough.

### Step 4: Mirror left side to right side

I copy:

```text
num[j] = num[i]
```

This immediately forms a palindrome.

Example:

```text
1 2 3 4 5
becomes
1 2 3 2 1
```

### Step 5: Add 1 to the middle if needed

If the mirrored palindrome is not larger than the original number, I add `1` to the middle.

Then I keep propagating carry toward the left.

Example:

```text
1 2 9 2 1
becomes
1 3 0 3 1
```

### Step 6: Mirror updated digits again

Whenever I update the left side, I also copy it to the right side.

This ensures the number always remains a palindrome.

## Examples

### Example 1

```text
Input:  [2, 3, 5, 4, 5]
Output: [2, 3, 6, 3, 2]
```

Explanation:

* Mirror gives: `[2, 3, 5, 3, 2]`
* It is smaller than original.
* So I increase middle digit.
* Final answer becomes: `[2, 3, 6, 3, 2]`

### Example 2

```text
Input:  [9, 4, 1, 8, 7, 9, 7, 8, 3, 2, 2]
Output: [9, 4, 1, 8, 8, 0, 8, 8, 1, 4, 9]
```

### Example 3

```text
Input:  [9, 9, 9]
Output: [1, 0, 0, 1]
```

## How to use / Run locally

### C++

```bash
g++ solution.cpp -o solution
./solution
```

### Java

```bash
javac Solution.java
java Solution
```

### JavaScript

```bash
node solution.js
```

### Python3

```bash
python solution.py
```

## Notes & Optimizations

* I do not convert the array into a string or integer.
* This avoids overflow issues for very large input sizes.
* I only scan the array a few times.
* The solution works efficiently even for `10^5` digits.
* I update the input array directly, so extra memory usage stays very low.

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)

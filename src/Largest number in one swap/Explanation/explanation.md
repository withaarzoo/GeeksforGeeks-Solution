# Largest Number in One Swap

## Table of Contents

* Problem Summary
* Constraints
* Intuition
* Approach
* Data Structures Used
* Operations & Behavior Summary
* Complexity
* Multi-language Solutions

  * C++
  * Java
  * JavaScript
  * Python3
* Step-by-step Detailed Explanation
* Examples
* How to use / Run locally
* Notes & Optimizations
* Author

---

## Problem Summary

Given a numeric string `s`, the task is to return the lexicographically largest string that can be obtained by swapping at most one pair of characters.

A lexicographically larger string means the number becomes larger when compared from left to right.

If no beneficial swap exists, the original string should be returned.

---

## Constraints

* 1 <= |s| <= 10^5
* '0' <= s[i] <= '9'

---

## Intuition

When I first look at this problem, I notice that I can perform only one swap. So I want that swap to produce the maximum possible value.

A number becomes larger when a bigger digit appears earlier in the string. So my goal is to find a smaller digit on the left that can be replaced with a larger digit from the right side.

To maximize the result, I should always try to bring the largest possible digit forward. If the same digit appears multiple times, swapping with the rightmost occurrence produces the best result.

So the idea is simple: keep track of the last occurrence of every digit and try to swap a smaller digit with the largest possible digit that appears later in the string.

---

## Approach

1. Traverse the string and store the last occurrence index of every digit from 0 to 9.
2. Traverse the string again from left to right.
3. For each digit, check if a larger digit exists later in the string.
4. Check digits from 9 down to the current digit.
5. If a larger digit appears later, swap the current digit with the rightmost occurrence of that digit.
6. Return the result immediately because only one swap is allowed.
7. If no swap improves the number, return the original string.

---

## Data Structures Used

* Array of size 10 to store the last index of each digit.
* String or character array to perform swapping.

The array helps us quickly know whether a larger digit exists later in the string.

---

## Operations & Behavior Summary

1. Record the last occurrence of every digit.
2. Scan the string from left to right.
3. For each position check if a bigger digit exists later.
4. If yes, perform a swap with the rightmost occurrence.
5. Return the updated string immediately.

---

## Complexity

Time Complexity: O(n)

* n is the length of the string.
* One pass to store last occurrences.
* One pass to attempt the swap.

Space Complexity: O(1)

* Only a fixed array of size 10 is used.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
public:
    string largestSwap(string &s) {
        int n = s.length();
        vector<int> last(10, -1);

        for(int i = 0; i < n; i++){
            last[s[i] - '0'] = i;
        }

        for(int i = 0; i < n; i++){
            for(int d = 9; d > s[i] - '0'; d--){
                if(last[d] > i){
                    swap(s[i], s[last[d]]);
                    return s;
                }
            }
        }

        return s;
    }
};
```

### Java

```java
class Solution {
    public String largestSwap(String s) {
        char[] arr = s.toCharArray();
        int n = arr.length;
        int[] last = new int[10];

        for(int i = 0; i < n; i++){
            last[arr[i] - '0'] = i;
        }

        for(int i = 0; i < n; i++){
            for(int d = 9; d > arr[i] - '0'; d--){
                if(last[d] > i){
                    char temp = arr[i];
                    arr[i] = arr[last[d]];
                    arr[last[d]] = temp;
                    return new String(arr);
                }
            }
        }

        return s;
    }
}
```

### JavaScript

```javascript
class Solution {
    largestSwap(s) {
        let arr = s.split("");
        let n = arr.length;
        let last = new Array(10).fill(-1);

        for (let i = 0; i < n; i++) {
            last[arr[i] - '0'] = i;
        }

        for (let i = 0; i < n; i++) {
            for (let d = 9; d > arr[i] - '0'; d--) {
                if (last[d] > i) {
                    let temp = arr[i];
                    arr[i] = arr[last[d]];
                    arr[last[d]] = temp;
                    return arr.join("");
                }
            }
        }

        return s;
    }
}
```

### Python3

```python
class Solution:
    def largestSwap(self, s):
        arr = list(s)
        n = len(arr)
        last = [-1] * 10

        for i in range(n):
            last[int(arr[i])] = i

        for i in range(n):
            current = int(arr[i])

            for d in range(9, current, -1):
                if last[d] > i:
                    arr[i], arr[last[d]] = arr[last[d]], arr[i]
                    return "".join(arr)

        return s
```

---

## Step-by-step Detailed Explanation

Step 1: Store last occurrence of digits

We create an array of size 10 because digits range from 0 to 9.

This array tells us where each digit appears last in the string.

Example:

s = "768"

last[7] = 0
last[6] = 1
last[8] = 2

Step 2: Traverse the string

We scan the string from left to right because improving earlier digits gives a bigger number.

Step 3: Look for a larger digit

For every digit, we check digits from 9 down to the current digit.

If any of those digits appear later in the string, swapping will increase the number.

Step 4: Perform the swap

Once we find a larger digit that appears later, we swap the current digit with the rightmost occurrence of that larger digit.

Step 5: Return immediately

Since the problem allows only one swap, we return the result right after performing the swap.

If no swap improves the number, we return the original string.

---

## Examples

Input:

s = "768"

Output:

867

Explanation:

Swap 7 and 8 to get the largest number.

Example 2:

Input:

s = "333"

Output:

333

Explanation:

All digits are the same, so swapping does not improve the number.

---

## How to use / Run locally

1. Clone the repository

```
git clone https://github.com/your-username/your-repository.git
```

1. Navigate to the project folder

```
cd your-repository
```

1. Compile and run the desired language solution

Example for C++:

```
g++ solution.cpp
./a.out
```

Example for Python:

```
python solution.py
```

---

## Notes & Optimizations

* The algorithm runs in linear time.
* Only one swap is performed.
* Using the last occurrence array avoids nested scanning.
* Works efficiently even for strings of length up to 100000.

---

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)

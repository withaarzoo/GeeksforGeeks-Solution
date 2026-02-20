# Form the Largest Number

---

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
* [Step-by-step Detailed Explanation](#step-by-step-detailed-explanation)
* [Examples](#examples)
* [How to use / Run locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

---

## Problem Summary

Given an array of non-negative integers, arrange them such that after concatenating all of them together, it forms the largest possible number.

Since the number can be very large, we must return the answer as a string.

---

## Constraints

* 1 ≤ arr.size() ≤ 10^5
* 0 ≤ arr[i] ≤ 10^5
* Expected Time Complexity: O(n log n)
* Expected Auxiliary Space: O(n)

---

## Intuition

When I first looked at this problem, I thought I could just sort the numbers in descending order and join them.

But that does not always work.

For example:
3 and 30

If I sort normally in descending order → 30, 3 → 303
But if I arrange → 3, 30 → 330 which is bigger.

So I realized that normal numeric sorting is not correct.

Then I thought differently.
Instead of comparing numbers directly, what if I compare them after concatenating?

For two numbers a and b, I compare:

* a + b
* b + a

Whichever gives the larger result should come first.

That simple idea solves the entire problem.

---

## Approach

1. Convert all integers into strings.
2. Sort them using a custom comparator.
3. In comparator:

   * If a + b > b + a, then a comes first.
4. After sorting, join all strings.
5. Handle edge case:

   * If the first element is "0", return "0".

---

## Data Structures Used

* Array / Vector
* String array
* Custom comparator in sorting

No complex data structures are required.

---

## Operations & Behavior Summary

* Convert integers to strings.
* Apply custom sorting logic.
* Concatenate sorted strings.
* Handle edge case for multiple zeros.

---

## Complexity

**Time Complexity:** O(n log n)

* Sorting n elements takes O(n log n).
* Each comparison involves string concatenation of small numbers.

**Space Complexity:** O(n)

* We store numbers as strings.
* Sorting may use extra internal memory.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    static bool compare(string a, string b) {
        return a + b > b + a;
    }
    
    string findLargest(vector<int> &arr) {
        vector<string> nums;
        for(int num : arr) {
            nums.push_back(to_string(num));
        }
        
        sort(nums.begin(), nums.end(), compare);
        
        if(nums[0] == "0") return "0";
        
        string result = "";
        for(string s : nums) {
            result += s;
        }
        
        return result;
    }
};
```

---

### Java

```java
import java.util.*;

class Solution {
    public String findLargest(int[] arr) {
        String[] nums = new String[arr.length];
        
        for(int i = 0; i < arr.length; i++) {
            nums[i] = String.valueOf(arr[i]);
        }
        
        Arrays.sort(nums, (a, b) -> (b + a).compareTo(a + b));
        
        if(nums[0].equals("0")) return "0";
        
        StringBuilder sb = new StringBuilder();
        for(String s : nums) {
            sb.append(s);
        }
        
        return sb.toString();
    }
}
```

---

### JavaScript

```javascript
class Solution {
    findLargest(arr) {
        let nums = arr.map(num => num.toString());
        
        nums.sort((a, b) => (b + a).localeCompare(a + b));
        
        if(nums[0] === "0") return "0";
        
        return nums.join("");
    }
}
```

---

### Python3

```python
from functools import cmp_to_key

class Solution:

    def compare(self, a, b):
        if a + b > b + a:
            return -1
        elif a + b < b + a:
            return 1
        else:
            return 0

    def findLargest(self, arr):
        nums = list(map(str, arr))
        nums.sort(key=cmp_to_key(self.compare))
        
        if nums[0] == "0":
            return "0"
        
        return "".join(nums)
```

---

## Step-by-step Detailed Explanation

### Step 1: Convert numbers to strings

We convert every number into string because we need concatenation comparison.

### Step 2: Apply Custom Sorting

For two strings a and b:

* Compare a + b
* Compare b + a

If a + b is larger, place a first.

Example:
For 54 and 546:
54546
54654

Since 54654 is larger, 546 comes first.

### Step 3: Edge Case Handling

If all elements are zero:
Example: [0, 0, 0]
After sorting → ["0", "0", "0"]
We return "0" instead of "000".

### Step 4: Concatenate Result

Finally, join all sorted strings to form the largest number.

---

## Examples

Input: [3, 30, 34, 5, 9]
Output: 9534330

Input: [54, 546, 548, 60]
Output: 6054854654

Input: [3, 4, 6, 5, 9]
Output: 96543

---

## How to use / Run locally

### C++

Compile using:

```bash
g++ filename.cpp -o output
./output
```

### Java

```bash
javac Solution.java
java Solution
```

### JavaScript (Node.js)

```bash
node filename.js
```

### Python3

```bash
python3 filename.py
```

---

## Notes & Optimizations

* Do not sort normally by numeric value.
* Always use string concatenation comparison.
* Handle zero edge case carefully.
* Sorting dominates the time complexity.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)

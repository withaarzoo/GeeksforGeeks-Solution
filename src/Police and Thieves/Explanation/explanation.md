# Police and Thieves

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
* How to Use / Run Locally
* Notes & Optimizations
* Author

---

## Problem Summary

I am given an array where each element is either
P representing a policeman
T representing a thief

My task is to find the **maximum number of thieves** that can be caught by the police.

Rules
Each policeman can catch only one thief
A policeman can catch a thief only if the distance between them is at most `k`

---

## Constraints

1 ≤ array size ≤ 10⁵
1 ≤ k ≤ 1000
Each array element is either P or T

---

## Intuition

When I first saw the problem, I understood that this is a **matching problem**.

Each policeman can match with only one thief.
Distance matters, so random matching will not work.

I thought
If I match the **closest possible policeman with the closest possible thief**,
I will never waste a good opportunity.

So my goal became
Match police and thieves greedily while respecting distance `k`.

This naturally led me to a **two pointer greedy approach**.

---

## Approach

This is how I solved it step by step.

1. I traverse the array once.
2. I store all police positions in one list.
3. I store all thief positions in another list.
4. Both lists are already sorted because I scanned from left to right.
5. I use two pointers
   one for police
   one for thieves
6. If the distance between them is ≤ k
   I count one catch and move both pointers.
7. If the thief is too far left
   I move the thief pointer.
8. If the thief is too far right
   I move the police pointer.
9. I repeat until one list finishes.

This ensures maximum catches with minimum checks.

---

## Data Structures Used

Dynamic arrays or lists
Used only to store indices of police and thieves

No complex data structure is required.

---

## Operations & Behavior Summary

* Single scan to collect positions
* Linear matching using two pointers
* No nested loops
* No extra memory overhead apart from position lists
* Greedy matching ensures optimal result

---

## Complexity

**Time Complexity**
O(n)
n is the size of the array
Each index is processed at most once

**Space Complexity**
O(n)
Used to store police and thief positions

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int catchThieves(vector<char> &arr, int k) {
        vector<int> police, thieves;

        for (int i = 0; i < arr.size(); i++) {
            if (arr[i] == 'P') police.push_back(i);
            else thieves.push_back(i);
        }

        int i = 0, j = 0, count = 0;

        while (i < police.size() && j < thieves.size()) {
            if (abs(police[i] - thieves[j]) <= k) {
                count++;
                i++;
                j++;
            } else if (thieves[j] < police[i]) {
                j++;
            } else {
                i++;
            }
        }

        return count;
    }
};
```

---

### Java

```java
class Solution {
    public int catchThieves(char[] arr, int k) {
        ArrayList<Integer> police = new ArrayList<>();
        ArrayList<Integer> thieves = new ArrayList<>();

        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == 'P') police.add(i);
            else thieves.add(i);
        }

        int i = 0, j = 0, count = 0;

        while (i < police.size() && j < thieves.size()) {
            if (Math.abs(police.get(i) - thieves.get(j)) <= k) {
                count++;
                i++;
                j++;
            } else if (thieves.get(j) < police.get(i)) {
                j++;
            } else {
                i++;
            }
        }

        return count;
    }
}
```

---

### JavaScript

```javascript
class Solution {
    catchThieves(arr, k) {
        const police = [];
        const thieves = [];

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === 'P') police.push(i);
            else thieves.push(i);
        }

        let i = 0, j = 0, count = 0;

        while (i < police.length && j < thieves.length) {
            if (Math.abs(police[i] - thieves[j]) <= k) {
                count++;
                i++;
                j++;
            } else if (thieves[j] < police[i]) {
                j++;
            } else {
                i++;
            }
        }

        return count;
    }
}
```

---

### Python3

```python
class Solution:
    def catchThieves(self, arr, k):
        police = []
        thieves = []

        for i in range(len(arr)):
            if arr[i] == 'P':
                police.append(i)
            else:
                thieves.append(i)

        i = j = count = 0

        while i < len(police) and j < len(thieves):
            if abs(police[i] - thieves[j]) <= k:
                count += 1
                i += 1
                j += 1
            elif thieves[j] < police[i]:
                j += 1
            else:
                i += 1

        return count
```

---

## Step-by-step Detailed Explanation

1. I separate police and thieves by storing their indices.
2. This avoids unnecessary comparisons.
3. I use two pointers to scan both lists together.
4. If distance is valid, I count a successful catch.
5. Each police and thief is used only once.
6. Greedy matching avoids blocking future better matches.
7. The loop stops as soon as one list ends.

---

## Examples

Input
P T T P T
k = 1

Output
2

Explanation
First police catches the first thief
Second police catches one nearby thief

---

## How to Use / Run Locally

1. Copy the solution code for your language.
2. Paste it into your IDE or online compiler.
3. Call the function with the given array and value of k.
4. Print the returned value.

Works perfectly on GeeksforGeeks.

---

## Notes & Optimizations

* This solution is already optimal.
* No further optimization is needed.
* Avoid brute force O(n²) solutions.
* Two pointer greedy is the key insight.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)

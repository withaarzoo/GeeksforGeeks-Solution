# Bus Ticket Change

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

I am given an array where each element represents the money a passenger uses to buy a bus ticket.
Each bus ticket costs **5 coins**.

Passengers can pay using only:

* 5 coins
* 10 coins
* 20 coins

I must serve passengers **in order**, and for every passenger, I must return the **exact change** so that the final ticket cost becomes 5 coins.

My task is to check whether it is possible to serve **all passengers** without ever running out of change.

If it is possible, I return **true**.
Otherwise, I return **false**.

---

## Constraints

* 1 ≤ arr.size() ≤ 10⁵
* arr[i] can be only **5, 10, or 20**
* Ticket price is always **5 coins**

---

## Intuition

When I first looked at the problem, I noticed that the ticket price never changes.
It is always 5 coins.

So instead of tracking all money, I only need to focus on **change management**.

I realized:

* Paying with 5 needs no change
* Paying with 10 needs 5 back
* Paying with 20 needs 15 back

So the real challenge is
Do I always have enough **5 coins and 10 coins** to return correct change?

That observation simplifies the entire problem.

---

## Approach

I solve the problem using a **greedy approach**.

Steps I follow:

1. I keep two counters

   * one for 5-coin notes
   * one for 10-coin notes
2. I process passengers one by one
3. Based on the bill given:

   * If it is 5 → I store it
   * If it is 10 → I give one 5 as change
   * If it is 20 → I try to give
     first one 10 + one 5
     otherwise three 5s
4. If at any point I cannot give change, I immediately return false
5. If all passengers are served successfully, I return true

---

## Data Structures Used

No complex data structures are used.

I only use:

* Two integer variables to store counts of 5 and 10 coins

This keeps the solution fast and memory efficient.

---

## Operations & Behavior Summary

* Sequential processing of passengers
* Greedy selection of change
* Preference given to higher denominations when returning change
* Immediate failure when change is not possible

---

## Complexity

**Time Complexity:** `O(n)`
I traverse the passenger list once.
Here, `n` is the number of passengers.

**Space Complexity:** `O(1)`
Only constant extra space is used.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    bool canServe(vector<int> &arr) {
        int five = 0, ten = 0;

        for (int bill : arr) {
            if (bill == 5) {
                five++;
            } 
            else if (bill == 10) {
                if (five == 0) return false;
                five--;
                ten++;
            } 
            else {
                if (ten > 0 && five > 0) {
                    ten--;
                    five--;
                } 
                else if (five >= 3) {
                    five -= 3;
                } 
                else {
                    return false;
                }
            }
        }
        return true;
    }
};
```

---

### Java

```java
class Solution {
    public boolean canServe(int[] arr) {
        int five = 0, ten = 0;

        for (int bill : arr) {
            if (bill == 5) {
                five++;
            } 
            else if (bill == 10) {
                if (five == 0) return false;
                five--;
                ten++;
            } 
            else {
                if (ten > 0 && five > 0) {
                    ten--;
                    five--;
                } 
                else if (five >= 3) {
                    five -= 3;
                } 
                else {
                    return false;
                }
            }
        }
        return true;
    }
}
```

---

### JavaScript

```javascript
class Solution {
    canServe(arr) {
        let five = 0, ten = 0;

        for (let bill of arr) {
            if (bill === 5) {
                five++;
            } 
            else if (bill === 10) {
                if (five === 0) return false;
                five--;
                ten++;
            } 
            else {
                if (ten > 0 && five > 0) {
                    ten--;
                    five--;
                } 
                else if (five >= 3) {
                    five -= 3;
                } 
                else {
                    return false;
                }
            }
        }
        return true;
    }
}
```

---

### Python3

```python
class Solution:
    def canServe(self, arr):
        five = 0
        ten = 0

        for bill in arr:
            if bill == 5:
                five += 1
            elif bill == 10:
                if five == 0:
                    return False
                five -= 1
                ten += 1
            else:
                if ten > 0 and five > 0:
                    ten -= 1
                    five -= 1
                elif five >= 3:
                    five -= 3
                else:
                    return False

        return True
```

---

## Step-by-step Detailed Explanation

I start with zero change.

For every passenger:

* If they give 5, I save it
* If they give 10, I return one 5
* If they give 20, I return 15 using best possible combination

I always try to save smaller coins for future passengers.

If at any moment I cannot give exact change, I stop and return false.

---

## Examples

**Input**

```bash
[5, 5, 5, 10, 20]
```

**Output**

```bash
true
```

**Input**

```bash
[5, 5, 10, 10, 20]
```

**Output**

```bash
false
```

---

## How to Use / Run Locally

1. Copy the solution code for your preferred language
2. Paste it inside your local compiler or IDE
3. Call `canServe()` with an integer array
4. Run and verify the output

---

## Notes & Optimizations

* This is a greedy problem
* No sorting is required
* Early exit improves performance
* Works efficiently even for large inputs

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)

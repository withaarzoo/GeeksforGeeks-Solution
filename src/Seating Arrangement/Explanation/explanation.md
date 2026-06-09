# Seating Arrangement

A beginner-friendly greedy algorithm solution for the GeeksforGeeks Seating Arrangement problem. This repository contains an optimized approach to determine whether it is possible to seat `k` additional people in a row of seats without placing any two occupied seats next to each other.

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

Given an integer `k` representing the number of people that need seats and an array called `seats`, determine whether all `k` people can be seated.

The seating rule is simple:

* `0` represents an empty seat.
* `1` represents an occupied seat.
* No two occupied seats can be adjacent.
* Newly seated people must also follow this rule.

The goal is to return `true` if all `k` people can be seated safely, otherwise return `false`.

This is a classic greedy algorithm problem that focuses on making locally optimal decisions while scanning the array.

## Constraints

| Constraint             | Value            |
| ---------------------- | ---------------- |
| 0 ≤ k ≤ 10⁵            | Number of people |
| 1 ≤ seats.size() ≤ 10⁵ | Number of seats  |
| seats[i] ∈ {0,1}       | Seat state       |

## Intuition

The first thing I noticed was that a person can only sit in an empty seat if both neighboring positions are also empty.

Instead of trying different seating arrangements, I realized I could simply scan the array from left to right and place a person whenever I find a valid position.

Since placing a person only affects nearby seats, a greedy strategy works perfectly here. Every time I find a safe seat, I immediately use it.

If I can place at least `k` people before reaching the end of the array, the answer is `true`.

## Approach

1. Traverse the seats array from left to right.
2. Skip seats that are already occupied.
3. For every empty seat:

   * Check the left neighbor.
   * Check the right neighbor.
4. If both sides are empty (or out of bounds), place a person.
5. Mark the seat as occupied.
6. Decrease `k`.
7. If `k` becomes zero, return `true`.
8. After the traversal finishes, return whether all people were seated.

This approach guarantees the maximum possible placements while using only one pass through the array.

## Data Structures Used

### Array

The input array is used directly to store and update seat occupancy.

Why it was chosen:

* Already provided as input.
* Allows constant-time access to neighboring seats.
* No extra memory is required.

## Operations & Behavior Summary

The algorithm performs the following actions:

1. Start from the first seat.
2. Ignore seats that already contain a person.
3. Check whether the current empty seat is safe.
4. If safe:

   * Seat a person.
   * Update the seat state.
   * Reduce remaining people count.
5. Continue scanning.
6. Stop early if all required people are seated.
7. Return the final result.

This creates a simple and efficient greedy seating arrangement solution.

## Complexity

| Metric           | Complexity | Explanation                          |
| ---------------- | ---------- | ------------------------------------ |
| Time Complexity  | O(n)       | The seats array is scanned only once |
| Space Complexity | O(1)       | No extra data structures are used    |

Where:

* `n` = total number of seats.

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    bool canSeatAllPeople(int k, vector<int> &seats) {
        int n = seats.size();

        // No people need to be seated
        if (k == 0) return true;

        // Check every seat once
        for (int i = 0; i < n; i++) {

            // Skip if already occupied
            if (seats[i] == 1) continue;

            // Check left neighbor
            bool leftEmpty = (i == 0 || seats[i - 1] == 0);

            // Check right neighbor
            bool rightEmpty = (i == n - 1 || seats[i + 1] == 0);

            // If both sides are safe, seat a person here
            if (leftEmpty && rightEmpty) {
                seats[i] = 1; // Mark seat as occupied
                k--;          // One person seated

                // If everyone is seated, return true
                if (k == 0) return true;
            }
        }

        // Not enough valid seats found
        return false;
    }
};
```

### Java

```java
class Solution {
    public boolean canSeatAllPeople(int k, int[] seats) {
        int n = seats.length;

        // No people need seating
        if (k == 0) return true;

        // Traverse all seats
        for (int i = 0; i < n; i++) {

            // Skip occupied seats
            if (seats[i] == 1) continue;

            // Check left side
            boolean leftEmpty = (i == 0 || seats[i - 1] == 0);

            // Check right side
            boolean rightEmpty = (i == n - 1 || seats[i + 1] == 0);

            // Safe position found
            if (leftEmpty && rightEmpty) {
                seats[i] = 1; // Occupy seat
                k--;          // One person seated

                // All people seated
                if (k == 0) return true;
            }
        }

        // Could not seat everyone
        return false;
    }
}
```

### JavaScript

```javascript
/**
 * @param {number} k
 * @param {number[]} seats
 * @return {boolean}
 */

class Solution {
    canSeatAllPeople(k, seats) {
        const n = seats.length;

        // No people need seating
        if (k === 0) return true;

        // Visit every seat once
        for (let i = 0; i < n; i++) {

            // Skip occupied seat
            if (seats[i] === 1) continue;

            // Check left neighbor
            const leftEmpty = (i === 0 || seats[i - 1] === 0);

            // Check right neighbor
            const rightEmpty = (i === n - 1 || seats[i + 1] === 0);

            // Seat a person if both sides are safe
            if (leftEmpty && rightEmpty) {
                seats[i] = 1; // Mark occupied
                k--;          // One person seated

                // Everyone seated
                if (k === 0) return true;
            }
        }

        // Not enough space available
        return false;
    }
}
```

### Python3

```python
class Solution:
    def canSeatAllPeople(self, k, seats):
        n = len(seats)

        # No people need seating
        if k == 0:
            return True

        # Traverse every seat
        for i in range(n):

            # Skip occupied seats
            if seats[i] == 1:
                continue

            # Check left neighbor
            left_empty = (i == 0 or seats[i - 1] == 0)

            # Check right neighbor
            right_empty = (i == n - 1 or seats[i + 1] == 0)

            # Seat a person if position is valid
            if left_empty and right_empty:
                seats[i] = 1  # Mark occupied
                k -= 1        # One person seated

                # Everyone seated successfully
                if k == 0:
                    return True

        # Could not seat all people
        return False
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains exactly the same across all implementations.

### Step 1: Handle the Easy Case

If `k` is zero, nobody needs a seat.

The answer is immediately `true`.

### Step 2: Scan Every Seat

Move through the array from left to right.

Each seat is examined exactly once.

### Step 3: Skip Occupied Seats

If the current seat already contains a person, move to the next position.

No placement can happen there.

### Step 4: Check Both Neighbors

For an empty seat:

* The left side must be empty or not exist.
* The right side must be empty or not exist.

Boundary seats need special handling because they may have only one neighbor.

### Step 5: Place a Person

If both conditions are satisfied:

* Occupy the seat.
* Reduce `k`.

This ensures future checks correctly see the newly occupied seat.

### Step 6: Stop Early

Whenever `k` becomes zero:

* All required people have been seated.
* Return `true`.

This avoids unnecessary work.

### Step 7: Final Check

If the loop ends and some people still need seats:

* Not enough valid positions existed.
* Return `false`.

## Examples

### Example 1

Input

```text
k = 2
seats = [0, 0, 1, 0, 0, 0, 1]
```

Output

```text
true
```

Explanation

A person can sit at index `0` and another at index `4`.

All 2 people are seated successfully.

---

### Example 2

Input

```text
k = 1
seats = [0, 1, 0]
```

Output

```text
false
```

Explanation

The only empty seats are adjacent to an occupied seat.

No valid placement exists.

---

### Example 3

Input

```text
k = 3
seats = [0, 0, 0, 0, 0]
```

Output

```text
true
```

Explanation

People can sit at positions:

```text
0, 2, 4
```

All 3 people can be seated.

## How to Use / Run Locally

### C++

Compile

```bash
g++ main.cpp -o main
```

Run

```bash
./main
```

### Java

Compile

```bash
javac Main.java
```

Run

```bash
java Main
```

### JavaScript

Run

```bash
node main.js
```

### Python3

Run

```bash
python main.py
```

## Notes & Optimizations

### Edge Cases

* `k = 0`
* Single seat array
* All seats occupied
* All seats empty
* Seating possible only at boundaries
* Large input size near constraints

### Why Greedy Works

The earliest valid seat can always be taken without reducing future seating opportunities.

Because each placement only affects immediate neighbors, making the local best choice leads to the optimal result.

### Alternative Approaches

Possible alternatives include:

* Counting continuous empty segments
* Mathematical gap calculations

However, the greedy one-pass solution is simpler and already achieves optimal time complexity.

### Optimization Summary

* Single traversal
* Constant extra space
* Early termination when all people are seated

This makes the solution suitable for large input constraints and competitive programming contests.

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)

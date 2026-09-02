# Unoccupied Computers

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

The problem gives me `n` computers in a cafe and a string `s` representing customer events.

Each uppercase English letter represents one customer, and every letter appears exactly twice in the string:

* The first occurrence means the customer arrives.
* The second occurrence means the customer leaves.

When a customer arrives, they can use a computer only when at least one computer is free. If all computers are occupied, that customer is rejected.

I have to return the total number of customers who were unable to get a computer.

For example, with `n = 3` and `s = "GACCBBDDA GEE"` without spaces, I process every arrival and departure in order and count the customers who arrive when no computer is available.

This is a simple simulation problem that can be solved efficiently using an array to track each customer's state.

## Constraints

| Constraint                             | Description                                                       |        |                                                        |
| -------------------------------------- | ----------------------------------------------------------------- | ------ | ------------------------------------------------------ |
| `1 <= n <= 26`                         | The cafe has between 1 and 26 computers.                          |        |                                                        |
| `1 <=                                  | s                                                                 | <= 52` | The event string contains between 1 and 52 characters. |
| `s` contains uppercase English letters | Only uppercase letters are used.                                  |        |                                                        |
| Each letter occurs exactly twice       | The first occurrence is an arrival and the second is a departure. |        |                                                        |

## Intuition

I first looked at what each character in the string represents.

The first time I see a character, that customer is entering the cafe. The second time I see the same character, that customer is leaving.

So the main thing I need to know is how many computers are currently free.

Whenever someone arrives, I check the number of available computers.

If a computer is free, I assign it to that customer and reduce the available count.

If no computer is free, I reject that customer and increase the answer.

There is one small detail that makes this problem interesting. A rejected customer still appears for the second time because every letter occurs exactly twice. That second occurrence should not free a computer because the customer never had one.

So I keep the state of every customer:

* `0` means the customer has not appeared yet.
* `1` means the customer got a computer.
* `2` means the customer was rejected.

Since there are only 26 uppercase letters, this can be done with a fixed-size array.

## Approach

I use a `26`-element array to store the state of each possible customer.

I also keep two variables:

* `available` stores the number of free computers.
* `rejected` stores the number of customers who could not get a computer.

Then I scan the string from left to right.

For every character:

1. Convert the letter into an index from `0` to `25`.
2. If the customer's state is `0`, this is their arrival.
3. If a computer is available, assign it and mark the customer as active.
4. Otherwise, reject the customer and mark their state as rejected.
5. If the customer appears again, they are leaving.
6. Only a customer who previously got a computer can make a computer available again.
7. Return `rejected` after processing the complete string.

This gives a direct simulation of what happens inside the cafe.

## Data Structures Used

### Fixed-size array

I use an array of size `26` because there are only 26 uppercase English letters.

Each position stores the state of one customer. This is enough to distinguish between:

* a customer who has not arrived,
* a customer who is currently using a computer,
* a customer who was rejected.

No hash map or other dynamic data structure is necessary.

## Operations & Behavior Summary

The algorithm can be understood as this plain-English pseudocode:

```text
Create a state array for all 26 letters.
Set available computers to n.
Set rejected customers to 0.

For every character in s:
    Convert the character to an index.

    If the customer has not appeared before:
        If a computer is available:
            Assign a computer.
            Decrease available computers.
            Mark customer as accepted.
        Otherwise:
            Increase rejected count.
            Mark customer as rejected.

    Otherwise:
        If the customer had a computer:
            Increase available computers.

Return rejected count.
```

The important part is that a rejected customer's second occurrence does nothing.

## Complexity

| Complexity       | Analysis                                                                         |   |                                                                        |   |                                      |
| ---------------- | -------------------------------------------------------------------------------- | - | ---------------------------------------------------------------------- | - | ------------------------------------ |
| Time Complexity  | `O(                                                                              | s | )`because I process every character in the string exactly once. Here,` | s | ` is the length of the event string. |
| Space Complexity | `O(1)` because I use a fixed array of 26 elements. The size does not grow with ` | s | `.                                                                     |   |                                      |

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int solve(int n, string s) {
        // state[i] stores the status of customer with letter 'A' + i:
        // 0 = not seen yet, 1 = got a computer, 2 = was rejected.
        int state[26] = {0};

        // Initially, all n computers are free.
        int available = n;

        // This counts customers who arrived when no computer was free.
        int rejected = 0;

        // Process every customer event in chronological order.
        for (char ch : s) {
            // Convert the uppercase letter into an index from 0 to 25.
            int id = ch - 'A';

            // state 0 means this is the customer's first occurrence,
            // so this character represents an arrival.
            if (state[id] == 0) {
                // A free computer exists, so I assign it to this customer.
                if (available > 0) {
                    available--;      // One computer becomes occupied.
                    state[id] = 1;    // Mark the customer as using a computer.
                } else {
                    // No computer is available, so this customer is rejected.
                    rejected++;

                    // Mark them as rejected so their second occurrence
                    // does not incorrectly free a computer.
                    state[id] = 2;
                }
            } else {
                // This is the customer's second occurrence, so they are leaving.
                // Only customers who actually got a computer can free one.
                if (state[id] == 1) {
                    available++;     // Their computer becomes free.
                }
            }
        }

        // Return the total number of customers who were rejected.
        return rejected;
    }
};
```

### Java

```java
class Solution {
    public int solve(int n, String s) {
        // state[i] stores the status of customer with letter 'A' + i:
        // 0 = not seen yet, 1 = got a computer, 2 = was rejected.
        int[] state = new int[26];

        // Initially, all n computers are free.
        int available = n;

        // This counts customers who could not get a computer.
        int rejected = 0;

        // Process every event from left to right.
        for (char ch : s.toCharArray()) {
            // Convert the uppercase letter into an index from 0 to 25.
            int id = ch - 'A';

            // state 0 means this is the customer's first occurrence,
            // which represents their arrival.
            if (state[id] == 0) {
                // If a computer is available, assign it to the customer.
                if (available > 0) {
                    available--;     // One computer becomes occupied.
                    state[id] = 1;   // Mark this customer as accepted.
                } else {
                    // No computer is available, so the customer is rejected.
                    rejected++;

                    // Mark them as rejected so their second occurrence
                    // will not release a computer.
                    state[id] = 2;
                }
            } else {
                // This is the customer's second occurrence, so they leave.
                // Only an accepted customer can release a computer.
                if (state[id] == 1) {
                    available++;     // The computer becomes free again.
                }
            }
        }

        // Return the number of customers who were rejected.
        return rejected;
    }
}
```

### JavaScript

```javascript
/**
 * @param {number} n
 * @param {string} s
 * @returns {number}
 */
class Solution {
    // Function to find the answer.
    solve(n, s) {
        // state[i] stores the status of customer 'A' + i:
        // 0 = not seen, 1 = got a computer, 2 = was rejected.
        const state = new Array(26).fill(0);

        // Initially, all n computers are free.
        let available = n;

        // This stores the number of rejected customers.
        let rejected = 0;

        // Process every customer event in order.
        for (const ch of s) {
            // Convert the uppercase letter into an index from 0 to 25.
            const id = ch.charCodeAt(0) - 65;

            // state 0 means this is the first occurrence,
            // so the customer is arriving.
            if (state[id] === 0) {
                // If a computer is available, assign it.
                if (available > 0) {
                    available--;    // One computer is now occupied.
                    state[id] = 1;  // Mark the customer as accepted.
                } else {
                    // No computer is free, so reject this customer.
                    rejected++;

                    // Remember the rejection so the second occurrence
                    // does not incorrectly free a computer.
                    state[id] = 2;
                }
            } else {
                // This is the customer's second occurrence,
                // which means the customer is leaving.
                if (state[id] === 1) {
                    available++;    // Their computer becomes free.
                }
            }
        }

        // Return the total number of rejected customers.
        return rejected;
    }
}
```

### Python3

```python
class Solution:
    def solve(self, n, s):
        # state[i] stores the status of customer 'A' + i:
        # 0 = not seen, 1 = got a computer, 2 = was rejected.
        state = [0] * 26

        # Initially, all n computers are free.
        available = n

        # This stores the number of customers who were rejected.
        rejected = 0

        # Process every customer event from left to right.
        for ch in s:
            # Convert the uppercase letter into an index from 0 to 25.
            idx = ord(ch) - ord('A')

            # state 0 means this is the customer's first occurrence,
            # so this is their arrival.
            if state[idx] == 0:
                # A free computer is available, so assign it.
                if available > 0:
                    available -= 1  # One computer becomes occupied.
                    state[idx] = 1   # Mark the customer as accepted.
                else:
                    # No computer is free, so reject the customer.
                    rejected += 1

                    # Mark them as rejected so their second occurrence
                    # will not free a computer.
                    state[idx] = 2
            else:
                # This is the customer's second occurrence,
                # so the customer is leaving.
                if state[idx] == 1:
                    available += 1  # Their computer becomes free.

        # Return the total number of rejected customers.
        return rejected
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is the same in C++, Java, JavaScript, and Python3. Only the syntax changes between languages.

### 1. Create the state array

I first create an array with 26 positions.

Each position belongs to one uppercase English letter.

For example:

```text
A -> index 0
B -> index 1
C -> index 2
...
Z -> index 25
```

I use three possible values:

```text
0 -> customer has not appeared
1 -> customer got a computer
2 -> customer was rejected
```

The third state is important because a customer who was rejected must not release a computer later.

### 2. Track available computers

I initialize the number of free computers with `n`.

At the beginning, nobody is inside the cafe, so all computers are available.

Every accepted arrival decreases this value by one.

Every accepted departure increases it by one.

### 3. Track rejected customers

I initialize the answer to zero.

Whenever a customer arrives and there are no free computers, I increase this value.

At the end, this gives the required answer directly.

### 4. Process the event string from left to right

The string represents events in chronological order, so I must process it from the first character to the last character.

I do not need to sort anything or reorder the events.

For each character, I find its corresponding state.

### 5. Handle the first occurrence

If the state is `0`, this is the customer's first appearance.

That means the customer is arriving.

I check whether:

```text
available > 0
```

If true, the customer gets a computer.

I decrease the number of available computers and mark the customer as accepted.

If false, there are no free computers.

I increase the rejected count and mark this customer as rejected.

### 6. Handle the second occurrence

When the same customer appears again, that customer is leaving.

Now I check their previous state.

If the state is `1`, the customer had a computer, so I release it and increase the available computer count.

If the state is `2`, the customer was rejected earlier.

That means they never occupied a computer, so I do nothing.

This is the key condition that prevents the computer count from becoming incorrect.

### 7. Why I do not simply use a visited array

A simple visited array could tell me whether a customer has already appeared, but it would not tell me whether the customer actually received a computer.

Consider:

```text
n = 1
s = "ABCBAC"
```

Customer `A` gets the only computer.

Customer `B` arrives next and is rejected.

Customer `C` then also arrives while the computer is still occupied, so `C` is rejected too.

When `B` appears for the second time, I must not free a computer.

The same is true for `C`.

This is why I need to distinguish between an accepted customer and a rejected customer.

### 8. Why the solution is efficient

There are at most 52 characters in the string.

I process each character once, and every state lookup takes constant time.

The state array always contains exactly 26 positions, so it does not grow with the input size.

That gives:

```text
Time:  O(|s|)
Space: O(1)
```

The same algorithm works efficiently in all four languages.

## Examples

### Example 1

**Input**

```text
n = 3
s = "GACCBBDDBAGEE"
```

**Output**

```text
1
```

**Trace**

```text
G -> arrives, gets a computer
A -> arrives, gets a computer
C -> arrives, gets a computer
C -> leaves, releases a computer
B -> arrives, gets the free computer
D -> arrives, no computer is available, so D is rejected
D -> leaves, but D never got a computer
B -> leaves, releases a computer
A -> leaves, releases a computer
G -> leaves, releases a computer
E -> arrives, gets a computer
E -> leaves
```

Only `D` is rejected, so the answer is `1`.

### Example 2

**Input**

```text
n = 1
s = "ABCBAC"
```

**Output**

```text
2
```

**Trace**

```text
A -> gets the only computer
B -> rejected
C -> rejected
B -> leaves, but B never had a computer
A -> leaves, releases the computer
C -> leaves, but C never had a computer
```

The rejected customers are `B` and `C`.

So the answer is `2`.

### Example 3

**Input**

```text
n = 2
s = "ABAC"
```

**Output**

```text
0
```

**Trace**

```text
A -> gets a computer
B -> gets a computer
A -> leaves, releases a computer
C -> gets the free computer
```

No customer is rejected, so the answer is `0`.

## How to Use / Run Locally

The solution is written in C++, Java, JavaScript, and Python3. The class and method format can be copied directly into the respective online judge submission area.

### C++

Save the solution in a file such as `solution.cpp`.

Compile it with:

```bash
g++ -std=c++17 solution.cpp -o solution
```

Then run:

```bash
./solution
```

For Windows:

```bash
solution.exe
```

### Java

Save the solution in a file named `Solution.java`.

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

Make sure Node.js is installed and available in your terminal.

### Python3

Save the solution as `solution.py`.

Run:

```bash
python3 solution.py
```

For systems where Python is registered as `python`, you can also use:

```bash
python solution.py
```

These solutions are written in the class-based format commonly used by GeeksforGeeks. When running them locally, you may need to add your own input and output handling depending on how you want to test the solution.

## Notes & Optimizations

The main edge case is a customer who was rejected during their arrival.

That customer still appears for a second time, but their departure must not increase the number of available computers.

This is why I store three states instead of only checking whether the customer has appeared.

Another useful observation is that I do not need to store all active customers in a set or map. Since the input contains only uppercase English letters, a fixed array of 26 elements is enough.

The value of `n` is at most 26, so the number of computers is also very small. Still, the same `O(|s|)` simulation is the cleanest solution.

There is no need for sorting, nested loops, stacks, queues, or complex data structures.

## Author

[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)

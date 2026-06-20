# Last Digit of a^b | GeeksforGeeks Solution

A beginner-friendly explanation and optimized solution for the **Last Digit of a^b** problem from GeeksforGeeks.

This repository contains an efficient approach to find the last digit of a very large power expression where both the base and exponent are given as strings. The solution uses modular arithmetic and cyclic patterns of last digits to avoid handling extremely large numbers.

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
* [Step-by-step Detailed Explanation](#step-by-step-detailed-explanation-c-java-javascript-python3)
* [Examples](#examples)
* [How to Use / Run Locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

---

## Problem Summary

Given two integers `a` and `b` in string format, find the **last digit of a^b**.

The challenge is that both values can be extremely large. Since the numbers are stored as strings, converting them directly into numeric data types may not be possible.

Instead of calculating the entire power value, we only need the final digit of the result.

### Input

* String `a` representing the base
* String `b` representing the exponent

### Output

* Return the last digit of `a^b`

### Example

Input:

```text
a = "3"
b = "10"
```

Output:

```text
9
```

Explanation:

```text
3^10 = 59049
```

The last digit is `9`.

---

## Constraints

| Constraint    | Value                      |
| ------------- | -------------------------- |
| 1 ≤ a.size()  | ≤ 1000                     |
| 1 ≤ b.size()  | ≤ 1000                     |
| Characters    | Digits only ('0' - '9')    |
| Leading Zeros | Not allowed except for "0" |

---

## Intuition

My first observation was that the problem only asks for the **last digit** of the answer.

When dealing with powers, the last digit follows a repeating cycle.

For example:

```text
2^1 = 2
2^2 = 4
2^3 = 8
2^4 = 6
2^5 = 2
```

The pattern repeats every 4 powers.

That means I do not need the entire exponent. I only need its position inside the repeating cycle.

Since the exponent can be thousands of digits long, I compute only `b % 4` and use that information to determine the answer.

This turns a huge-number problem into a simple modular arithmetic problem.

---

## Approach

1. Handle the special case when `b = "0"`.
2. Extract the last digit of the base.
3. Compute `b % 4` using the string representation.
4. If the remainder becomes `0`, treat it as `4` because the cycle length is 4.
5. Use modular exponentiation to compute the required last digit.
6. Return the result.

This approach avoids storing large numbers and works efficiently even for the maximum constraints.

---

## Data Structures Used

### String

Used to store the large values of `a` and `b`.

Reason:

* Input size can reach 1000 digits.
* Standard integer types cannot store such large numbers.

### Integer Variables

Used for:

* Last digit of the base
* Remainder calculation
* Modular exponentiation

No additional data structures are required.

---

## Operations & Behavior Summary

The algorithm performs the following operations:

1. Check if exponent is zero.
2. Read the last digit of the base.
3. Traverse the exponent string and calculate `b % 4`.
4. Convert remainder `0` into cycle position `4`.
5. Compute power using modular exponentiation.
6. Keep all calculations modulo `10`.
7. Return the final digit.

This allows the solution to handle extremely large inputs efficiently.

---

## Complexity

| Metric           | Complexity | Explanation                   |   |                                      |
| ---------------- | ---------- | ----------------------------- | - | ------------------------------------ |
| Time Complexity  | O(         | b                             | ) | One traversal of the exponent string |
| Space Complexity | O(1)       | Only a few variables are used |   |                                      |

Where:

* `|b|` = number of digits in exponent string `b`

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    
    // Fast modular exponentiation
    int powerMod(int base, int exp) {
        int result = 1;
        
        while (exp > 0) {
            
            // If current bit is set, multiply answer
            if (exp & 1)
                result = (result * base) % 10;
            
            // Square the base and keep only last digit
            base = (base * base) % 10;
            
            // Move to next bit
            exp >>= 1;
        }
        
        return result;
    }
    
    int getLastDigit(string& a, string& b) {
        
        // Any number raised to power 0 is 1
        if (b == "0")
            return 1;
        
        // Only last digit of a matters
        int lastDigit = a.back() - '0';
        
        // Compute b % 4 using string traversal
        int exponent = 0;
        for (char ch : b) {
            exponent = (exponent * 10 + (ch - '0')) % 4;
        }
        
        // Cycle length becomes 4 when remainder is 0
        if (exponent == 0)
            exponent = 4;
        
        // Compute required last digit
        return powerMod(lastDigit, exponent);
    }
};
```

### Java

```java
class Solution {
    
    // Fast modular exponentiation
    private int powerMod(int base, int exp) {
        int result = 1;
        
        while (exp > 0) {
            
            // Multiply when current bit is set
            if ((exp & 1) == 1) {
                result = (result * base) % 10;
            }
            
            // Square the base
            base = (base * base) % 10;
            
            // Move to next bit
            exp >>= 1;
        }
        
        return result;
    }
    
    public int getLastDigit(String a, String b) {
        
        // Any number raised to power 0 is 1
        if (b.equals("0")) {
            return 1;
        }
        
        // Only last digit matters
        int lastDigit = a.charAt(a.length() - 1) - '0';
        
        // Compute b % 4
        int exponent = 0;
        for (int i = 0; i < b.length(); i++) {
            exponent = (exponent * 10 + (b.charAt(i) - '0')) % 4;
        }
        
        // Replace 0 by 4 because cycle length is 4
        if (exponent == 0) {
            exponent = 4;
        }
        
        return powerMod(lastDigit, exponent);
    }
}
```

### JavaScript

```javascript
/**
 * @param {string} a
 * @param {string} b
 * @returns {number}
 */

class Solution {
    
    // Fast modular exponentiation
    powerMod(base, exp) {
        let result = 1;
        
        while (exp > 0) {
            
            // Multiply when bit is set
            if (exp & 1) {
                result = (result * base) % 10;
            }
            
            // Square the base
            base = (base * base) % 10;
            
            // Move to next bit
            exp >>= 1;
        }
        
        return result;
    }
    
    getLastDigit(a, b) {
        
        // Any number raised to power 0 is 1
        if (b === "0") {
            return 1;
        }
        
        // Last digit of base
        const lastDigit = Number(a[a.length - 1]);
        
        // Compute b % 4
        let exponent = 0;
        
        for (const ch of b) {
            exponent = (exponent * 10 + Number(ch)) % 4;
        }
        
        // Handle complete cycle
        if (exponent === 0) {
            exponent = 4;
        }
        
        return this.powerMod(lastDigit, exponent);
    }
}
```

### Python3

```python
class Solution:
    
    # Fast modular exponentiation
    def powerMod(self, base, exp):
        result = 1
        
        while exp > 0:
            
            # Multiply when current bit is set
            if exp & 1:
                result = (result * base) % 10
            
            # Square the base
            base = (base * base) % 10
            
            # Move to next bit
            exp >>= 1
        
        return result
    
    def getLastDigit(self, a, b):
        
        # Any number raised to power 0 is 1
        if b == "0":
            return 1
        
        # Only last digit of a matters
        lastDigit = int(a[-1])
        
        # Compute b % 4 from string
        exponent = 0
        for ch in b:
            exponent = (exponent * 10 + int(ch)) % 4
        
        # Convert remainder 0 into cycle position 4
        if exponent == 0:
            exponent = 4
        
        return self.powerMod(lastDigit, exponent)
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains exactly the same across all language implementations.

### Step 1: Handle Exponent Zero

If the exponent is zero:

```text
a^0 = 1
```

So we immediately return `1`.

---

### Step 2: Extract the Last Digit

Only the final digit of the base affects the final digit of the result.

Example:

```text
1234567^100
```

behaves exactly like:

```text
7^100
```

when considering only the last digit.

---

### Step 3: Compute Exponent Modulo 4

The exponent may contain hundreds or thousands of digits.

Instead of converting it into an integer, process it digit by digit:

```text
remainder = (remainder * 10 + currentDigit) % 4
```

This safely calculates `b % 4`.

---

### Step 4: Adjust the Cycle Position

Many last-digit cycles have length 4.

If:

```text
b % 4 = 0
```

it actually represents the fourth position in the cycle.

So:

```text
0 → 4
```

---

### Step 5: Perform Modular Exponentiation

Now the exponent is very small.

Use binary exponentiation to efficiently compute:

```text
(lastDigit)^exponent mod 10
```

This keeps calculations fast and avoids overflow.

---

### Step 6: Return the Result

The computed value is already the last digit of the original expression.

Return it as the answer.

---

## Examples

### Example 1

Input:

```text
a = "3"
b = "10"
```

Processing:

```text
Last digit of base = 3
10 % 4 = 2
3^2 = 9
```

Output:

```text
9
```

---

### Example 2

Input:

```text
a = "6"
b = "2"
```

Processing:

```text
Last digit of base = 6
2 % 4 = 2
6^2 = 36
```

Last digit:

```text
6
```

Output:

```text
6
```

---

### Example 3

Input:

```text
a = "7"
b = "1000"
```

Processing:

```text
1000 % 4 = 0
Cycle position = 4
7^4 = 2401
```

Last digit:

```text
1
```

Output:

```text
1
```

---

## How to Use / Run Locally

### C++

Compile:

```bash
g++ main.cpp -o main
```

Run:

```bash
./main
```

---

### Java

Compile:

```bash
javac Solution.java
```

Run:

```bash
java Solution
```

---

### JavaScript

Run:

```bash
node solution.js
```

---

### Python3

Run:

```bash
python solution.py
```

or

```bash
python3 solution.py
```

---

## Notes & Optimizations

### Important Edge Cases

#### Exponent is Zero

```text
a^0 = 1
```

Always return `1`.

---

#### Base Ends With 0

```text
10^n
20^n
30^n
```

The answer remains `0`.

---

#### Base Ends With 1

```text
1^n
11^n
21^n
```

The answer remains `1`.

---

### Why This Solution Is Optimal

A brute-force approach is impossible because:

* `a` can have 1000 digits
* `b` can have 1000 digits

The optimized solution only processes the exponent string once and never constructs the actual power value.

This makes it the preferred competitive programming solution for the Last Digit of a^b problem.

### Related Topics

* Modular Arithmetic
* Number Theory
* Fast Exponentiation
* Binary Exponentiation
* Competitive Programming
* GeeksforGeeks DSA Problems
* Mathematical Algorithms

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)

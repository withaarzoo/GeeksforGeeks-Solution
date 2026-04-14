# Remove Spaces

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

Given a string `s`, remove all spaces from the string and return the modified string.

The order of the remaining characters must stay the same.

### Example

**Input:**

```text
s = "g eeks for ge eeks"
```

**Output:**

```text
"geeksforgeeks"
```

---

## Constraints

```text
1 <= |s| <= 10^5
```

---

## Intuition

I thought about the simplest way to solve this problem.

Since I only need to remove spaces, I can go through the string character by character.

* If the current character is not a space, I add it to my answer.
* If it is a space, I skip it.

This way, I keep all characters in the same order while removing only spaces.

---

## Approach

1. Create an empty result string.
2. Traverse the given string one character at a time.
3. Check whether the current character is a space or not.
4. If it is not a space, add it to the result.
5. Return the final result string.

---

## Data Structures Used

* String / StringBuilder
* Character traversal
* List in Python for efficient string building

---

## Operations & Behavior Summary

| Operation       | Description                   |
| --------------- | ----------------------------- |
| Traverse string | Visit each character once     |
| Skip spaces     | Ignore `' '` characters       |
| Build answer    | Add only non-space characters |
| Return result   | Final string without spaces   |

---

## Complexity

* **Time Complexity:** `O(n)`

  * Here, `n` is the length of the string.
  * I traverse the string only once.

* **Space Complexity:** `O(n)`

  * I use an extra string or list to store the final answer.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    string removeSpaces(string& s) {
        // String to store final answer
        string result = "";
        
        // Traverse every character of the string
        for(char ch : s) {
            
            // If current character is not a space
            if(ch != ' ') {
                result += ch;
            }
        }
        
        // Return the final string
        return result;
    }
};
```

### Java

```java
class Solution {
    String removeSpaces(String s) {
        // StringBuilder is efficient for string modification
        StringBuilder result = new StringBuilder();
        
        // Traverse each character
        for(int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            
            // Add only non-space characters
            if(ch != ' ') {
                result.append(ch);
            }
        }
        
        // Return final answer
        return result.toString();
    }
}
```

### JavaScript

```javascript
/**
 * @param {string} s
 * @returns {string}
 */
class Solution {
    removeSpaces(s) {
        // Store final answer
        let result = "";
        
        // Traverse through each character
        for(let ch of s) {
            
            // Add only non-space characters
            if(ch !== ' ') {
                result += ch;
            }
        }
        
        return result;
    }
}
```

### Python3

```python
class Solution:
    def removeSpaces(self, s):
        # List to store non-space characters
        result = []
        
        # Traverse through each character
        for ch in s:
            
            # Add only non-space characters
            if ch != ' ':
                result.append(ch)
        
        # Convert list to string
        return ''.join(result)
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

### C++ Explanation

```cpp
string result = "";
```

* I create an empty string.
* This string will store all characters except spaces.

```cpp
for(char ch : s)
```

* I traverse the string character by character.

```cpp
if(ch != ' ')
```

* I check whether the current character is not a space.

```cpp
result += ch;
```

* If the character is not a space, I add it to the result.

```cpp
return result;
```

* Finally, I return the modified string.

### Java Explanation

```java
StringBuilder result = new StringBuilder();
```

* Java strings are immutable.
* So I use `StringBuilder` for better performance.

```java
char ch = s.charAt(i);
```

* I get the current character from the string.

```java
if(ch != ' ')
```

* I check whether the current character is not a space.

```java
result.append(ch);
```

* If true, I add it to the result.

```java
return result.toString();
```

* Finally, I convert the `StringBuilder` into a string.

### JavaScript Explanation

```javascript
let result = "";
```

* I create an empty string to store the answer.

```javascript
for(let ch of s)
```

* I traverse through every character of the string.

```javascript
if(ch !== ' ')
```

* I check whether the character is not a space.

```javascript
result += ch;
```

* If true, I add the character to the result.

### Python3 Explanation

```python
result = []
```

* I use a list because appending to a list is faster than repeatedly creating new strings.

```python
for ch in s:
```

* I traverse the string one character at a time.

```python
if ch != ' ':
```

* I check if the current character is not a space.

```python
result.append(ch)
```

* If true, I add the character into the list.

```python
return ''.join(result)
```

* Finally, I join all characters together and return the final string.

---

## Examples

### Example 1

```text
Input:
s = "g eeks for ge eeks"

Output:
"geeksforgeeks"
```

### Example 2

```text
Input:
s = "abc d "

Output:
"abcd"
```

### Example 3

```text
Input:
s = " hello world "

Output:
"helloworld"
```

---

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

---

## Notes & Optimizations

* I traverse the string only once.
* This gives an efficient `O(n)` solution.
* In Java, `StringBuilder` is better than using string concatenation repeatedly.
* In Python, using a list and `join()` is faster than adding characters directly to a string.
* The solution works well even for the maximum string size.

---

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)

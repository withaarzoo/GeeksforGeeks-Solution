# URLify a Given String

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

Given a string `s`, replace all spaces in the string with `"%20"`.

For example:

* Input: `"i love programming"`
* Output: `"i%20love%20programming"`

The task is to return the modified string after replacing every space.

## Constraints

* `1 <= s.size() <= 10^4`

## Intuition

I thought about the problem in a very simple way.

Whenever I find a space character in the string, I do not keep it as it is. Instead, I replace it with `"%20"`.

For every other character, I keep it unchanged.

So, I can traverse the string once and build a new answer string.

## Approach

1. Create an empty result string.
2. Traverse each character of the input string.
3. If the current character is a space:

   * Add `"%20"` to the result.
4. Otherwise:

   * Add the original character.
5. Return the final result string.

This approach is simple, clean, and efficient.

## Data Structures Used

* String / StringBuilder / Array / List

Different languages use different efficient structures:

* C++ uses `string`
* Java uses `StringBuilder`
* JavaScript uses normal string concatenation
* Python uses a list and then joins it

## Operations & Behavior Summary

* Traverse each character once
* Replace spaces with `"%20"`
* Keep non-space characters unchanged
* Return the newly built string

## Complexity

* Time Complexity: `O(n)`

  * `n` is the length of the string
  * I visit each character only once

* Space Complexity: `O(n)`

  * I use an extra result string to store the final answer

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    string URLify(string &s) {
        // String to store final answer
        string result = "";
        
        // Traverse every character
        for(char ch : s) {
            
            // If space is found, replace with %20
            if(ch == ' ') {
                result += "%20";
            }
            else {
                result += ch;
            }
        }
        
        // Return final modified string
        return result;
    }
};
```

### Java

```java
class Solution {
    String URLify(String s) {
        // StringBuilder is efficient for string modifications
        StringBuilder result = new StringBuilder();
        
        // Traverse each character of the string
        for(int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            
            // Replace space with %20
            if(ch == ' ') {
                result.append("%20");
            }
            else {
                result.append(ch);
            }
        }
        
        // Convert StringBuilder to String and return
        return result.toString();
    }
}
```

### JavaScript

```javascript
/**
 * @param {String} s
 * @returns {String}
 */
class Solution {
    URLify(s) {
        // Store final answer
        let result = "";
        
        // Traverse every character
        for(let ch of s) {
            
            // Replace space with %20
            if(ch === ' ') {
                result += "%20";
            }
            else {
                result += ch;
            }
        }
        
        // Return final modified string
        return result;
    }
}
```

### Python3

```python
class Solution:
    def URLify(self, s):
        # List is faster than repeatedly joining strings
        result = []
        
        # Traverse every character
        for ch in s:
            
            # Replace space with %20
            if ch == ' ':
                result.append("%20")
            else:
                result.append(ch)
        
        # Join all parts into final string
        return "".join(result)
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

### C++ Explanation

```cpp
string result = "";
```

I create an empty string to store the final modified result.

```cpp
for(char ch : s)
```

I traverse each character of the input string.

```cpp
if(ch == ' ')
```

I check whether the current character is a space.

```cpp
result += "%20";
```

If it is a space, I add `"%20"`.

```cpp
result += ch;
```

If it is not a space, I keep the character as it is.

```cpp
return result;
```

Finally, I return the modified string.

### Java Explanation

```java
StringBuilder result = new StringBuilder();
```

I use `StringBuilder` because it is more efficient than modifying strings repeatedly.

```java
char ch = s.charAt(i);
```

I get the current character.

```java
if(ch == ' ')
```

I check if the current character is a space.

```java
result.append("%20");
```

If yes, I add `"%20"`.

```java
result.append(ch);
```

Otherwise, I add the original character.

### JavaScript Explanation

```javascript
let result = "";
```

I create an empty string to store the answer.

```javascript
for(let ch of s)
```

I loop through each character of the string.

```javascript
if(ch === ' ')
```

I check if the character is a space.

```javascript
result += "%20";
```

If yes, I replace it with `"%20"`.

```javascript
result += ch;
```

Otherwise, I keep the original character.

### Python3 Explanation

```python
result = []
```

I use a list because appending to a list is faster than string concatenation.

```python
for ch in s:
```

I traverse every character.

```python
if ch == ' ':
```

I check whether the current character is a space.

```python
result.append("%20")
```

If it is a space, I add `"%20"`.

```python
result.append(ch)
```

Otherwise, I keep the original character.

```python
return "".join(result)
```

At the end, I join all parts together and return the final string.

## Examples

### Example 1

```text
Input:
s = "i love programming"

Output:
"i%20love%20programming"
```

### Example 2

```text
Input:
s = "Mr Benedict Cumberbatch"

Output:
"Mr%20Benedict%20Cumberbatch"
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

* I only traverse the string once.
* This gives an efficient `O(n)` solution.
* Using `StringBuilder` in Java improves performance.
* Using a list in Python is better than repeatedly concatenating strings.
* This solution works well even for the maximum constraint size.

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)

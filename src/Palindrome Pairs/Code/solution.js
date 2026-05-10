class Solution {
  // Function to check palindrome
  isPalindrome(str, left, right) {
    // Compare both ends
    while (left < right) {
      // Mismatch means not palindrome
      if (str[left] !== str[right]) {
        return false;
      }

      left++;
      right--;
    }

    return true;
  }

  palindromePair(arr) {
    // Store all strings with index
    let mp = new Map();

    for (let i = 0; i < arr.length; i++) {
      mp.set(arr[i], i);
    }

    // Traverse every word
    for (let i = 0; i < arr.length; i++) {
      let word = arr[i];
      let n = word.length;

      // Try all split positions
      for (let j = 0; j <= n; j++) {
        let left = word.substring(0, j);
        let right = word.substring(j);

        // CASE 1
        if (this.isPalindrome(word, 0, j - 1)) {
          // Reverse right part
          let revRight = right.split("").reverse().join("");

          // Check existence
          if (mp.has(revRight) && mp.get(revRight) !== i) {
            return true;
          }
        }

        // CASE 2
        if (j !== n && this.isPalindrome(word, j, n - 1)) {
          // Reverse left part
          let revLeft = left.split("").reverse().join("");

          // Check existence
          if (mp.has(revLeft) && mp.get(revLeft) !== i) {
            return true;
          }
        }
      }
    }

    return false;
  }
}

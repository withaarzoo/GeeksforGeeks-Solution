class Solution {
  catchThieves(arr, k) {
    const police = [];
    const thieves = [];

    // Store positions
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === "P") police.push(i);
      else thieves.push(i);
    }

    let i = 0,
      j = 0,
      count = 0;

    // Two pointer greedy matching
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

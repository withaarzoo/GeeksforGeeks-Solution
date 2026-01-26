class Solution {
  permuteDist(arr) {
    const result = [];
    const used = new Array(arr.length).fill(false);

    const backtrack = (curr) => {
      if (curr.length === arr.length) {
        result.push([...curr]);
        return;
      }

      for (let i = 0; i < arr.length; i++) {
        if (used[i]) continue;

        used[i] = true;
        curr.push(arr[i]);

        backtrack(curr);

        // Backtrack
        curr.pop();
        used[i] = false;
      }
    };

    backtrack([]);
    return result;
  }
}

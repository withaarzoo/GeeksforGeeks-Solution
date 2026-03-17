class Solution {
  minTime(root, target) {
    const parent = new Map();
    let targetNode = null;

    // Step 1: Build parent mapping
    let q = [root];

    while (q.length) {
      let curr = q.shift();

      if (curr.data === target) targetNode = curr;

      if (curr.left) {
        parent.set(curr.left, curr);
        q.push(curr.left);
      }

      if (curr.right) {
        parent.set(curr.right, curr);
        q.push(curr.right);
      }
    }

    // Step 2: BFS burn
    let visited = new Set();
    q = [targetNode];
    visited.add(targetNode);

    let time = 0;

    while (q.length) {
      let size = q.length;
      let burned = false;

      for (let i = 0; i < size; i++) {
        let curr = q.shift();

        if (curr.left && !visited.has(curr.left)) {
          burned = true;
          visited.add(curr.left);
          q.push(curr.left);
        }

        if (curr.right && !visited.has(curr.right)) {
          burned = true;
          visited.add(curr.right);
          q.push(curr.right);
        }

        if (parent.get(curr) && !visited.has(parent.get(curr))) {
          burned = true;
          visited.add(parent.get(curr));
          q.push(parent.get(curr));
        }
      }

      if (burned) time++;
    }

    return time;
  }
}

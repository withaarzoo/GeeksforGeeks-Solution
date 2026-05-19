class Solution {
  minSteps(arr, start, end) {
    // If start is already equal to end
    if (start === end) return 0;

    // Distance array
    let dist = new Array(1000).fill(Infinity);

    // Queue for BFS
    let queue = [];

    // Starting node
    dist[start] = 0;
    queue.push(start);

    // Pointer for efficient queue traversal
    let front = 0;

    // BFS traversal
    while (front < queue.length) {
      // Get current number
      let current = queue[front++];

      // Try multiplying with every array element
      for (let num of arr) {
        // Generate next state
        let next = (current * num) % 1000;

        // If shorter path found
        if (dist[current] + 1 < dist[next]) {
          // Update distance
          dist[next] = dist[current] + 1;

          // If target reached
          if (next === end) return dist[next];

          // Push into queue
          queue.push(next);
        }
      }
    }

    // End cannot be reached
    return -1;
  }
}

class Solution {
  canMake(ranks, n, time) {
    let donuts = 0;

    for (let r of ranks) {
      let currTime = 0;
      let k = 0;

      while (true) {
        currTime += r * (k + 1);
        if (currTime > time) break;
        k++;
      }

      donuts += k;
      if (donuts >= n) return true;
    }
    return false;
  }

  minTime(ranks, n) {
    let minRank = Math.min(...ranks);
    let low = 0;
    let high = (minRank * n * (n + 1)) / 2;
    let ans = high;

    while (low <= high) {
      let mid = Math.floor((low + high) / 2);

      if (this.canMake(ranks, n, mid)) {
        ans = mid;
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }
    return ans;
  }
}

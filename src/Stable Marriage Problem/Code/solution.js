/**
 * @param {number[][]} men
 * @param {number[][]} women
 * @returns {number[]}
 */
class Solution {
  stableMarriage(men, women) {
    const n = men.length;

    // rank[w][m] = preference rank of man m for woman w
    const rank = Array.from({ length: n }, () => Array(n).fill(0));

    for (let w = 0; w < n; w++) {
      for (let pos = 0; pos < n; pos++) {
        rank[w][women[w][pos]] = pos;
      }
    }

    // womanPartner[w] = current man matched with woman w
    const womanPartner = Array(n).fill(-1);

    // result[m] = woman matched with man m
    const result = Array(n).fill(-1);

    // nextProposal[m] = next woman index to propose
    const nextProposal = Array(n).fill(0);

    const freeMen = [];

    // Initially all men are free
    for (let i = 0; i < n; i++) {
      freeMen.push(i);
    }

    while (freeMen.length > 0) {
      const man = freeMen.shift();

      // Next preferred woman
      const woman = men[man][nextProposal[man]];
      nextProposal[man]++;

      // If woman is free
      if (womanPartner[woman] === -1) {
        womanPartner[woman] = man;
        result[man] = woman;
      } else {
        const currentMan = womanPartner[woman];

        // If woman prefers new man
        if (rank[woman][man] < rank[woman][currentMan]) {
          womanPartner[woman] = man;
          result[man] = woman;

          // Old partner becomes free
          result[currentMan] = -1;
          freeMen.push(currentMan);
        } else {
          // Woman rejects the proposal
          freeMen.push(man);
        }
      }
    }

    return result;
  }
}

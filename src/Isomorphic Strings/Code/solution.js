/**
 * @param {string} s1
 * @param {string} s2
 * @returns {boolean}
 */
class Solution {
  areIsomorphic(s1, s2) {
    if (s1.length !== s2.length) return false;

    let map1 = new Array(256).fill(-1);
    let map2 = new Array(256).fill(-1);

    for (let i = 0; i < s1.length; i++) {
      let c1 = s1.charCodeAt(i);
      let c2 = s2.charCodeAt(i);

      if (map1[c1] === -1 && map2[c2] === -1) {
        map1[c1] = c2;
        map2[c2] = c1;
      } else {
        if (map1[c1] !== c2 || map2[c2] !== c1) return false;
      }
    }

    return true;
  }
}

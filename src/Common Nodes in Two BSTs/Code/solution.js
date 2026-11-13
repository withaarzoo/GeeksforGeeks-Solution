/* Structure of a Binary Search Tree node
class Node {
    constructor(val) {
        this.data = val;
        this.left = null;
        this.right = null;
    }
};
*/

/**
 * @param {Node} r1
 * @param {Node} r2
 * @return {Number[]}
 */

class Solution {
    findCommon(r1, r2) {
        let res = [];
        let s1 = [];
        let s2 = [];
        
        while (r1) {
            s1.push(r1);
            r1 = r1.left;
        }
        while (r2) {
            s2.push(r2);
            r2 = r2.left;
        }
        
        while (s1.length && s2.length) {
            let a = s1[s1.length - 1];
            let b = s2[s2.length - 1];
            
            if (a.data === b.data) {
                res.push(a.data);
                s1.pop();
                s2.pop();
                r1 = a.right;
                r2 = b.right;
                while (r1) {
                    s1.push(r1);
                    r1 = r1.left;
                }
                while (r2) {
                    s2.push(r2);
                    r2 = r2.left;
                }
            }
            else if (a.data < b.data) {
                s1.pop();
                r1 = a.right;
                while (r1) {
                    s1.push(r1);
                    r1 = r1.left;
                }
            }
            else {
                s2.pop();
                r2 = b.right;
                while (r2) {
                    s2.push(r2);
                    r2 = r2.left;
                }
            }
        }
        return res;
    }
}
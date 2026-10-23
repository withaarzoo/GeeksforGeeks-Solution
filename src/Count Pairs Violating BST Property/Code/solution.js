/* BST Node Structure
class Node {
    constructor(val) {
        this.data = val;
        this.left = null;
        this.right = null;
    }
} */
/**
 * @param {Node} root
 * @returns {number}
 */
class Solution {
    inorder(root, vals) {
        if (!root) return;
        this.inorder(root.left, vals);
        vals.push(root.data);
        this.inorder(root.right, vals);
    }
    
    merge(arr, low, mid, high) {
        let temp = [];
        let i = low, j = mid + 1;
        let inv = 0;
        while (i <= mid && j <= high) {
            if (arr[i] <= arr[j]) {
                temp.push(arr[i++]);
            } else {
                inv += (mid - i + 1);
                temp.push(arr[j++]);
            }
        }
        while (i <= mid) temp.push(arr[i++]);
        while (j <= high) temp.push(arr[j++]);
        for (let k = low; k <= high; k++) arr[k] = temp[k - low];
        return inv;
    }
    
    mergeSort(arr, low, high) {
        let inv = 0;
        if (low < high) {
            let mid = low + Math.floor((high - low) / 2);
            inv += this.mergeSort(arr, low, mid);
            inv += this.mergeSort(arr, mid + 1, high);
            inv += this.merge(arr, low, mid, high);
        }
        return inv;
    }
    
    pairsViolatingBST(root) {
        let vals = [];
        this.inorder(root, vals);
        return this.mergeSort(vals, 0, vals.length - 1);
    }
}
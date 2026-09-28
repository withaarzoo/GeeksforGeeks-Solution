/**
 * @param {number[]} arr
 * @param {number[][]} queries
 * @returns {number[]}
 */
class Solution {
    processQueries(arr, queries) {
        let n = arr.length;
        let tree = new Array(4 * n).fill(0);

        function gcd(a, b) {
            while (b) {
                let t = b;
                b = a % b;
                a = t;
            }
            return a;
        }

        function build(node, start, end) {
            if (start === end) {
                tree[node] = arr[start];
                return;
            }
            let mid = Math.floor((start + end) / 2);
            build(2 * node, start, mid);
            build(2 * node + 1, mid + 1, end);
            tree[node] = gcd(tree[2 * node], tree[2 * node + 1]);
        }

        function update(node, start, end, idx, val) {
            if (start === end) {
                tree[node] = val;
                return;
            }
            let mid = Math.floor((start + end) / 2);
            if (idx <= mid)
                update(2 * node, start, mid, idx, val);
            else
                update(2 * node + 1, mid + 1, end, idx, val);
            tree[node] = gcd(tree[2 * node], tree[2 * node + 1]);
        }

        function query(node, start, end, l, r) {
            if (r < start || end < l)
                return 0;
            if (l <= start && end <= r)
                return tree[node];
            let mid = Math.floor((start + end) / 2);
            let left = query(2 * node, start, mid, l, r);
            let right = query(2 * node + 1, mid + 1, end, l, r);
            return gcd(left, right);
        }

        build(1, 0, n - 1);
        let ans = [];
        for (let q of queries) {
            if (q[0] === 0) {
                ans.push(query(1, 0, n - 1, q[1], q[2]));
            } else {
                update(1, 0, n - 1, q[1], q[2]);
            }
        }
        return ans;
    }
}
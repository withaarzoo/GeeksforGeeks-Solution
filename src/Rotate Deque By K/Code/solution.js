class Solution {
    rotateDeque(dq, type, k) {
        const n = dq.len();
        if (n === 0) return;               // nothing to do
        const r = k % n;
        if (r === 0) return;               // already in place

        if (type === 1) {                  // Right rotation: move back -> front
            for (let i = 0; i < r; ++i) {
                const val = dq.getBack();
                dq.popBack();
                dq.pushFront(val);
            }
        } else if (type === 2) {           // Left rotation: move front -> back
            for (let i = 0; i < r; ++i) {
                const val = dq.getFront();
                dq.popFront();
                dq.pushBack(val);
            }
        }
    }
}

class Solution {
  merge(a, b) {
    if (!a) return b;
    if (!b) return a;

    let result;

    if (a.data < b.data) {
      result = a;
      result.bottom = this.merge(a.bottom, b);
    } else {
      result = b;
      result.bottom = this.merge(a, b.bottom);
    }

    result.next = null;
    return result;
  }

  flatten(root) {
    if (!root || !root.next) return root;

    root.next = this.flatten(root.next);
    root = this.merge(root, root.next);

    return root;
  }
}

class Solution {
  findPreSuc(root, key) {
    let pre = null,
      suc = null;

    while (root) {
      if (root.data < key) {
        pre = root;
        root = root.right;
      } else if (root.data > key) {
        suc = root;
        root = root.left;
      } else {
        // Predecessor
        let temp = root.left;
        while (temp) {
          pre = temp;
          temp = temp.right;
        }

        // Successor
        temp = root.right;
        while (temp) {
          suc = temp;
          temp = temp.left;
        }
        break;
      }
    }

    return [pre, suc];
  }
}

/* BST Node Structure
class Node {
    int data;
    Node left, right;
    Node(int val) {
        data = val;
        left = right = null;
    }
}
*/
class Solution {
    void inorder(Node root, ArrayList<Integer> vals) {
        if (root == null) return;
        inorder(root.left, vals);
        vals.add(root.data);
        inorder(root.right, vals);
    }
    
    long merge(int[] arr, int low, int mid, int high) {
        int[] temp = new int[high - low + 1];
        int i = low, j = mid + 1, k = 0;
        long inv = 0;
        while (i <= mid && j <= high) {
            if (arr[i] <= arr[j]) {
                temp[k++] = arr[i++];
            } else {
                inv += (mid - i + 1);
                temp[k++] = arr[j++];
            }
        }
        while (i <= mid) temp[k++] = arr[i++];
        while (j <= high) temp[k++] = arr[j++];
        for (int p = 0; p < temp.length; p++) arr[low + p] = temp[p];
        return inv;
    }
    
    long mergeSort(int[] arr, int low, int high) {
        long inv = 0;
        if (low < high) {
            int mid = low + (high - low) / 2;
            inv += mergeSort(arr, low, mid);
            inv += mergeSort(arr, mid + 1, high);
            inv += merge(arr, low, mid, high);
        }
        return inv;
    }
    
    public int pairsViolatingBST(Node root) {
        ArrayList<Integer> vals = new ArrayList<>();
        inorder(root, vals);
        int n = vals.size();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = vals.get(i);
        return (int)mergeSort(arr, 0, n - 1);
    }
}
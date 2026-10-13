class Solution {
    public ArrayList<Integer> update(int n, int[] updates) {
        ArrayList<Integer> arr = new ArrayList<>(Collections.nCopies(n, 0));
        for (int j : updates) {
            arr.set(j - 1, arr.get(j - 1) + 1);
        }
        for (int i = 1; i < n; i++) {
            arr.set(i, arr.get(i) + arr.get(i - 1));
        }
        return arr;
    }
}
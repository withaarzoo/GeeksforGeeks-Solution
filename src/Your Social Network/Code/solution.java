class Solution {
    public ArrayList<ArrayList<Integer>> socialNetwork(int[] arr) {
        int n = arr.length + 1;
        int[] parent = new int[n + 1];
        Arrays.fill(parent, -1);
        for (int i = 2; i <= n; i++) {
            parent[i] = arr[i - 2];
        }
        ArrayList<ArrayList<Integer>> res = new ArrayList<>();
        for (int i = 2; i <= n; i++) {
            ArrayList<int[]> reaches = new ArrayList<>();
            int curr = i;
            int dist = 0;
            while (parent[curr] != -1) {
                curr = parent[curr];
                dist++;
                reaches.add(new int[]{curr, dist});
            }
            reaches.sort((a, b) -> Integer.compare(a[0], b[0]));
            for (int[] p : reaches) {
                ArrayList<Integer> triple = new ArrayList<>();
                triple.add(i);
                triple.add(p[0]);
                triple.add(p[1]);
                res.add(triple);
            }
        }
        return res;
    }
}
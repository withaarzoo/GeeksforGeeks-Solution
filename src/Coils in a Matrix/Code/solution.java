class Solution {
    public ArrayList<ArrayList<Integer>> formCoils(int n) {
        int size = 4 * n;
        int m = 8 * n * n;
        ArrayList<Integer> coil1 = new ArrayList<>(m);
        int x = 0, y = 0;
        coil1.add(1);
        int dirs[][] = {{1,0},{0,1},{-1,0},{0,-1}};
        int d = 0;
        int steps = size - 1;
        for (int i = 0; i < steps; i++) {
            x += dirs[d][0];
            y += dirs[d][1];
            coil1.add(x * size + y + 1);
        }
        d = (d + 1) % 4;
        for (int k = size - 2; k > 0; k -= 2) {
            for (int t = 0; t < 2; t++) {
                for (int i = 0; i < k; i++) {
                    x += dirs[d][0];
                    y += dirs[d][1];
                    coil1.add(x * size + y + 1);
                }
                d = (d + 1) % 4;
            }
        }
        ArrayList<Integer> coil2 = new ArrayList<>(m);
        int total = size * size;
        for (int i = 0; i < m; i++)
            coil2.add(total + 1 - coil1.get(i));
        ArrayList<ArrayList<Integer>> res = new ArrayList<>();
        res.add(coil1);
        res.add(coil2);
        return res;
    }
}
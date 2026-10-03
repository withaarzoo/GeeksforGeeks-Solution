class Solution {
  public:
    vector<vector<int>> formCoils(int n) {
        int size = 4 * n;
        int m = 8 * n * n;
        vector<int> coil1(m);
        int x = 0, y = 0;
        coil1[0] = 1;
        int idx = 1;
        int dirs[4][2] = {{1,0},{0,1},{-1,0},{0,-1}};
        int d = 0;
        int steps = size - 1;
        for (int i = 0; i < steps && idx < m; i++) {
            x += dirs[d][0];
            y += dirs[d][1];
            coil1[idx++] = x * size + y + 1;
        }
        d = (d + 1) % 4;
        for (int k = size - 2; k > 0; k -= 2) {
            for (int t = 0; t < 2; t++) {
                for (int i = 0; i < k && idx < m; i++) {
                    x += dirs[d][0];
                    y += dirs[d][1];
                    coil1[idx++] = x * size + y + 1;
                }
                d = (d + 1) % 4;
            }
        }
        vector<int> coil2(m);
        int total = size * size;
        for (int i = 0; i < m; i++)
            coil2[i] = total + 1 - coil1[i];
        return {coil1, coil2};
    }
};
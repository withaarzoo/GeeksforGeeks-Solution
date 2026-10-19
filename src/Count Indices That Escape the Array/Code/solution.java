class Solution {
    public int goodIndices(int[] arr) {
        int n = arr.length;
        int[] status = new int[n];
        int ans = 0;
        for (int i = 0; i < n; i++) {
            if (status[i] != 0) continue;
            java.util.ArrayList<Integer> path = new java.util.ArrayList<>();
            int curr = i;
            while (curr >= 0 && curr < n && status[curr] == 0) {
                status[curr] = 1;
                path.add(curr);
                curr += arr[curr];
            }
            boolean good = false;
            if (curr < 0 || curr >= n) good = true;
            else if (status[curr] == 2) good = true;
            int finalStatus = good ? 2 : 3;
            for (int idx : path) status[idx] = finalStatus;
        }
        for (int s : status) if (s == 2) ans++;
        return ans;
    }
}
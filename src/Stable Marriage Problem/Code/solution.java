class Solution {
    public int[] stableMarriage(int[][] men, int[][] women) {
        int n = men.length;

        // rank[w][m] = preference rank of man m for woman w
        int[][] rank = new int[n][n];

        for (int w = 0; w < n; w++) {
            for (int pos = 0; pos < n; pos++) {
                rank[w][women[w][pos]] = pos;
            }
        }

        // womanPartner[w] = man currently matched with woman w
        int[] womanPartner = new int[n];

        // result[m] = woman matched with man m
        int[] result = new int[n];

        // nextProposal[m] = next woman to whom man m will propose
        int[] nextProposal = new int[n];

        Arrays.fill(womanPartner, -1);
        Arrays.fill(result, -1);

        Queue<Integer> freeMen = new LinkedList<>();

        // Initially all men are free
        for (int i = 0; i < n; i++) {
            freeMen.offer(i);
        }

        while (!freeMen.isEmpty()) {
            int man = freeMen.poll();

            // Next woman in his preference list
            int woman = men[man][nextProposal[man]];
            nextProposal[man]++;

            // If woman is free
            if (womanPartner[woman] == -1) {
                womanPartner[woman] = man;
                result[man] = woman;
            } else {
                int currentMan = womanPartner[woman];

                // If woman prefers new man
                if (rank[woman][man] < rank[woman][currentMan]) {
                    womanPartner[woman] = man;
                    result[man] = woman;

                    // Old partner becomes free
                    result[currentMan] = -1;
                    freeMen.offer(currentMan);
                } else {
                    // Woman rejects the new man
                    freeMen.offer(man);
                }
            }
        }

        return result;
    }
}
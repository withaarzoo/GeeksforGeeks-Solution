class Solution {
  public:
    vector<int> stableMarriage(vector<vector<int>> &men, vector<vector<int>> &women) {
        int n = men.size();

        // rank[w][m] = preference rank of man m for woman w
        // Smaller value means woman prefers that man more
        vector<vector<int>> rank(n, vector<int>(n));

        for (int w = 0; w < n; w++) {
            for (int pos = 0; pos < n; pos++) {
                rank[w][women[w][pos]] = pos;
            }
        }

        // womanPartner[w] = current man matched with woman w
        vector<int> womanPartner(n, -1);

        // result[m] = current woman matched with man m
        vector<int> result(n, -1);

        // nextProposal[m] = next woman index in man's preference list
        vector<int> nextProposal(n, 0);

        queue<int> freeMen;

        // Initially all men are free
        for (int i = 0; i < n; i++) {
            freeMen.push(i);
        }

        while (!freeMen.empty()) {
            int man = freeMen.front();
            freeMen.pop();

            // Get the next woman this man wants to propose to
            int woman = men[man][nextProposal[man]];
            nextProposal[man]++;

            // If woman is free, match them
            if (womanPartner[woman] == -1) {
                womanPartner[woman] = man;
                result[man] = woman;
            }
            else {
                int currentMan = womanPartner[woman];

                // If woman prefers new man over current partner
                if (rank[woman][man] < rank[woman][currentMan]) {
                    womanPartner[woman] = man;
                    result[man] = woman;

                    // Old partner becomes free again
                    result[currentMan] = -1;
                    freeMen.push(currentMan);
                }
                else {
                    // Woman rejects the proposal
                    freeMen.push(man);
                }
            }
        }

        return result;
    }
};
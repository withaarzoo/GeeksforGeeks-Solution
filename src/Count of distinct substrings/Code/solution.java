class Solution {

    // --- Suffix Automaton global arrays (static so helper use kar sake) ---
    static int[][] next; // transitions
    static int[] link; // suffix link
    static int[] len; // longest length for each state
    static int last; // state for whole string so far
    static int size; // number of states used

    // Initialize SAM for maximum length n
    static void saInit(int n) {
        int maxStates = 2 * n;
        next = new int[maxStates][26];
        link = new int[maxStates];
        len = new int[maxStates];

        // Set all transitions to -1
        for (int i = 0; i < maxStates; i++) {
            link[i] = -1;
            len[i] = 0;
            for (int j = 0; j < 26; j++) {
                next[i][j] = -1;
            }
        }

        size = 1; // start with state 0
        last = 0; // initial state
    }

    // Extend SAM with one character
    static void extend(char ch) {
        int c = ch - 'a';

        int cur = size++;
        len[cur] = len[last] + 1;
        // next[cur] is already -1 from initialization

        int p = last;
        // add transitions for this character from states that don't have it
        while (p != -1 && next[p][c] == -1) {
            next[p][c] = cur;
            p = link[p];
        }

        if (p == -1) {
            // no valid suffix, link to initial state
            link[cur] = 0;
        } else {
            int q = next[p][c];
            if (len[p] + 1 == len[q]) {
                // direct link possible
                link[cur] = q;
            } else {
                // need to clone q
                int clone = size++;
                len[clone] = len[p] + 1;
                link[clone] = link[q];

                // copy transitions of q to clone
                for (int i = 0; i < 26; i++) {
                    next[clone][i] = next[q][i];
                }

                // redirect transitions pointing to q
                while (p != -1 && next[p][c] == q) {
                    next[p][c] = clone;
                    p = link[p];
                }

                link[q] = link[cur] = clone;
            }
        }
        last = cur;
    }

    public static int countSubs(String s) {
        int n = s.length();
        saInit(n); // init SAM

        // build SAM
        for (int i = 0; i < n; i++) {
            extend(s.charAt(i));
        }

        // count distinct substrings:
        // sum(len[v] - len[link[v]]) for all v != 0
        long ans = 0;
        for (int v = 1; v < size; v++) {
            ans += len[v] - len[link[v]];
        }
        return (int) ans;
    }
}

class Solution {
    public String findLongestWord(String s, List<String> d) {
        List<Integer>[] pos = new ArrayList[26];
        for (int i = 0; i < 26; i++) pos[i] = new ArrayList<>();
        for (int i = 0; i < s.length(); i++) {
            pos[s.charAt(i) - 'a'].add(i);
        }
        String ans = "";
        for (String w : d) {
            int last = -1;
            boolean ok = true;
            for (int i = 0; i < w.length(); i++) {
                char c = w.charAt(i);
                List<Integer> p = pos[c - 'a'];
                int idx = Collections.binarySearch(p, last + 1);
                if (idx < 0) idx = -idx - 1;
                if (idx >= p.size()) {
                    ok = false;
                    break;
                }
                last = p.get(idx);
            }
            if (ok) {
                if (w.length() > ans.length() || (w.length() == ans.length() && w.compareTo(ans) < 0)) {
                    ans = w;
                }
            }
        }
        return ans;
    }
}
class Solution {
    public ArrayList<String> generateUsernames(String[] arr) {
        HashSet<String> reserved = new HashSet<>();
        for (String s : arr) reserved.add(s);
        HashSet<String> assigned = new HashSet<>();
        ArrayList<String> res = new ArrayList<>();
        for (String name : arr) {
            if (!assigned.contains(name)) {
                assigned.add(name);
                res.add(name);
            } else {
                int k = 1;
                while (true) {
                    String cand = name + k;
                    if (!assigned.contains(cand) && !reserved.contains(cand)) {
                        assigned.add(cand);
                        res.add(cand);
                        break;
                    }
                    k++;
                }
            }
        }
        return res;
    }
}
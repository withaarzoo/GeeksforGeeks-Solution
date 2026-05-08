class Solution {
    // I verify if the parentheses count balances out to zero
    private boolean isValid(String s) {
        int count = 0;
        for (char ch : s.toCharArray()) {
            if (ch == '(')
                count++;
            else if (ch == ')') {
                count--;
                if (count < 0)
                    return false;
            }
        }
        return count == 0;
    }

    public List<String> validParenthesis(String s) {
        List<String> ans = new ArrayList<>();
        Set<String> visited = new HashSet<>();
        Queue<String> q = new LinkedList<>();

        q.add(s);
        visited.add(s);

        boolean found = false;

        while (!q.isEmpty()) {
            int size = q.size();
            for (int i = 0; i < size; i++) {
                String curr = q.poll();

                if (isValid(curr)) {
                    ans.add(curr);
                    found = true;
                }

                // Skip generating children if a solution is found at this level
                if (found)
                    continue;

                for (int j = 0; j < curr.length(); j++) {
                    if (curr.charAt(j) != '(' && curr.charAt(j) != ')')
                        continue;

                    String next = curr.substring(0, j) + curr.substring(j + 1);
                    if (!visited.contains(next)) {
                        visited.add(next);
                        q.add(next);
                    }
                }
            }
            if (found)
                break;
        }
        return ans;
    }
}
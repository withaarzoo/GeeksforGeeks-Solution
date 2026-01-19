class Solution {
    public String removeKdig(String s, int k) {
        StringBuilder st = new StringBuilder();

        for (char ch : s.toCharArray()) {
            while (st.length() > 0 && k > 0 && st.charAt(st.length() - 1) > ch) {
                st.deleteCharAt(st.length() - 1);
                k--;
            }
            st.append(ch);
        }

        // remove remaining digits
        while (k > 0 && st.length() > 0) {
            st.deleteCharAt(st.length() - 1);
            k--;
        }

        // remove leading zeros
        int idx = 0;
        while (idx < st.length() && st.charAt(idx) == '0')
            idx++;

        String ans = st.substring(idx);
        return ans.length() == 0 ? "0" : ans;
    }
}

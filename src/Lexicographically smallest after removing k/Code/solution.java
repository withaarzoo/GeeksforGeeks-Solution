class Solution {
    public String lexicographicallySmallest(String s, int k) {
        int n = s.length();

        // Check whether n is a power of 2
        if ((n & (n - 1)) == 0)
            k /= 2;
        else
            k *= 2;

        // If removal is impossible or result becomes empty
        if (k >= n)
            return "-1";

        StringBuilder st = new StringBuilder();

        for (char ch : s.toCharArray()) {

            // Remove larger characters while possible
            while (st.length() > 0 &&
                    k > 0 &&
                    st.charAt(st.length() - 1) > ch) {

                st.deleteCharAt(st.length() - 1);
                k--;
            }

            st.append(ch);
        }

        // Remove remaining characters from the end
        while (k > 0) {
            st.deleteCharAt(st.length() - 1);
            k--;
        }

        return st.length() == 0 ? "-1" : st.toString();
    }
}
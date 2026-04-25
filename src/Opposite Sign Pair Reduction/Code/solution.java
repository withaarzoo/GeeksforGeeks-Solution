import java.util.*;

class Solution {
    public ArrayList<Integer> reducePairs(int[] arr) {
        ArrayList<Integer> st = new ArrayList<>();

        for (int x : arr) {
            boolean alive = true;

            while (!st.isEmpty() && alive && st.get(st.size() - 1) * x < 0) {
                int top = st.get(st.size() - 1);

                if (Math.abs(top) == Math.abs(x)) {
                    st.remove(st.size() - 1);
                    alive = false;
                } else if (Math.abs(top) > Math.abs(x)) {
                    alive = false;
                } else {
                    st.remove(st.size() - 1);
                }
            }

            if (alive)
                st.add(x);
        }

        return st;
    }
}
class Solution {
    List<Integer> makeBeautiful(int[] arr) {

        // List used like a stack
        List<Integer> st = new ArrayList<>();

        // Traverse all numbers
        for (int num : arr) {

            // Get stack size
            int size = st.size();

            // Check opposite signs with last element
            if (size > 0 &&
                    ((st.get(size - 1) >= 0 && num < 0) ||
                            (st.get(size - 1) < 0 && num >= 0))) {

                // Remove last element
                st.remove(size - 1);
            } else {

                // Keep current element
                st.add(num);
            }
        }

        // Return final beautiful array
        return st;
    }
}
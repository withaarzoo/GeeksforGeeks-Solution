class Solution {
    public ArrayList<String> graycode(int n) {
        ArrayList<String> result = new ArrayList<>();

        // Total number of Gray Codes = 2^n
        int total = 1 << n;

        // Generate Gray Code for every number
        for (int i = 0; i < total; i++) {

            // Gray Code formula
            int gray = i ^ (i >> 1);

            StringBuilder binary = new StringBuilder();

            // Convert gray number into binary string of length n
            for (int bit = n - 1; bit >= 0; bit--) {
                if ((gray & (1 << bit)) != 0)
                    binary.append('1');
                else
                    binary.append('0');
            }

            result.add(binary.toString());
        }

        return result;
    }
}
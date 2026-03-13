class Solution {

    private boolean isValid(String s, int start, int len) {

        if (start + len > s.length())
            return false;

        if (len > 1 && s.charAt(start) == '0')
            return false;

        int num = Integer.parseInt(s.substring(start, start + len));

        return num <= 255;
    }

    private void backtrack(String s, int index, int parts, String current, ArrayList<String> result) {

        if (parts == 4 && index == s.length()) {
            result.add(current.substring(0, current.length() - 1));
            return;
        }

        if (parts >= 4)
            return;

        for (int len = 1; len <= 3; len++) {

            if (isValid(s, index, len)) {

                String segment = s.substring(index, index + len);

                backtrack(
                        s,
                        index + len,
                        parts + 1,
                        current + segment + ".",
                        result);
            }
        }
    }

    public ArrayList<String> generateIp(String s) {

        ArrayList<String> result = new ArrayList<>();

        backtrack(s, 0, 0, "", result);

        return result;
    }
}
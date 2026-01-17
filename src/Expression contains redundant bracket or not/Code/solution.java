class Solution {
    public static boolean checkRedundancy(String s) {
        Stack<Character> stack = new Stack<>();

        for (char ch : s.toCharArray()) {
            if (ch != ')') {
                stack.push(ch);
            } else {
                boolean hasOperator = false;

                while (!stack.isEmpty() && stack.peek() != '(') {
                    char top = stack.pop();
                    if (top == '+' || top == '-' || top == '*' || top == '/') {
                        hasOperator = true;
                    }
                }

                // Pop '('
                if (!stack.isEmpty())
                    stack.pop();

                if (!hasOperator)
                    return true;
            }
        }
        return false;
    }
}

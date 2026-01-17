class Solution():
    def checkRedundancy(self, s):
        stack = []

        for ch in s:
            if ch != ')':
                stack.append(ch)
            else:
                has_operator = False

                while stack and stack[-1] != '(':
                    top = stack.pop()
                    if top in ['+', '-', '*', '/']:
                        has_operator = True

                # Remove '('
                if stack:
                    stack.pop()

                if not has_operator:
                    return True

        return False

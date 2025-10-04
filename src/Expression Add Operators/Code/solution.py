class Solution:
    def findExpr(self, s, target):
        """
        s: string of digits
        target: integer target
        returns: list of expression strings that evaluate to target
        """
        res = []
        n = len(s)
        if n == 0:
            return res

        def dfs(pos, expr, curVal, last):
            # pos: current index in s we are processing
            # expr: current expression string
            # curVal: evaluated value of expr
            # last: last operand (signed) that was added to curVal
            if pos == n:
                if curVal == target:
                    res.append(expr)
                return

            for i in range(pos, n):
                # skip numbers with leading zero
                if i > pos and s[pos] == '0':
                    break
                numStr = s[pos:i+1]
                val = int(numStr)

                if pos == 0:
                    # first number, we start the expression with it
                    dfs(i + 1, numStr, val, val)
                else:
                    # plus
                    dfs(i + 1, expr + '+' + numStr, curVal + val, val)
                    # minus
                    dfs(i + 1, expr + '-' + numStr, curVal - val, -val)
                    # multiply: adjust previous contribution
                    dfs(i + 1, expr + '*' + numStr, curVal - last + last * val, last * val)

        dfs(0, "", 0, 0)
        res.sort()  # lexicographic order
        return res

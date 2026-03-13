class Solution:

    def isValid(self, s, start, length):

        if start + length > len(s):
            return False

        if length > 1 and s[start] == '0':
            return False

        num = int(s[start:start+length])

        return num <= 255


    def backtrack(self, s, index, parts, current, result):

        if parts == 4 and index == len(s):
            result.append(current[:-1])
            return

        if parts >= 4:
            return

        for length in range(1, 4):

            if self.isValid(s, index, length):

                segment = s[index:index+length]

                self.backtrack(
                    s,
                    index + length,
                    parts + 1,
                    current + segment + ".",
                    result
                )


    def generateIp(self, s):

        result = []

        self.backtrack(s, 0, 0, "", result)

        return result
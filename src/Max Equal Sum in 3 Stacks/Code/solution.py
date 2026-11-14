class Solution:
    def maxEqualSum(self, s1: list[int], s2: list[int], s3: list[int]) -> int:
        sum1 = sum(s1)
        sum2 = sum(s2)
        sum3 = sum(s3)
        i = j = k = 0
        n1, n2, n3 = len(s1), len(s2), len(s3)
        while True:
            if sum1 == sum2 == sum3:
                return sum1
            if sum1 >= sum2 and sum1 >= sum3:
                if i == n1:
                    return 0
                sum1 -= s1[i]
                i += 1
            elif sum2 >= sum1 and sum2 >= sum3:
                if j == n2:
                    return 0
                sum2 -= s2[j]
                j += 1
            else:
                if k == n3:
                    return 0
                sum3 -= s3[k]
                k += 1
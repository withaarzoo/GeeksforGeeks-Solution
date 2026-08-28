class Solution:

    def minCost(self, mat):
        # I store the minimum costs for all three choices in the first row.
        prev0 = mat[0][0]
        prev1 = mat[0][1]
        prev2 = mat[0][2]

        # I process every row starting from the second row.
        for i in range(1, len(mat)):
            # I cannot repeat choice 0, so I come from choice 1 or 2.
            curr0 = mat[i][0] + min(prev1, prev2)

            # I cannot repeat choice 1, so I come from choice 0 or 2.
            curr1 = mat[i][1] + min(prev0, prev2)

            # I cannot repeat choice 2, so I come from choice 0 or 1.
            curr2 = mat[i][2] + min(prev0, prev1)

            # I update the previous-row costs for processing the next row.
            prev0 = curr0
            prev1 = curr1
            prev2 = curr2

        # I return the cheapest valid selection ending with any of the three choices.
        return min(prev0, prev1, prev2)
class Solution:
    def stableMarriage(self, men, women):
        n = len(men)

        # rank[w][m] = preference rank of man m for woman w
        # Smaller value means higher preference
        rank = [[0] * n for _ in range(n)]

        for w in range(n):
            for pos in range(n):
                rank[w][women[w][pos]] = pos

        # womanPartner[w] = current man matched with woman w
        womanPartner = [-1] * n

        # result[m] = woman matched with man m
        result = [-1] * n

        # nextProposal[m] = next woman to propose to
        nextProposal = [0] * n

        # Initially all men are free
        freeMen = list(range(n))

        while freeMen:
            man = freeMen.pop(0)

            # Next preferred woman for this man
            woman = men[man][nextProposal[man]]
            nextProposal[man] += 1

            # If woman is free
            if womanPartner[woman] == -1:
                womanPartner[woman] = man
                result[man] = woman
            else:
                currentMan = womanPartner[woman]

                # If woman prefers new man
                if rank[woman][man] < rank[woman][currentMan]:
                    womanPartner[woman] = man
                    result[man] = woman

                    # Old partner becomes free again
                    result[currentMan] = -1
                    freeMen.append(currentMan)
                else:
                    # Woman rejects the proposal
                    freeMen.append(man)

        return result
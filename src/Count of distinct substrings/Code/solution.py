class Solution:
    def countSubs(self, s):
        n = len(s)
        
        # Suffix Automaton arrays
        nexts = [[-1] * 26]   # transitions for each state
        link = [-1]           # suffix links
        length = [0]          # longest length for each state
        
        last = 0  # state representing the whole string so far
        
        def extend(ch):
            nonlocal last
            c = ord(ch) - ord('a')
            cur = len(nexts)
            nexts.append([-1] * 26)
            link.append(-1)
            length.append(length[last] + 1)
            
            p = last
            # add transitions for character c
            while p != -1 and nexts[p][c] == -1:
                nexts[p][c] = cur
                p = link[p]
            
            if p == -1:
                # from "before root", suffix link goes to root
                link[cur] = 0
            else:
                q = nexts[p][c]
                if length[p] + 1 == length[q]:
                    link[cur] = q
                else:
                    # create clone state
                    clone = len(nexts)
                    nexts.append(nexts[q][:])     # copy transitions
                    link.append(link[q])
                    length.append(length[p] + 1)
                    
                    while p != -1 and nexts[p][c] == q:
                        nexts[p][c] = clone
                        p = link[p]
                    
                    link[q] = link[cur] = clone
            
            last = cur
        
        # Build SAM
        for ch in s:
            extend(ch)
        
        # Count distinct substrings
        ans = 0
        for v in range(1, len(nexts)):
            ans += length[v] - length[link[v]]
        return ans

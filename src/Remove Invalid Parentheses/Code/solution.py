from collections import deque

class Solution:
    def isValid(self, s: str) -> bool:
        count = 0
        for ch in s:
            if ch == '(':
                count += 1
            elif ch == ')':
                count -= 1
                if count < 0:
                    return False
        return count == 0

    def validParenthesis(self, s: str) -> list[str]:
        ans = []
        visited = {s}
        q = deque([s])
        
        found = False
        
        while q:
            level_size = len(q)
            for _ in range(level_size):
                curr = q.popleft()
                
                if self.isValid(curr):
                    ans.append(curr)
                    found = True
                
                # If we found a valid one, don't generate the next level of deletions
                if found:
                    continue
                
                for i in range(len(curr)):
                    if curr[i] not in ('(', ')'):
                        continue
                    
                    # Create string by removing character at index i
                    next_s = curr[:i] + curr[i+1:]
                    if next_s not in visited:
                        visited.add(next_s)
                        q.append(next_s)
            
            # Stop BFS after completing the level where first valid string was found
            if found:
                break
                
        return ans
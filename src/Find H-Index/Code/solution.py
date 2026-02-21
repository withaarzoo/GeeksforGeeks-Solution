class Solution:
    def hIndex(self, citations):
        n = len(citations)
        
        # Step 1: Sort the list
        citations.sort()
        
        # Step 2: Traverse and check
        for i in range(n):
            papers = n - i
            
            if citations[i] >= papers:
                return papers
        
        return 0
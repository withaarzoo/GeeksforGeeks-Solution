class Solution:
    def andInRange(self, l, r):
        shift = 0
        
        # Keep trimming bits from the right until l and r match.
        while l < r:
            l >>= 1      # drop lowest bit of l
            r >>= 1      # drop lowest bit of r
            shift += 1   # count the dropped bits
        
        # l (or r) now is the common prefix in binary.
        # Bring it back to original length by left shifting.
        return l << shift

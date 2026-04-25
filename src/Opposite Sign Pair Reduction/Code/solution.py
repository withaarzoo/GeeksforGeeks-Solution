class Solution:
    def reducePairs(self, arr):
        st = []
        
        for x in arr:
            alive = True
            
            while st and alive and st[-1] * x < 0:
                top = st[-1]
                
                if abs(top) == abs(x):
                    st.pop()
                    alive = False
                elif abs(top) > abs(x):
                    alive = False
                else:
                    st.pop()
            
            if alive:
                st.append(x)
        
        return st
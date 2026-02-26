class Solution:
    def areIsomorphic(self, s1, s2):
        
        if len(s1) != len(s2):
            return False
        
        map1 = [-1] * 256  # s1 -> s2
        map2 = [-1] * 256  # s2 -> s1
        
        for i in range(len(s1)):
            c1 = ord(s1[i])
            c2 = ord(s2[i])
            
            if map1[c1] == -1 and map2[c2] == -1:
                map1[c1] = c2
                map2[c2] = c1
            else:
                if map1[c1] != c2 or map2[c2] != c1:
                    return False
        
        return True
class TrieNode:
    def __init__(self):
        # Store children of current node
        self.child = [None] * 26

        # Number of words sharing this prefix
        self.freq = 0


class Solution:
    def findPrefixes(self, arr):

        # Create Trie root
        root = TrieNode()

        # Insert every word into Trie
        for word in arr:

            node = root

            for ch in word:

                idx = ord(ch) - ord('a')

                # Create node if it does not exist
                if node.child[idx] is None:
                    node.child[idx] = TrieNode()

                # Move to child node
                node = node.child[idx]

                # Increase prefix frequency
                node.freq += 1

        ans = []

        # Find shortest unique prefix for every word
        for word in arr:

            node = root
            prefix = ""

            for ch in word:

                idx = ord(ch) - ord('a')

                # Move forward
                node = node.child[idx]

                # Add current character
                prefix += ch

                # Stop once prefix becomes unique
                if node.freq == 1:
                    break

            ans.append(prefix)

        return ans
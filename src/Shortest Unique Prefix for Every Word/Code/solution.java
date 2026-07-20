class Solution {

    // Trie node
    class TrieNode {
        TrieNode[] child = new TrieNode[26];
        int freq = 0;
    }

    public ArrayList<String> findPrefixes(ArrayList<String> arr) {

        // Create Trie root
        TrieNode root = new TrieNode();

        // Insert all words
        for (String word : arr) {

            TrieNode node = root;

            for (char ch : word.toCharArray()) {

                int idx = ch - 'a';

                // Create node if it does not exist
                if (node.child[idx] == null)
                    node.child[idx] = new TrieNode();

                // Move to next node
                node = node.child[idx];

                // Increase prefix frequency
                node.freq++;
            }
        }

        ArrayList<String> ans = new ArrayList<>();

        // Find unique prefix for every word
        for (String word : arr) {

            TrieNode node = root;
            StringBuilder prefix = new StringBuilder();

            for (char ch : word.toCharArray()) {

                int idx = ch - 'a';

                // Move forward
                node = node.child[idx];

                // Add character to answer
                prefix.append(ch);

                // Stop once prefix becomes unique
                if (node.freq == 1)
                    break;
            }

            ans.add(prefix.toString());
        }

        return ans;
    }
}
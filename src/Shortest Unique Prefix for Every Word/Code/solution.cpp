class Solution
{
public:
    // Trie node
    struct TrieNode
    {
        TrieNode *child[26];
        int freq;

        // Constructor
        TrieNode()
        {
            freq = 0;

            // Initially no children exist
            for (int i = 0; i < 26; i++)
                child[i] = NULL;
        }
    };

    vector<string> findPrefixes(vector<string> &arr)
    {

        // Create root of Trie
        TrieNode *root = new TrieNode();

        // Insert every word into Trie
        for (string &word : arr)
        {

            TrieNode *node = root;

            for (char ch : word)
            {

                int idx = ch - 'a';

                // Create new node if needed
                if (node->child[idx] == NULL)
                    node->child[idx] = new TrieNode();

                // Move to next node
                node = node->child[idx];

                // Increase number of words passing through this prefix
                node->freq++;
            }
        }

        vector<string> ans;

        // Find shortest unique prefix for every word
        for (string &word : arr)
        {

            TrieNode *node = root;
            string prefix = "";

            for (char ch : word)
            {

                int idx = ch - 'a';

                // Move to next node
                node = node->child[idx];

                // Add current character to prefix
                prefix += ch;

                // Frequency 1 means this prefix is unique
                if (node->freq == 1)
                    break;
            }

            ans.push_back(prefix);
        }

        return ans;
    }
};
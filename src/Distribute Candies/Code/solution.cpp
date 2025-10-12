/*
class Node {
public:
    int data;
    Node* left;
    Node* right;

    Node(int x) {
        data = x;
        left = right = nullptr;
    }
};
*/

#include <bits/stdc++.h>
using namespace std;

class Solution {
private:
    long long moves = 0; // accumulate total moves (use long long for safety)

    // returns balance of subtree:
    // positive -> this subtree has extra candies to send up
    // negative -> this subtree needs candies from above
    int dfs(Node* node) {
        if (!node) return 0;
        int lb = dfs(node->left);   // balance from left subtree
        int rb = dfs(node->right);  // balance from right subtree

        moves += llabs((long long)lb) + llabs((long long)rb); // moves needed to fix edges to children

        int balance = node->data + lb + rb - 1; // current subtree balance after giving node exactly 1 candy
        return balance;
    }

public:
    int distCandy(Node* root) {
        moves = 0;
        dfs(root);
        return (int)moves;
    }
};

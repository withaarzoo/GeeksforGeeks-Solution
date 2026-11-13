/* Structure of a Binary Search Tree node
class Node {
  public int data;
  public Node left;
  public Node right;

  public Node(int val) {
      data = val;
      left = right = null;
  }
};
*/

class Solution {
    public ArrayList<Integer> findCommon(Node r1, Node r2) {
        ArrayList<Integer> res = new ArrayList<>();
        Stack<Node> s1 = new Stack<>();
        Stack<Node> s2 = new Stack<>();
        
        while (r1 != null) {
            s1.push(r1);
            r1 = r1.left;
        }
        while (r2 != null) {
            s2.push(r2);
            r2 = r2.left;
        }
        
        while (!s1.isEmpty() && !s2.isEmpty()) {
            Node a = s1.peek();
            Node b = s2.peek();
            
            if (a.data == b.data) {
                res.add(a.data);
                s1.pop();
                s2.pop();
                r1 = a.right;
                r2 = b.right;
                while (r1 != null) {
                    s1.push(r1);
                    r1 = r1.left;
                }
                while (r2 != null) {
                    s2.push(r2);
                    r2 = r2.left;
                }
            }
            else if (a.data < b.data) {
                s1.pop();
                r1 = a.right;
                while (r1 != null) {
                    s1.push(r1);
                    r1 = r1.left;
                }
            }
            else {
                s2.pop();
                r2 = b.right;
                while (r2 != null) {
                    s2.push(r2);
                    r2 = r2.left;
                }
            }
        }
        return res;
    }
}
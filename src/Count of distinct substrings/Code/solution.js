/**
 * @param {string} s
 * @return {number}
 */

class Solution {
  countSubs(s) {
    const n = s.length;

    // SAM state structure
    class State {
      constructor() {
        this.next = new Array(26).fill(-1); // transitions
        this.link = -1; // suffix link
        this.len = 0; // longest length
      }
    }

    const st = [];
    st.push(new State()); // state 0: initial
    let last = 0; // state representing whole string so far

    const extend = (ch) => {
      const c = ch.charCodeAt(0) - 97; // 'a' -> 0
      const cur = st.length;
      st.push(new State());
      st[cur].len = st[last].len + 1;

      let p = last;
      // add transitions from states that don't have this character
      while (p !== -1 && st[p].next[c] === -1) {
        st[p].next[c] = cur;
        p = st[p].link;
      }

      if (p === -1) {
        st[cur].link = 0;
      } else {
        const q = st[p].next[c];
        if (st[p].len + 1 === st[q].len) {
          st[cur].link = q;
        } else {
          const clone = st.length;
          const cloneState = new State();
          // copy q into clone
          cloneState.next = st[q].next.slice();
          cloneState.len = st[p].len + 1;
          cloneState.link = st[q].link;
          st.push(cloneState);

          while (p !== -1 && st[p].next[c] === q) {
            st[p].next[c] = clone;
            p = st[p].link;
          }
          st[q].link = st[cur].link = clone;
        }
      }
      last = cur;
    };

    // Build SAM
    for (let ch of s) {
      extend(ch);
    }

    // Count distinct substrings
    let ans = 0;
    for (let v = 1; v < st.length; v++) {
      ans += st[v].len - st[st[v].link].len;
    }
    return ans;
  }
}

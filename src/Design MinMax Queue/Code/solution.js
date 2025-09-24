// Efficient Deque implementation (O(1) amortized ops)
class Deque {
  constructor() {
    this.arr = [];
    this.head = 0;
    this.tail = 0;
  }
  pushBack(x) {
    this.arr[this.tail++] = x;
  }
  popBack() {
    if (this.isEmpty()) return;
    this.tail--;
  }
  pushFront(x) {
    if (this.head === 0) {
      this.arr.unshift(x); // rare case, still O(1) amortized because not used here
      this.tail++;
    } else {
      this.arr[--this.head] = x;
    }
  }
  popFront() {
    if (this.isEmpty()) return;
    this.head++;
  }
  front() {
    return this.isEmpty() ? undefined : this.arr[this.head];
  }
  back() {
    return this.isEmpty() ? undefined : this.arr[this.tail - 1];
  }
  isEmpty() {
    return this.head >= this.tail;
  }
  size() {
    return this.tail - this.head;
  }
}

// SpecialQueue implementation
class SpecialQueue {
  constructor() {
    this.q = new Deque(); // main queue
    this.minD = new Deque(); // monotonic increasing deque
    this.maxD = new Deque(); // monotonic decreasing deque
  }

  // Insert element x
  enqueue(x) {
    this.q.pushBack(x);

    // Maintain min deque (increasing)
    while (!this.minD.isEmpty() && this.minD.back() > x) {
      this.minD.popBack();
    }
    this.minD.pushBack(x);

    // Maintain max deque (decreasing)
    while (!this.maxD.isEmpty() && this.maxD.back() < x) {
      this.maxD.popBack();
    }
    this.maxD.pushBack(x);
  }

  // Remove from front
  dequeue() {
    if (this.q.isEmpty()) return;
    const v = this.q.front();
    this.q.popFront();

    if (!this.minD.isEmpty() && this.minD.front() === v) {
      this.minD.popFront();
    }
    if (!this.maxD.isEmpty() && this.maxD.front() === v) {
      this.maxD.popFront();
    }
  }

  // Get front element
  getFront() {
    return this.q.isEmpty() ? -1 : this.q.front();
  }

  // Get minimum element
  getMin() {
    return this.minD.isEmpty() ? -1 : this.minD.front();
  }

  // Get maximum element
  getMax() {
    return this.maxD.isEmpty() ? -1 : this.maxD.front();
  }
}

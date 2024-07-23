export class SinglyLinkedList<E> {
  private head: SLLNode<E> | null = null;
  private tail: SLLNode<E> | null = null;
  private size: number = 0;

  constructor() {}

  public getSize(): number {
    return this.size;
  }

  public getHead(): SLLNode<E> | null {
    return this.head;
  }

  public getTail(): SLLNode<E> | null {
    return this.tail;
  }
  
  public isEmpty(): boolean {
    return this.size === 0;
  }

  public first(): E | null {
    if (this.isEmpty() || this.head === null) return null;
    return this.head.getElement();
  }

  public last(): E | null {
    if (this.isEmpty() || this.tail === null) return null;
    return this.tail.getElement();
  }

  public addFirst(e: E): void {
    this.head = new SLLNode<E>(e, this.head);
    if (this.size === 0) this.tail = this.head;
    this.size++;
  }

  public addLast(e: E): void {
    // Cannot do contextual type inference
    let newest: SLLNode<E> = new SLLNode<E>(e, null)
    if (this.isEmpty()) {
      this.head = newest;
    } else {
      // Rough predicate
      this.tail && this.tail.setNext(newest)
    }

    this.tail = newest;
    this.size++;
  }

  public removeFirst(): E | null {
    if (this.isEmpty() || (this === null || this.head === null)) return null;
    let xNode: E = this.head.getElement();
    this.head = this.head.getNext();
    this.size--;
    if (this.size === 0) this.tail = null;
    return xNode;
  }

}

export class SLLNode<E> {
  private element: E;
  private next: SLLNode<E> | null;

  constructor(e: E, n: SLLNode<E> | null) {
    this.element = e;
    this.next = n;
  }

  public getElement(): E {
    return this.element;
  }

  public getNext(): SLLNode<E> | null {
    return this.next;
  }

  public setNext(n: SLLNode<E>) {
    this.next = n;
  }
}

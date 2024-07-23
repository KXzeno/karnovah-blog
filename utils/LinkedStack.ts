import { SinglyLinkedList } from "./SinglyLinkedList"

export class LinkedStack<E> {
  private list: SinglyLinkedList<E> = new SinglyLinkedList<E>();

  constructor() {}

  public size(): number {
    return this.list.getSize();
  }

  public isEmpty(): boolean {
    return this.list.isEmpty();
  }

  public push(element: E): void {
    this.list.addFirst(element);
  }

  public top(): E | null {
    return this.list.first();
  }

  // TODO: Finish implementation after figuring out form output parsing
  public static isMatchedMd(expr: string) {
    const tagSought: string = '#';
  }
}

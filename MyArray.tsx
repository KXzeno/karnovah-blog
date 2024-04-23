class MyArray<T> extends String {
  value: T;
  index?: number;
  object?: T[];

  constructor(value: T, index?: number, object?: T[] | undefined) {
    super();
    this.value = value;
    this.index = index;
    this.object = object;
  }

 // constructor(value: T) {
 //   super();
 //   this.value = value;
 // }

  locate(value: T, index: number, object: T[] | undefined) {
    this.value = value;
    this.index = index;
    this.object = object;

    let indices: number[] = [];
    if (value && index && object) {
      for (let i = 0; i < object.length; i++) {
        if (index && object[index] === value) {
          indices.push(index);
        }
      }
    }
  }
}

let smth = new MyArray();
console.log(smth);


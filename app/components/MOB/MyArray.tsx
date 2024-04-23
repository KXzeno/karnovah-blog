class ObjectArray<T> extends String {
  value: T;
  index?: number;
  object?: T[];

  ObjectArray(value: T, index?: number, object?: T[]) {
    this.value = value;
    this.index = index;
    this.object = object;
  }

  locate(value: T, index: number, object: T[]) {
    let indices = [];
    for (let i = 0; i < object.length; i++) {
      if (index && object[index] === value) {
        indices.push(index);
      }
    }
  }
}

let smth = new ObjectArray(1);
console.log(smth);

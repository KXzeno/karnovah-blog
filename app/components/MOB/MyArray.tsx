class ObjectArray<T> extends String {
  let value: T;
  let index?: number;
  let object?: T[];

  ObjectArray(value, index, object) {
    this.value = value;
    this.index = index;
    this.object = object;
  }

  function locate() {
    let indices = [];
    for (let i = 0; i < this.object.length; i++) {
      if (this.index && this.object[this.index] === this.value) {
        indices.push(this.index);
      }
    }
  }
}

let smth = new ObjectArray(1);
console.log(smth);

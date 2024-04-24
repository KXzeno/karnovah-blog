interface fnProps {
  (element: unknown,
   index?: number,
   reference?: object[]): boolean
}

class ObjectArray extends Array {
  constructor(value: object[]) {
    super();
    for (let i = 0; i < value.length; i++) {
      this[i] = value[i];
    }
  }

  locate(fn: fnProps) {
    let elements = Object.values(this[0]);
    for (let i = 0; i < elements.length; i++) {
      if (fn(elements[i])) {
        return elements[i];
      }
    }
  }
}

// let smth = new ObjectArray([{bruh: 'ight'}]);
// console.log(smth.locate((val) => val === 'ight'));

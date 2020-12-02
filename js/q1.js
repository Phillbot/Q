class StringBuilder {
  constructor(baseSgtring = "") {
    this.value = baseSgtring;
  }

  append(str) {
    this.value = str ? this.value + str : this.value;
    return this;
  }

  prepend(str) {
    this.value = str ? str + this.value : this.value;
    return this;
  }

  pad(str) {
    this.value = str ? str + this.value + str : this.value;
    return this;
  }
}

const builder = new StringBuilder(".");

builder.append("^").prepend("^").pad("=");
console.log(builder);

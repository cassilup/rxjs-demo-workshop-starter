const letAndConst = () => {

  console.log('------------------------------');
  console.group('Let and const!');

  // Let declaration
  let a = 1;
  console.log('Let declaration: ' + a);

  // Const declaration
  let b = 2;
  console.log('Const declaration: ' + b);

  // Block level scoping for let and const
  let c = (() => {
    console.group('Block level scoping for let and const');
    let d = 1;
    const e = 2;
    console.log('Before if block: d = ' + d + ', e = ' + e);
    if (true) {
      let d = 2;
      const f = 3;
      console.log('In if block: d = ' + d);
    }
    // console.log('Outside if block: f = ' + f);
    console.groupEnd();
  })();

  // Const assignment after initialization
  const foo = 'FOO';
  console.group('Const assignment after initialization');
  console.log('Initial value: ' + foo);
  // foo = 'BLAH';
  console.log('Value after assignment: ' + foo);
  console.groupEnd();

  // TDZ example
  console.group('TDZ example');
  console.log('Accessing before declaration: ' + pony);
  let pony = 'HERE';
  console.log('Accessing after declaration: ' + pony);
  console.groupEnd();

  console.groupEnd();

};

const arrowFunctions = () => {

  console.log('------------------------------');
  console.group('Arrow functions!');

  // Arrow function with implicit return
  let a = param => param;
  console.log('Arrow function with implicit return: ' + a(1));

  // Arrow function with implicit object return
  let b = param => ({ param });
  console.log('Arrow function with implicit object return');
  let res = b(1);
  console.log(res);

  // Arrow function with multiple params
  let c = (one, two) => {
    console.log('First param: ' + one);
    console.log('Second param: ' + two);
  };
  console.log('Arrow function with multiple params');
  c('ONE', 'TWO');

  // Arrow functions are lexically bound
  console.log('Arrow functions are lexically bound');
  let e = document.createElement('button');
  e.textContent = 'Button without arrow function';
  e.classList.add('elemOne');
  document.body.appendChild(e);
  document.querySelector('.elemOne').addEventListener('click', function() {
    console.log(this);
  });
  let f = document.createElement('button');
  f.textContent = 'Button with arrow function';
  f.classList.add('elemTwo');
  document.body.appendChild(f);
  document.querySelector('.elemTwo').addEventListener('click', () => {
    console.log(this);
  });

  console.groupEnd();

};

const classes = () => {

  console.log('------------------------------');
  console.group('Classes!');

  class Person {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }

    sayHi() {
      console.log(`Hello. My name is ${this.name}.`);
    }
  };

  class Male extends Person {
    constructor(name, age, gender) {
      super(name, age);
      this.gender = gender;
    }

    sayHi() {
      super.sayHi();
      console.log(`I am a ${this.gender}.`);
    }

    static doWork() {
      console.log('NEVEEEEER!!!');
    }
  }

  // Normal class initialization
  console.log('Normal class initialization');
  let p = new Person('Vlad', 25);
  p.sayHi();

  // Inheritance in action
  console.log('Inheritance in action');
  let r = new Male('Reign', 25, 'male');
  r.sayHi();

  // Static methods
  console.log('Static methods');
  Male.doWork();

  console.groupEnd();

};

// letAndConst();
// arrowFunctions();
// classes();

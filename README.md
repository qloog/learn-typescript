# TypeScript 学习笔记

## Requirement

- ES6
- Javascript

## Typescript 优势

- 错误提示
- 语法提示
- 可读性友好

## Typescript 运行环境

### 1. 安装node

选择 LTS 版本, 使用 `node -v` 和 `npm -v` 确认安装的版本, 如果都能输出对应的版本号，说明安装正常。

### 2. VS Code 编辑器配置

在 `Preference` -> `Settings` -> Search 以下内容：

1、`Quote`, 配置 Typescript 的 `Quote Style` 为单引号 `single`  
2、`tab`, 配置 Editor 的 `Tab Size` 为 2  
3、`save`, 把 Editor 的 `Format On Save` 勾选上 ✅

### 3. 安装插件

- prettier 自动格式化代码

### 4. 安装 typescript

```bash
npm install typescript@3.6.4 -g
```

验证 `typescript` 是否安装成功

```bash
tsc test.ts
```

```typescript
function add(a: number, b: number): number {
    return a + b;
}

// 调用函数并输出结果
const result = add(5, 3);
console.log("结果是：" + result);
```

如果能编译出 `test.js` 然后执行 `node test.js` 后输出 `结果是：8` 说明安装成功。

### 5. 安装 ts-node

我们看到上面需要两步操作(tsc test.ts, node test.js)才能执行输出结果，为了方便操作我们安装一个工具： `ts-node`

```bash
npm install ts-node@8.4.1 -g
```

然后可以使用 `ts-node test.ts` 直接输出结果。

## Typescript 基础语法

### 静态类型的深度理解

比如定义一个变量为数字类型的

```js
const count: number = 2023;
```

其实这里 `count` 除了是一个数字类型以外，还用于数字类型的属性和方法。比如 `count.toString()`

### 基础类型和对象类型

基础类型, 包括：string, number, null, undefiend, symbol, boolean, void

```js
const count: number = 2023;
const teachername: string = "King";
```

对象类型, 包括：{}, class, function, []

```js
const tearcher: {
  name: string,
  age: number
} = {
  name: "King",
  age: 18
};

// 数组对象
const numbers: number[] = [1,2,3];

// 类对象
class Person {}

cosnt king: Person = new Person();

// 函数类型, 方式1
const getTotal: (str: string) => number = (str) => {
  return parseInt(str, 10);
}

`(str: string) => number` : 为函数类型
`(str) => {
  return parseInt(str, 10);
}
`为函数体

// 函数类型, 方式2
const func = (str: string): number => {
  return parseInt(str, 10);
}
```

### 类型注解和类型推断

类型注解： type annotation
直接告诉TS变量是什么类型

```js
let count: number;
count = 123;
```

类型推断： type inference
TS 会自动分析变量的类型

```js
let count = 123;
```

如果TS能够自动分析变量类型，我们就什么也不需要做了
如果TS无法分析变量的类型，我们就需要使用类型注解了

```js
const firstNumber = 1;
const secondNumber = 2;
cosnt total = firstNumber + secondNumber;

// 无法分析变量类型
function getTotal(firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}

// 无法自动分析变量类型
const total = getTotal(1, 2);

// 改为使用注解类型
function getTotal(firstNumber: number, secondNumber: number) {
  return firstNumber + secondNumber;
}

// 可以自动推断出total的类型
const total = getTotal(1, 2);

// 这种情况也可以自动推断出类型
const obj = {
  name: 'king',
  age: 18
}
```

### 函数类型

定义函数有多种方式

```js
// 方式1
function hello() {}

// 方式2
const hello = function() {}

// 方式3：箭头函数方式
const hello = () => {}
```

函数返回值最好也加上类型定义

```js
// 返回结果是字符串，无法被提示出来
function add(first: number, second: number) {
  return first + second + '';
}

const total = add(1, 2);

// 由于返回结果加了类型定义，所以返回字符串会有提示
function add(first: number, second: number): number {
  return first + second + '';
}

const total = add(1, 2);
```

无返回值类型  

```js
function sayHello(): void {
  console.log('hello');
}
```

永远不可能执行到最后

```js
// 方式1
function errorEmitter(): never {
  throw new Error();
  // 后面的代码没法被执行
}

// 方式2
function errorEmitter(): never {
  while(true) {};
  // 后面的代码没法被执行
}
```

传递对象

```js
function add({first, second}) {
  return first + second;
}

const total = add({first: 1, second: 2});

// 正确
function add({first, second}: {first: number, second: number}): number {
  return first + second;
}

function getNumber({ first } : {first: number}) {
  return first;
}
```

可以使用 `interface` 来定义类型

```js
interface person {
  name: string,
  age: number
}

const a: Person = {name: 'aaa', age: 18};
```

如果类型不确定，或者类型可能会变，可以使用 `|`

```js
let data: number | string = 123;
data = 'test';
```

### 数组和元组

数组

```js
// 纯数字类型数组
const numberArr: number[] = [1, 2, 3];

// 可变类型
const arr: (number | string)[] = [1, '2', 3];

// undefined 数组
const undefiendArr: undefined[] = [undefined];

// 对象数组
const objectArr: {name: string}[] = [{
  name: 'test'
}]

// 优化后，使用类型别名
type User =  {name: string, age: number};

const objectArr: User[] = [{
  name: 'test',
  age: 18
}];
```

元组 tuple

```js
const user: [string, string, number] = ['King', 'male', 18];

const userList: [string, string, number][] = [
  ['King', 'male', 20],
  ['Queue', 'female', 18],
];
```

> 元组中的数组长度和类型都是固定的

### interface 接口

主要使用 interface 来定义类型，否则使用 type 来定义

```js
// type 定义
type Person = {
  name: string
}

// interface 定义
interface Person {
  // 属性定义
  readonly username: string;
  name: string;
  age?: number;

  // 可以自定义传入多个属性
  [propName: string]: any;

  // 方法定义
  sayHello(): string;
}

const person = {
  name: 'King',
  age: 18,
  sex: 'male',
  say() {
    return 'hi';
  }
}

// 类实现
class User implements Person {
  name = 'King';
  say() {
    return 'hi';
  }
}

// 接口继承接口
interface Teacher extends Person {
  teach(): string;
}

// 定义interface的函数类型
interface SayHi {
  (word: string): string
}

cosnt say: SayHi = (word: string) => {
  return word;
}
```

> 使用 tsc --init 会生成 tsconfig.json 配置文件

### 类的定义与继承

```js
class Person {
  // 类属性
  name = 'king';

  // 类方法
  getName() {
    return this.name;
  }
}

const person = new Person();
console.log(person.getName());

class Teacher extends Person {
  getTearcherName() {
    return 'Teacher';
  }

  // 复写父类的方法
  getName() {
    return 'teacher ' + super.getName();
  }
}

const teacher = new Teacher();
console.log(teacher.getName());
console.log(teacher.getTearcherName());

// 执行
// ts-node test.ts
```

### 类中的访问类型和构造函数

#### 访问类型

主要包含：private, protected, public(默认)

默认情况下，属性和类方法都是 `public`, `private` 只允许在类的内部使用，`protected` 只允许在类内部及其子类调用。

#### 构造函数

```js
class Person {
  // 传统写法
  // private name: string;
  // 在实例化类的时候自动执行
  // constructor(name: string) {
  //   this.name = name;
  // }

  // 简单写法，等价与上面的写法
  constructor(public name: string) {

  }
}

const person = new Person('King');
console.log(person.name);
// Output:
// King

class Teacher extends Person {
  constructor(public age: number) {
    // 子类继承父类，必须调用父类的构造函数，如果有参数需要传入对应的参数
    // 如果父类没有参数，可以不传：super()
    super('King');
  }
}

const teacher = new Teacher(28);
console.log(teacher.Name + teacher.age);
// Output: 
// King: 28
```

### 静态属性，Setter和Getter

```js
class Person {
  // 简单写法，等价与上面的写法
  constructor(private _name: string) {}

  // getter
  get name() {
    return this._name;
  }
  // setter
  set name(name: string) {
    this._name = name;
  }
}

const person = new Person('King');
// 这里不用 person.name();
console.log(person.name);
// Output: King
person.name = 'Queue';
console.log(person.name);
// Output: Queue
```

#### 单例模式

```js
class Demo {
  private static instance: Demo;

  private constructor(public name: string) {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new Demo('King');
    }

    return this.instance;
  }
}

const demo1 = Demo.getInstance();
const demo2 = Demo.getInstance();
console.log(demo1 == demo2);
console.log(demo1.name);
console.log(demo2.name);
// Output:
// true
// King
// King
```

### 抽象类

```js
abstract class Geom {
  abstract getArea(): number;
}

class Circle extends Geom {
  getArea() {
    return 123;
  }
}

// new Geom()  -> 不可以
// new Circle() -> 可以
```

抽象类只能被继承，不能被实例化。

### 联合类型和类型保护

```js
interface Bird {
  fly: boolean;
  sing: () => {};
}

interface Dog {
  fly: boolean;
  bark: () => {};
}

function trainAnimal(animal: Bird | Dog) {
  // 此时 animal 是一个联合类型, 只会提示共有的属性：fly
  // 调用 animal.sing() 或者 animal.brak() 会报错

  // 1、这时可以使用类型断言的方式来进行类型保护
  (animal as Bird).sing();
  // 或
  (animal as Dog).bark();

  // 2、使用 in 语法来做类型保护
  if ('sing' in animal) {
    animal.sing();
  } else {
    // 此时在编辑器会有提示了，typescript 会自动检测
    animal.bark();
  }
}

// 3、如果是数字或字符串，也可以使用 typeof来进行类型保护
function add(a: string | number, b: string | number) {
  if (typeof a === 'string'  || typeof b === 'string') {
    return `${a}${b}`;
  }

  return a + b;
}

// 4、如果是对象可以使用 instanceof 进行断言
```

### Enum 枚举类型

js 写法

```js
const Status = {
  OFFLINE: 0,
  ONLINE: 1,
  DELETED: 2
}

function getResult(status) {
  if (status === Status.OFFLINE) {
    return 'offline';
  } else if (status === Status.ONLINE) {
    return 'online';
  } else if (status == Status.DELETED) {
    return 'deleted';
  }
  return 'error';
}

const result = getResult(Status.OFFLINE);
console.log(reuslt);

// Output: offline
```

ts 写法

```js
// 数值默认会从0增加，所以对应的也是0,1,2
enum Status {
  OFFLINE,
  ONLINE,
  DELETED
}

function getResult(status: Status) {
  if (status === Status.OFFLINE) {
    return 'offline';
  } else if (status === Status.ONLINE) {
    return 'online';
  } else if (status == Status.DELETED) {
    return 'deleted';
  }
  return 'error';
}

const result = getResult(Status.OFFLINE);
console.log(result);

console.log(Status[0]); // OFFLINE, 可以相互映射

// 如果想改变枚举的初始值，可以这样写
enum Status {
  OFFLINE = 1,
  ONLINE,
  DELETED
}

console.log(Status[1]); // OFFLINE
```

### 泛型

泛型：generic 泛指的类型

#### 函数泛型

```js
function join<T>(first: T, second: T) {
  return `${first}${second}`;
}

// 返回类型也可以是T
function join<T>(first: T, second: T): T {
  return first;
}

// 也可以是不同的参数类型
function join2<T, P>(first: T, second: P) {
  return `${first}${second}`;
}

join<string>('1', '2');
join<number>(1, 2);
// 如果不指定类型，ts也会推断出参数的类型
join(1, '2');

join2<number, string>(1, '2');
```

#### 类的泛型

```js
// example 1
class DataManager<T> {
  constructor(private data: T[]) {}

  getItem(index: number): T {
    return this.data[index];
  }
}

const data = new DataManager<number>([1]);
data.getItem(0);

// example 2: 对T做类型约束，比如只能是字符串或者数字类型
class DataManager<T extends number | string> {
  constructor(private data: T[]) {}

  getItem(index: number): T {
    return this.data[index];
  }
}

// number
const data = new DataManager<number>([1]);
data.getItem(0);
// string
const data = new DataManager<string>([1]);
data.getItem(0);

// example 3
interface Item {
  name: string;
}

class DataManager<T extends Item> {
  constructor(private data: T[]) {}

  getItem(index: number): string {
    return this.data[index].name;
  }
}

const data = new DataManager([
  {
    name: 'King'
  }
]);
data.getItem(0);
```

### 命名空间 namespace

可以防止滥用全局变量

```js
namespace Home {
  class Header {}
  class Content {}
  class Footer {}

  // 必须使用 export 进行导出，否则 `Home.Page` 也无法调用
  export class Page {
    constructor() {
      new Header();
      new Content();
      new Footer();
    }
  }
}
```

在页面中可以使用 `new Home.Page()` 进行调用;

组件之间引用代码

```js
// components.ts
namespace Components {
  export class Header {}
  export class Content {}
  export class Footer {}
}

// page.ts
// reference 表示当前组件依赖于 path中的组件
/// <reference path='./components.ts'>

namespace Home {
  export class Page {
    constructor() {
      new Components.Header();
      new Components.Content();
      new Components.Footer();
    }
  }
}
```

`namespace` 也支持子命名空间和interface。

```js
namespace Components {
  export namespace SubComponents {
    export class Test{}
  }

  export interface User {
    name: string;
  }
}
```

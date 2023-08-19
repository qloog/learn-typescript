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

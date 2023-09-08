// decorator

function testDecorator(constructor: any) {
  constructor.prototype.getName = () => {
    console.log('test');
  }
  console.log('dcrorator');
}

@testDecorator
class Test {

}

const test = new Test();
(test as any).getName();
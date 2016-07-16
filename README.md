# unwrappable-proxy

unwrappable-proxy is a short utility for making proxies that are easy to unwrap.  It acts as an extension* of `Proxy.revocable` that returns the target object on revoke in order to make returning to the original object easier.

## Usage

```js
const uProxy = require("unwrappable-proxy");

let base = { foo: 0 };
let unwrappable = uProxy(base, {
	get(target, field) {
		return target[field] + 1;
	},
	set(target, field, value) {
		target[field] = value * 10;
	}
});

console.log(unwrappable.proxy.foo); // 1
unwrappable.proxy.foo = 2;
console.log(base.foo); // 20
console.log(unwrappable.proxy.foo); // 21

let obj = unwrappable.revoke();

console.log(obj === base); // true
console.log(unwrappable.proxy.foo); // TypeError: Cannot perform 'get' on a proxy that has been revoked
```
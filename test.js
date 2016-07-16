const uProxy = require("./index");
const log    = require("beautiful-log");

function assert(val) {
	if (val) {
		log.ok("Test passed");
	} else {
		log.error("Test failed");
	}
}

let base = { foo: 0 };
let unwrappable = uProxy(base, {
	get(target, field) {
		return target[field] + 1;
	},
	set(target, field, value) {
		target[field] = value * 10;
	}
});

assert(unwrappable.proxy.foo === 1);
unwrappable.proxy.foo = 2;
assert(base.foo === 20);
assert(unwrappable.proxy.foo === 21);

let result = unwrappable.revoke();

assert(result === base);

try {
	unwrappable.proxy.foo++;
	assert(false);
} catch (e) {
	assert(true);
}
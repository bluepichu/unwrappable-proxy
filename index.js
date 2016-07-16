module.exports = function(base, handler){
	let {proxy, revoke} = Proxy.revocable(base, handler);

	return new Proxy({}, {
		get(_, field) {
			switch (field) {
				case "revoke":
					return () => {
						revoke();
						return base;
					};

				case "proxy":
					return proxy;

				default:
					return;
			}
		}
	});
}
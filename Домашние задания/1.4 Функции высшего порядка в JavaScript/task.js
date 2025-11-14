//Задача № 1
function cachingDecoratorNew(func) {
	const cache = [];

	function wrapper(...args) {
		const hash = md5(args)
		const cachedItem = cache.find((item) => item.hash === hash);

		if (cachedItem) {
			console.log("Из кеша: " + cachedItem.result);
			return "Из кеша: " + cachedItem.result;
		}

		const result = func.apply(this, args);

		cache.push({
			hash: hash,
			result: result
		});
		if (cache.length > 5) {
			cache.shift();
		}

		console.log("Вычисляем: " + result);
		return "Вычисляем: " + result;
	}

	return wrapper;
}

//Задача № 2
function debounceDecoratorNew(func, delay) {
	let timeoutId;
	let isFirstCall = true;

	const wrapper = function(...args) {
		wrapper.allCount += 1;

		const context = this;

		if (isFirstCall) {
			func.apply(context, args);
			wrapper.count += 1;
			isFirstCall = false;
			return;
		}


		if (timeoutId) {
			clearTimeout(timeoutId);
		}

		timeoutId = setTimeout(function() {
			func.apply(context, args);
			wrapper.count += 1;
		}, delay);
	};

	wrapper.count = 0;
	wrapper.allCount = 0;

	return wrapper;
}
export const getValue = (serializedArray, paramObject) => {
	if (paramObject.multiple) {
		return serializedArray
			.filter((param) => param.name === paramObject.name)
			.map((param) => param.value);
	} else {
		const value = serializedArray
			.filter((param) => param.name === paramObject.name)
			.map((param) => param.value);
		
		// console.log(value)

		if (Array.isArray(value)) {
			switch (paramObject.type) {
				case 'string':
					return value.toString();
				case 'number':
					if (value[0] !== '') {
						return Number(value);
					} else {
						return value.toString();
					}
			}
		}
	}
};

export const getValue = (serializedArray, paramRule) => {
	if (paramRule.hasMultipleValues) {
		return serializedArray
			.filter((param) => param.name === paramRule.inputName)
			.map((param) => param.value);
	} else {
		const value = serializedArray
			.filter((param) => param.name === paramRule.inputName)
			.map((param) => param.value);
		
		// console.log(value)

		if (Array.isArray(value)) {
			switch (paramRule.type) {
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

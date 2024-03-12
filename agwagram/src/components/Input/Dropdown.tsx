import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import style from './Dropdown.module.scss';

interface DropdownProps {
	options: DropdownValue[];
	isClearable?: boolean;
	defaultValue?: DropdownValue;
	placeholder?: string;
	disabled?: boolean;
	onChange?: (selected: DropdownValue | null) => void;
}

export type DropdownValue = string | number | boolean | null;

type DropdownOption = {
	value: DropdownValue;
	label: string;
};

const makeOptions = (options: DropdownValue[]) => {
	return options.map((option) => ({ value: option, label: `${option}` }));
};

const Dropdown: React.FC<DropdownProps> = ({ options = [], isClearable = true, defaultValue = null, placeholder, disabled = false, onChange = () => {} }) => {
	const formattedOptions: DropdownOption[] = makeOptions(options);

	const [internalValue, setInternalValue] = useState<DropdownOption | null>();

	const valueToOption = (input: DropdownValue | null): DropdownOption | null => {
		return input ? formattedOptions.find((option) => option.value === input) || null : null;
	};

	useEffect(() => {
		setInternalValue(valueToOption(defaultValue));
	}, [defaultValue]);

	const handleChange = (selected: DropdownOption | null) => {
		let selectedValue: DropdownValue | null = null;

		if (selected != null) {
			selectedValue = (selected as DropdownOption).value;
		}

		setInternalValue(valueToOption(selectedValue));
		onChange(selectedValue);
	};

	return (
		<Select
			className={style.dropdown}
			classNamePrefix="dropdown"
			options={formattedOptions}
			isMulti={false}
			isClearable={isClearable}
			value={internalValue}
			placeholder={placeholder || 'Select'}
			isDisabled={disabled}
			onChange={handleChange}
		/>
	);
};

export default Dropdown;

import React, {ChangeEvent} from 'react';

interface Props {
  label: string;
  value: string;
  setState: ((string: string) => void);
  placeholder: string;
  isRequired: boolean;
}

function TextInput(props: Props) {
  const {label, value, isRequired, placeholder, setState} = props

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    return setState(event.target.value)
  }

  return (
    <div>
      <label>{label}</label>
      <input
        name="text"
        type="text"
        value={value}
        onChange={(event) => handleChange(event)}
        required={isRequired}
        placeholder={placeholder || ''}
        autoComplete={'off'}
      />
    </div>
  );
}

export default TextInput;

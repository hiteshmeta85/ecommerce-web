import React, {ChangeEvent} from 'react';

interface Props {
  type: string
  label: string;
  value: string;
  setState: ((string: string) => void);
  placeholder: string;
  isRequired: boolean;
}

function Input(props: Props) {
  const {label, value, isRequired, placeholder, setState, type} = props

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    return setState(event.target.value)
  }

  if (type === "text" || "password" || "email")
    return (
      <div className="py-2">
        <label>{label}</label>
        <input
          name="text"
          type={type}
          value={value}
          onChange={(event) => handleChange(event)}
          required={isRequired}
          placeholder={placeholder || ''}
          autoComplete={'off'}
          className="block border font-light border-1 py-1 px-2 rounded mt-1"
        />
      </div>
    );

  return null
}

export default Input;

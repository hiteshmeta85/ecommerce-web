import React from 'react';

interface Props {
  id: number;
  type: string;
  label: string;
  value: number;
  handleChange: (value: number, id: number) => void;
  isRequired: boolean;
  options: {
    key: number;
    value: number;
  }[];
}

function SelectInput(props: Props) {
  const {value, type, label, handleChange, isRequired, options, id} = props

  if (type === 'number')
    return (
      <div>
        <span>{label}</span>
        <select
          value={value}
          required={isRequired}
          onChange={(event: any) => handleChange(parseInt(event.target.value), id)}
          className="ml-2 border border-gray-200 px-1 py-0.5 rounded border-1"
        >
          {options.map((item, index) => {
            return <option key={index} value={item.key}>{item.value}</option>
          })}
        </select>
      </div>
    );

  return null
}

export default SelectInput;

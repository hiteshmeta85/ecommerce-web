import React, {ChangeEvent} from 'react';

interface Props {
  type: string;
  label: string;
  value: number;
  setState: (value: number) => void;
  isRequired: boolean;
  options: {
    key: number;
    value: number;
  }[];
  shouldSaveItToDatabase?: boolean;
}

function SelectInput(props: Props) {
  const {value, type, label, setState, isRequired, options, shouldSaveItToDatabase = false} = props

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (shouldSaveItToDatabase) {
      // make a request to backend and save the quantity amount
      // if successful update the state
      return setState(parseInt(event.target.value))
      // else show an error
    } else {
      return setState(parseInt(event.target.value))
    }
  }

  if (type === 'number')
    return (
      <div>
        <span>{label}</span>
        <select
          value={value}
          required={isRequired}
          onChange={(event) => handleChange(event)}
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

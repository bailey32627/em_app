import React, { useState, ChangeEvent } from 'react';


interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  initialValue?: number;
  onChange?: ( value: number ) => void;
};



export const Slider: React.FC< SliderProps > = ( { min = 0, max = 100, step = 1, initialValue = 50, onChange}) => {

  const [ value, setValue ] = useState<number>( initialValue );

  const handleChange = ( event: ChangeEvent< HTMLInputElement > ) => {
    const newValue = Number( event.target.value );
    setValue( newValue );
    if( onChange ) {
      onChange( newValue );
    }
  };

  return (
    <div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
      />
      <span>{value}</span> {/*display the current value */}
    </div>
  )
};

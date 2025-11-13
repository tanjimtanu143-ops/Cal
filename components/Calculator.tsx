
import React from 'react';
import Button from './Button';

interface CalculatorProps {
  displayValue: string;
  onNumberClick: (num: string) => void;
  onOperatorClick: (op: string) => void;
  onDecimalClick: () => void;
  onEqualsClick: () => void;
  onClearClick: () => void;
  onNegateClick: () => void;
  onPercentClick: () => void;
}

const Calculator: React.FC<CalculatorProps> = ({
  displayValue,
  onNumberClick,
  onOperatorClick,
  onDecimalClick,
  onEqualsClick,
  onClearClick,
  onNegateClick,
  onPercentClick,
}) => {
  return (
    <div className="bg-calculator rounded-3xl shadow-2xl overflow-hidden w-full max-w-xs md:max-w-sm mx-auto">
      <div className="text-display-text text-7xl font-light text-right p-6 pr-8 bg-display break-all h-28 flex items-end justify-end">
        {displayValue}
      </div>
      <div className="grid grid-cols-4 gap-2 p-4">
        <Button label="AC" onClick={onClearClick} type="special" />
        <Button label="+/-" onClick={onNegateClick} type="special" />
        <Button label="%" onClick={onPercentClick} type="special" />
        <Button label="÷" onClick={() => onOperatorClick('÷')} type="operator" />

        <Button label="7" onClick={() => onNumberClick('7')} />
        <Button label="8" onClick={() => onNumberClick('8')} />
        <Button label="9" onClick={() => onNumberClick('9')} />
        <Button label="×" onClick={() => onOperatorClick('×')} type="operator" />

        <Button label="4" onClick={() => onNumberClick('4')} />
        <Button label="5" onClick={() => onNumberClick('5')} />
        <Button label="6" onClick={() => onNumberClick('6')} />
        <Button label="-" onClick={() => onOperatorClick('-')} type="operator" />

        <Button label="1" onClick={() => onNumberClick('1')} />
        <Button label="2" onClick={() => onNumberClick('2')} />
        <Button label="3" onClick={() => onNumberClick('3')} />
        <Button label="+" onClick={() => onOperatorClick('+')} type="operator" />
        
        <Button label="0" onClick={() => onNumberClick('0')} className="col-span-2" />
        <Button label="." onClick={onDecimalClick} />
        <Button label="=" onClick={onEqualsClick} type="operator" />
      </div>
    </div>
  );
};

export default Calculator;
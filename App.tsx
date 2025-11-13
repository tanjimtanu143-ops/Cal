
import React, { useState, useCallback } from 'react';
import Calculator from './components/Calculator';

type Theme = 'theme-dark' | 'theme-light' | 'theme-ocean';

const App: React.FC = () => {
  const [currentValue, setCurrentValue] = useState('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [overwrite, setOverwrite] = useState(true);
  const [theme, setTheme] = useState<Theme>('theme-dark');

  const calculate = useCallback(() => {
    if (!previousValue || !operator) return currentValue;

    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);

    let result: number;
    switch (operator) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '×':
        result = prev * current;
        break;
      case '÷':
        if (current === 0) return 'Error';
        result = prev / current;
        break;
      default:
        return currentValue;
    }
    return result.toString();
  }, [currentValue, operator, previousValue]);

  const handleNumberClick = (num: string) => {
    if (overwrite) {
      setCurrentValue(num);
      setOverwrite(false);
    } else {
      if (currentValue === '0' && num !== '.') {
        setCurrentValue(num);
      } else {
        setCurrentValue(prev => prev + num);
      }
    }
  };

  const handleDecimalClick = () => {
    if (overwrite) {
        setCurrentValue('0.');
        setOverwrite(false);
        return;
    }
    if (!currentValue.includes('.')) {
      setCurrentValue(currentValue + '.');
    }
  };

  const handleOperatorClick = (op: string) => {
    if (previousValue && operator && !overwrite) {
      const result = calculate();
      setCurrentValue(result);
      setPreviousValue(result);
    } else {
      setPreviousValue(currentValue);
    }
    setOperator(op);
    setOverwrite(true);
  };

  const handleEqualsClick = () => {
    if (!previousValue || !operator) return;
    const result = calculate();
    setCurrentValue(result);
    setPreviousValue(null);
    setOperator(null);
    setOverwrite(true);
  };

  const handleClearClick = () => {
    setCurrentValue('0');
    setPreviousValue(null);
    setOperator(null);
    setOverwrite(true);
  };

  const handleNegateClick = () => {
    setCurrentValue(prev => (parseFloat(prev) * -1).toString());
  };

  const handlePercentClick = () => {
    setCurrentValue(prev => (parseFloat(prev) / 100).toString());
  };
  
  const getDisplayValue = () => {
    const num = parseFloat(currentValue);
    if (isNaN(num)) return currentValue; // Handles "Error" case
    return num.toLocaleString('en-US', { maximumFractionDigits: 9 });
  }

  const themes: { name: string, value: Theme }[] = [
    { name: 'Dark', value: 'theme-dark' },
    { name: 'Light', value: 'theme-light' },
    { name: 'Ocean', value: 'theme-ocean' },
  ];

  return (
    <div className={theme}>
      <main className="bg-main min-h-screen flex flex-col items-center justify-center font-sans p-4 transition-colors duration-300">
        <div className="mb-4 flex space-x-2 p-1 bg-calculator rounded-full border border-btn-default">
          {themes.map(({ name, value }) => (
            <button
              key={value}
              onClick={() => setTheme(value)}
              className={`px-4 py-1 text-sm rounded-full transition-colors ${
                theme === value
                  ? 'bg-btn-operator text-btn-operator-text'
                  : 'text-display-text hover:bg-btn-default'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
        <Calculator
          displayValue={getDisplayValue()}
          onNumberClick={handleNumberClick}
          onOperatorClick={handleOperatorClick}
          onDecimalClick={handleDecimalClick}
          onEqualsClick={handleEqualsClick}
          onClearClick={handleClearClick}
          onNegateClick={handleNegateClick}
          onPercentClick={handlePercentClick}
        />
      </main>
    </div>
  );
};

export default App;
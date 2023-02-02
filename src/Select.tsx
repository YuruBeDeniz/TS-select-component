import { useState } from "react"
import styles from "./select.module.css"

type SelectOption = {
    label: string
    value: any
}

type SelectProps = {
    onChange: (value: SelectOption | undefined) => void
    options: SelectOption[]
    value?: SelectOption
}

export default function Select({ onChange, options, value }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  function clearOptions () {
    onChange(undefined);
  };

  function selectOption (option: SelectOption) {
    onChange(option);
  };

  function isOptionSelected (option: SelectOption) {
    return option === value;
  }

  return (
    <div 
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen(prev => !prev)}
      tabIndex={0} 
      className={styles.container}>
      <span className={styles.value}>{value?.label}</span>
      <button onClick={e => {
        e.stopPropagation();
        clearOptions();
      }} className={styles["clear-btn"]}>&times;</button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
      <ul className={`${styles.options} ${isOpen ? styles.show : ''}`}>
        {options.map((option, index) => (
            <li 
              onClick={e => {
              e.stopPropagation();
              selectOption(option);
              setIsOpen(false);
            }} 
              onMouseEnter={() => setHighlightedIndex(index)}
              key={option.label} 
              className={`${styles.option} ${isOptionSelected(option) ? styles.selected : ""} 
              ${index === highlightedIndex ? styles.highlighted : ""}`}
            >
              {option.label}
            </li>
        ))}
      </ul>
    </div>
  )
}


//to close the div if somewhere off in the page is clicked: onBlur
//clearOptions function clear things but the it is still clickable and shows the options
//when X is clicked without e.stopPropagation().
//e.stopPropagation() stops the click event from going all the way to our parent div 
//which is going to open it up 
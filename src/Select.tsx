import { useEffect, useRef, useState } from "react"
import styles from "./select.module.css"

export type SelectOption = {
    label: string
    value: string | number
}

type SingleSelectProps = {
  onChange: (value: SelectOption | undefined) => void
  value?: SelectOption
  multiple?: false
}

type MutlipleSelectProps = {
  onChange: (value: SelectOption[] | undefined) => void
  value: SelectOption[]
  multiple: true
}

type SelectProps = {
    options: SelectOption[]
} & (SingleSelectProps | MutlipleSelectProps)

export function Select({ onChange, options, value, multiple }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null); 

  function clearOptions () {
    multiple ? onChange([]) : onChange(undefined);
  };

  function selectOption (option: SelectOption) {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter(o => o !== option));
      } else {
        onChange([...value, option])
      }       
    } else {
       if(option !== value) onChange(option);
    }
  };

  function isOptionSelected (option: SelectOption) {
    return multiple ? value.includes(option) : option === value;
  }

  useEffect(() => {
    if(isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target != containerRef.current) return;
      switch (e.code) {
        case "Enter":
        case "Space":
          setIsOpen(prev => !prev);
          if(isOpen) selectOption(options[highlightedIndex])
          break;
        case "ArrowUp":
        case "ArrowDown": {  
          if (!isOpen) {
            setIsOpen(true);
            break;
          }

          const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1)
          if (newValue >= 0 && newValue < options.length) {
            //we want to update the value as that means we overflowed and we dont want to move 
            setHighlightedIndex(newValue);
          }
          break;
        };    
        case "Escape":
          setIsOpen(false);
          break;  
      }
    }
    containerRef.current?.addEventListener("keydown", handler);
    return () => {
      containerRef.current?.removeEventListener("keydown", handler);
    }
  }, [isOpen, highlightedIndex, options])

  return (
    <div 
      ref={containerRef}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen(prev => !prev)}
      tabIndex={0} 
      className={styles.container}>
      <span className={styles.value}>{multiple ? value.map(v => (
        <button 
          key={v.value} 
          onClick={e => {
            e.stopPropagation();
            selectOption(v);
          }} 
          className={styles["option-badge"]}
        >
            {v.label}
        <span className={styles["remove-btn"]}>&times;</span></button>
      )) : value?.label}</span>
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
              key={option.value} 
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
# TS-select-component

https://github.com/WebDevSimplified/react-select

### use of useEffect for highlighting issue
highlighted element remains highlighted when we hover over it: to solve this, use useEffect (to start back at the first element):
anytime we change our open property, add [isOpen]: useEffect(() => {}, [isOpen]): so anytime open changes: if we are opening it, we change the highlighted index to zero: so every single time we open it, we reset our highlighted index back to zero:
useEffect(() => {
    if(isOpen) setHighlightedIndex(0);
  }, [isOpen])


### addition to selectOption function
if the select the same element again, we shouldnt call onChange(option) as it technically didnt change: if(option !== value) onChange(option);
adding if condition will save us from calling onChange more than we actually need

### selecOption function in multiple scenario:
if our value includes our option then we want to unselect it when we click on it. i.e. if we already selected this option before, if we reselect it, it will remove it from the list; if it's already in the list, onChange should remove it (filter out the value that currently is in there).
if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter(o => o !== option));
      } else {
        onChange([...value, option])
      }       
}
else, if we select a new option, add it.

### add keyboard accessibility
add a ref and use useEffect



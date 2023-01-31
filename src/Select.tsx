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
  return (
    <div tabIndex={0} className={styles.container}>
      <span className={styles.value}>{value?.label}</span>
      <button className={styles["clear-btn"]}>&times;</button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
      <ul className={`${styles.options} ${styles.show}`}>
        {options.map(option => (
            <li key={option.label} className={styles.option}>
                {option.label}
            </li>
        ))}
      </ul>
    </div>
  )
}

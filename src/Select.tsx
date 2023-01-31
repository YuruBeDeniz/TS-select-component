import styles from "./select.module.css"

type SelectOption = {
    lable: string
    value: string
}

type SelectProps = {
    onChange: (value: SelectOption | undefined) => void
    options: SelectOption[]
    value?: SelectOption
}

export default function Select({ onChange, options, value }: SelectProps) {
  return (
    <div className={styles.container}>
        
    </div>
  )
}

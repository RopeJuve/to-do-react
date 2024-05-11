import styles from './Input.module.css'

const Input = ({ ...props }) => {
    return (
        <input className={styles.container} {...props} />
    )
}

export default Input
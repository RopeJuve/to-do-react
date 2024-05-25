import classNames from 'classnames'
import styles from './Input.module.css'

const Input = ({ error , ...props }) => {
    const inputClasses =  classNames(styles.container, {
        [styles.error]: error
    })
    return (
        <>
        <input className={inputClasses} {...props} />  
        {error && <p className={styles.errorText}>This field is required</p>} 
        </>
    )
}

export default Input
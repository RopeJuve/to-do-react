import styles from './Button.module.css';
import classNames from "classnames";

const Button = ({ variant, children, ...props }) => {
    const btnClasses = classNames(styles.container, {
        [styles.primary]: variant === "primary",
        [styles.secondary]: variant === "secondary",
        [styles.menuButton]: variant === "editButton",
        [styles.deleteButton]: variant === "deleteButton",
        [styles.aside]: variant === "aside",
        [styles.createBoard]: variant === "createBoard",
        [styles.inActive]: variant === "inActive",

    });

    return (
        <button className={btnClasses} {...props}>{children}</button>
    )
}

export default Button
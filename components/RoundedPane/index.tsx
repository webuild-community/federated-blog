import styles from './RoundedPane.module.css';

export const RoundedPanel = ({ transparent, children }) => {
  const classNames = transparent
    ? styles.roundedPaneTransparent
    : styles.roundedPane;
  return <div className={classNames}>{children}</div>;
};

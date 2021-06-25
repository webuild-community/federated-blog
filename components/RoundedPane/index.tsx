import styles from './RoundedPane.module.css';

export const RoundedPanel = ({ children }) => {
  return <div className={styles.roundedPane}>{children}</div>;
};

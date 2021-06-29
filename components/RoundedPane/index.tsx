import styles from './RoundedPane.module.css';

interface RoundedPanel {
  transparent?: boolean;
  children: React.ReactNode;
}

export const RoundedPanel = ({ transparent, children }: RoundedPanel) => {
  const classNames = transparent
    ? styles.roundedPaneTransparent
    : styles.roundedPane;
  return <div className={classNames}>{children}</div>;
};

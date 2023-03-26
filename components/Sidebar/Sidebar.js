import styles from './Sidebar.module.scss';

export default function Sidebar({ children }) {
  return (
    <div className={styles.component}>
      {children}
    </div>
  );
}

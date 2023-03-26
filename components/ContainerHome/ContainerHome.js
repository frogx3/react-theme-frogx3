import styles from './ContainerHome.module.scss';

export default function ContainerHome({ children }) {
  return (
    <div className={styles.component}>
      {children}
    </div>
  );
}

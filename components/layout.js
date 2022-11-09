import styles from './layout.module.css';
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Link href={`/`}>Home</Link>
      {children}
    </div>
  );
}

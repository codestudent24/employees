import { Outlet } from "react-router-dom";
import { Layout as AntLayout } from "antd";
import styles from './index.module.css';
import { Header } from "../Header";

const Layout = () => {
  return (
    <main className={styles.main}>
      <AntLayout style={{
        height: '100%',
        backgroundColor: 'inherit',
      }}>
        <Header />
        <Outlet />
      </AntLayout>
    </main>
  )
}

export default Layout;
import styles from "./Navbar.module.scss";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "antd";

export default function Navbar() {
  const location = useLocation();

  const items = [
    {
      label: <Link to="/">QVB (Quick Vocabulary Builder)</Link>,
      key: "/",
    },
    {
      label: <Link to="/blog">Blog</Link>,
      key: "/blog",
    },
  ];

  return (
    <Menu
      className={styles.navbar}
      mode="horizontal"
      selectedKeys={[location.pathname]}
      items={items}
      style={{
        marginBottom: 20,
        fontSize: 16,
        padding: "10px 30px",
        borderRadius: 8,
      }}
    />
  );
}

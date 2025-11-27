import { useState } from "react";
import styles from "./Navbar.module.scss";
import { Link, useLocation } from "react-router-dom";
import { Menu, Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

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
    <div className={styles.navbarWrapper}>
      {/* Desktop Menu */}
      <Menu
        className={styles.navbar}
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={items}
      />

      {/* Mobile burger button */}
      <Button
        className={styles.burger}
        type="text"
        icon={<MenuOutlined />}
        onClick={() => setOpen(true)}
      />

      {/* Drawer Menu — mobile */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
      >
        <Menu
          mode="vertical"
          selectedKeys={[location.pathname]}
          items={items}
          onClick={() => setOpen(false)}
        />
      </Drawer>
    </div>
  );
}

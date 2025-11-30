import { useState } from "react";
import styles from "./Navbar.module.scss";
import { Link, useLocation } from "react-router-dom";
import { Menu, Drawer, Button, Modal } from "antd";
import { MenuOutlined, InfoCircleOutlined } from "@ant-design/icons";

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

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

      <InfoCircleOutlined
        className={styles.Info}
        style={{ fontSize: 24, cursor: "pointer", marginLeft: 10 }}
        onClick={() => setOpenModal(true)}
      />

      <Modal
        title="About QVP Tool"
        open={openModal}
        onCancel={() => setOpenModal(false)}
        footer={null}
      >
        <h3>What is QVP Tool?</h3>
        <p>
          QVP Tool is a simple and fast vocabulary assistant designed to help
          anyone learn new words more effectively. Type any word, see its
          translation instantly, save it to your personal list, edit whenever
          you need, and finally export your vocabulary as a clean DOCX file. The
          goal is to make learning faster, more organized, and enjoyable.
        </p>

        <h3>How it works</h3>
        <p>
          • Enter any word — QVP translates it automatically.
          <br />
          • Add it to your table — your personal dictionary grows.
          <br />
          • Edit or delete saved words anytime.
          <br />• Export everything to DOCX with one click for study or
          printing.
        </p>

        <h3>About the creator</h3>
        <p>
          QVP Tool is created by <b>Ayxan Həsənzadə</b> — a frontend developer
          from Azerbaijan who focuses on building clean, practical and
          learner-friendly web tools. Ayxan enjoys creating products that solve
          real problems, especially in language learning and productivity. QVP
          is one of his passion projects, built with the idea that vocabulary
          learning should always be simple, organized and accessible to
          everyone.
        </p>

        <h3>Blog</h3>
        <p>
          Inside the QVP Blog you will find beginner-friendly grammar
          explanations, essential vocabulary lists, pronunciation guides and
          practical tips to improve your English day by day. All articles are
          written in a clear and simple way, based on Ayxan’s own learning
          experience and his desire to make English easier for everyone.
          <br />
          <br />
          New blog posts are added regularly to help you keep learning without
          stress.
        </p>

        <h3>Links</h3>
        <p>
          <a href="https://github.com/AyxanHesenzade" target="_blank">
            GitHub
          </a>
          <br />
          <a href="https://instagram.com/hasa4zada" target="_blank">
            Instagram
          </a>
          <br />
          <a href="https://t.me/FrontEndAykhan" target="_blank">
            Telegram
          </a>
        </p>
      </Modal>
    </div>
  );
}

import { Card, Typography } from "antd";
import { Link } from "react-router-dom";
import { posts } from "../blog/data/posts";
import Navbar from "../components/Navbar";
import styles from "./Blog.module.scss";

const { Title } = Typography;

export default function Blog() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: 20,
        padding: "20px 10px",
        // overflow: "hidden",
        paddingTop: 70,
      }}

      
    >
      {/* LEFT SIDEBAR */}
      <div className={styles["sidebar-left"]}>
        <div className={styles["ad-box"]}>Advertisement</div>
      </div>

      {/* MAIN BLOG CONTENT */}
      <div
        style={{
          maxWidth: 900,
          width: "100%",
          height: "100%",
          overflowY: "auto",
          paddingRight: 10,
          paddingTop: 10,
        }}
      >
        <Navbar />
        <Title level={2}>Blog</Title>

        {posts.map((post) => (
          <Card key={post.slug} style={{ marginBottom: 20 }}>
            <Link to={`/blog/${post.slug}`}>
              <h3>{post.title}</h3>
            </Link>

            {/* Post list advertisement (optional) */}
            <div
              style={{
                width: "100%",
                height: 120,
                background: "#f1f1f1",
                borderRadius: 6,
                marginTop: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#777",
              }}
            >
              Advertisement
            </div>
          </Card>
        ))}
      </div>

      {/* RIGHT SIDEBAR */}
      <div className={styles["sidebar-right"]}>
        <div className={styles["ad-box"]}>Advertisement</div>
      </div>
      
    </div>
  );
}

import styles from "./QvbHeader.module.scss";
import { Input, DatePicker, Space, Select, Card, Typography } from "antd";

const { Title } = Typography;

const QvbHeader = ({
  lessonName,
  setLessonName,
  date,
  setDate,
  fromLang,
  setFromLang,
  toLang,
  setToLang,
  languages,
}) => {
  return (
    <Card className={styles.headerWrapper}>
      <Title level={3}>QVB – Quick Vocabulary Builder</Title>

      <Space direction="vertical" size="large" style={{ width: "100%", marginTop: 20 }}>
        <Input
          className={styles.input}
          placeholder="Lesson Name"
          value={lessonName}
          onChange={(e) => setLessonName(e.target.value)}
        />

        <DatePicker
          className={styles.input}
          value={date}
          onChange={(value) => setDate(value)}
        />

        <div className={styles.langSelects}>
          <Select
            className={styles.input}
            value={fromLang}
            options={languages}
            onChange={setFromLang}
          />
          <Select
            className={styles.input}
            value={toLang}
            options={languages}
            onChange={setToLang}
          />
        </div>
      </Space>
    </Card>
  );
};

export default QvbHeader;

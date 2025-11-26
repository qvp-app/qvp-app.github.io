import { useState } from "react";
import dayjs from "dayjs";

import QvbHeader from "../components/QvbHeader";
import QvbTable from "../components/QvbTable";
import QvbBottomButtons from "../components/QvbBottomButtons";
import { translateWord } from "../utils/translate";
import { exportDocx } from "../utils/generateDocx";
import { Input, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Navbar from "../components/Navbar";

const languages = [
  { label: "English", value: "en" },
  // { label: "Azerbaijani", value: "az" },
  { label: "Turkish", value: "tr" },
  { label: "Russian", value: "ru" },
  { label: "German", value: "de" },
  { label: "French", value: "fr" },
  { label: "Spanish", value: "es" },
  { label: "Italian", value: "it" },
  { label: "Arabic", value: "ar" },
  { label: "Chinese", value: "zh" },
];

function Home() {
  const [lessonName, setLessonName] = useState("");
  const [date, setDate] = useState(dayjs());
  const [rows, setRows] = useState([{ col1: "", col2: "" }]);
  const [fromLang, setFromLang] = useState("en");
  const [toLang, setToLang] = useState("tr");
  const maxRows = 20;

  const updateCell = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const deleteRow = (index) => {
    const updated = rows.filter((_, i) => i !== index);
    setRows(updated);
  };

  const addRow = () => {
    if (rows.length >= maxRows) return;
    setRows([...rows, { col1: "", col2: "" }]);
  };

  const handleWordChange = async (index, value) => {
    updateCell(index, "col1", value);

    if (value.trim()) {
      const translated = await translateWord(value, fromLang, toLang);
      updateCell(index, "col2", translated);
    } else {
      updateCell(index, "col2", "");
    }
  };

  const columns = [
    {
      title: "Word",
      dataIndex: "col1",
      render: (_, row, index) => (
        <Input
          value={row.col1}
          onChange={(e) => handleWordChange(index, e.target.value)}
        />
      ),
    },
    {
      title: "Meaning",
      dataIndex: "col2",
      render: (_, row, index) => (
        <Input
          value={row.col2}
          onChange={(e) => updateCell(index, "col2", e.target.value)}
        />
      ),
    },
    {
      title: "Delete",
      dataIndex: "delete",
      align: "center",
      width: 80,
      render: (_, __, index) => (
        <Button
          danger
          type="text"
          onClick={() => deleteRow(index)}
          icon={<DeleteOutlined />}
        />
      ),
    },
  ];

  return (
    <div style={{ padding: 40, maxWidth: 900, margin: "auto" }}>
      <Navbar />
      <QvbHeader
        lessonName={lessonName}
        setLessonName={setLessonName}
        date={date}
        setDate={setDate}
        fromLang={fromLang}
        setFromLang={setFromLang}
        toLang={toLang}
        setToLang={setToLang}
        languages={languages}
      />

      <QvbTable
        rows={rows}
        columns={columns}
        updateCell={updateCell}
        deleteRow={deleteRow}
         handleWordChange={handleWordChange}
      />

      <QvbBottomButtons
        rows={rows}
        maxRows={maxRows}
        addRow={addRow}
        exportDocx={() =>
          exportDocx(lessonName, date.format("YYYY-MM-DD"), rows)
        }
      />
    </div>
  );
}

export default Home;

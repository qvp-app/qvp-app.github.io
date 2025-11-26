import React, { useState } from "react";
import "antd/dist/reset.css";
import { useDebounce } from "./hooks/useDebounce";

import {
  Button,
  Card,
  Input,
  DatePicker,
  Space,
  Typography,
  Table,
  Select,
} from "antd";
import { PlusOutlined, DownloadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import {
  Document,
  Packer,
  Paragraph,
  Table as DocxTable,
  TableRow,
  TableCell,
  TextRun,
} from "docx";
import { saveAs } from "file-saver";

const { Title } = Typography;

const languages = [
  { label: "English", value: "en" },
  { label: "Azerbaijani", value: "az" },
  { label: "Turkish", value: "tr" },
  { label: "Russian", value: "ru" },
  { label: "German", value: "de" },
  { label: "French", value: "fr" },
  { label: "Spanish", value: "es" },
  { label: "Italian", value: "it" },
  { label: "Arabic", value: "ar" },
  { label: "Chinese", value: "zh" },
];

// GOOGLE TRANSLATE FUNCTION (CORS FREE)
async function translateWord(text, from, to) {
  if (!text.trim()) return "";

  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(
    text
  )}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data[0][0][0]; 
  } catch (err) {
    console.log("Translate error:", err);
    return "";
  }
}

function App() {
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

  const downloadDocx = () => {
    const tableRows = rows.map(
      (r) =>
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph(r.col1 || "")] }),
            new TableCell({ children: [new Paragraph(r.col2 || "")] }),
          ],
        })
    );

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: `Lesson: ${lessonName}`, bold: true }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Date: ${date.format("YYYY-MM-DD")}`,
                  bold: true,
                }),
              ],
            }),
            new Paragraph(" "),
            new DocxTable({
              rows: [
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph("Word")] }),
                    new TableCell({ children: [new Paragraph("Meaning")] }),
                  ],
                }),
                ...tableRows,
              ],
            }),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "QVB-Vocabulary.docx");
    });
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
  ];

  return (
    <div style={{ padding: 40, maxWidth: 900, margin: "auto" }}>
      <Card style={{ marginBottom: 20, padding: 20 }}>
        <Title level={3}>QVB – Quick Vocabulary Builder</Title>

        <Space direction="vertical" size="large" style={{ width: "100%", marginTop: 20 }}>
          <Input
            placeholder="Lesson Name"
            value={lessonName}
            onChange={(e) => setLessonName(e.target.value)}
          />

          <DatePicker
            style={{ width: "100%" }}
            value={date}
            onChange={(value) => setDate(value)}
          />

          <Space size="large" style={{ width: "100%",  justifyContent: "space-between" }}>
            <Select
              style={{ width: "100%" }}
              value={fromLang}
              options={languages}
              onChange={setFromLang}
            />
            <Select
              style={{ width: "100%" }}
              value={toLang}
              options={languages}
              onChange={setToLang}
            />
          </Space>
        </Space>
      </Card>

      <Card style={{ padding: 20 }}>
        <Table
          dataSource={rows}
          columns={columns}
          pagination={false}
          rowKey={(_, index) => index}
        />

        <Space style={{ marginTop: 20 }}>
          {rows.length < maxRows && (
            <Button type="primary" icon={<PlusOutlined />} onClick={addRow}>
              Add Row
            </Button>
          )}

          <Button type="default" icon={<DownloadOutlined />} onClick={downloadDocx}>
            Download DOCX
          </Button>
        </Space>
      </Card>
    </div>
  );
}

export default App;

import { useState } from "react";
import { Input, Button, Card } from "antd";

export default function QvbInputArea({ onAddWord, translateWord }) {
  const [text, setText] = useState("");
  const [meaning, setMeaning] = useState("");

  // Textarea-da söz dəyişəndə avtomatik tərcümə et
  const handleChange = async (value) => {
    setText(value);

    if (value.trim() !== "") {
      const tr = await translateWord(value);
      setMeaning(tr);
    } else {
      setMeaning("");
    }
  };

  const handleAdd = () => {
    if (!text.trim() || !meaning.trim()) return;

    onAddWord({
      col1: text,
      col2: meaning,
    });

    setText("");
    setMeaning("");
  };

  return (
    <Card style={{ marginBottom: 20 }}>
      <label>Word</label>
      <Input.TextArea
        rows={3}
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Write a word..."
      />

      <label style={{ marginTop: 10, display: "block" }}>Meaning</label>
      <Input value={meaning} disabled />

      <Button
        type="primary"
        style={{ marginTop: 10 }}
        onClick={handleAdd}
      >
        Add to Table
      </Button>
    </Card>
  );
}

import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  TextRun,
} from "docx";
import { saveAs } from "file-saver";

function cleanText(str) {
  if (!str) return "";
  return str
    .replace(/\n/g, "")
    .replace(/\r/g, "")
    .replace(/\u200B/g, "")
    .replace(/\u00AD/g, "")
    .replace(/\u00A0/g, " ")
    .trim();
}

export function exportDocx(lessonName, date, rows) {
  const tableRows = rows.map(
    (r) =>
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph(cleanText(r.col1))] }),
          new TableCell({ children: [new Paragraph(cleanText(r.col2))] }),
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
            children: [new TextRun({ text: `Date: ${date}`, bold: true })],
          }),
          new Paragraph(" "),
          new Table({
            width: { size: 100, type: "pct" },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Word")],
                    shading: { fill: "EEEEEE" },
                  }),
                  new TableCell({
                    children: [new Paragraph("Meaning")],
                    shading: { fill: "EEEEEE" },
                  }),
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
    saveAs(blob, "QVP-Vocabulary.docx");
  });
}

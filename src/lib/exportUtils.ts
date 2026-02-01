
import * as XLSX from "xlsx";

/**
 * Downloads data as a CSV file.
 * @param data Array of objects representing rows.
 * @param headers Array of strings as column headers.
 * @param filename Name of the CSV file.
 */
export function downloadAsCSV(
  data: Record<string, any>[],
  headers: string[],
  filename: string
) {
  const csvRows = [
    headers.join(","),
    ...data.map(row =>
      headers
        .map(header => {
          // In real data, you would map header to the object's key
          const key = header
            .toLowerCase()
            .replace(/ /g, "");
          return JSON.stringify(row[key] ?? "");
        })
        .join(",")
    ),
  ];
  const csvContent = csvRows.join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

/**
 * Downloads data as an Excel (.xlsx) file.
 * @param data Array of objects representing rows.
 * @param headers Array of strings as column headers.
 * @param filename Name of the Excel file.
 */
export function downloadAsXLSX(
  data: Record<string, any>[],
  headers: string[],
  filename: string
) {
  // We need to reshape data for xlsx: array of objects with header-keys matching
  const mappedData = data.map(row => {
    const out: Record<string, any> = {};
    headers.forEach(header => {
      // Same mapping logic as above
      const key = header
        .toLowerCase()
        .replace(/ /g, "");
      out[header] = row[key] ?? "";
    });
    return out;
  });
  const worksheet = XLSX.utils.json_to_sheet(mappedData, { header: headers });
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
  XLSX.writeFile(workbook, filename);
}

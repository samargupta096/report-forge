
import React, { useState, useEffect } from "react";

export default function FormSubmissionsViewer() {
  const [formNames, setFormNames] = useState<string[]>([]);
  const [selectedForm, setSelectedForm] = useState<string>("");
  const [submissions, setSubmissions] = useState<any[]>([]);

  // Find all unique forms from localStorage
  useEffect(() => {
    const keys = Object.keys(localStorage).filter(key => key.startsWith("formdata-"));
    const names = keys.map(key => key.replace("formdata-", ""));
    setFormNames(names);
  }, []);

  useEffect(() => {
    if (selectedForm) {
      const raw = localStorage.getItem(`formdata-${selectedForm}`);
      setSubmissions(raw ? JSON.parse(raw) : []);
    } else {
      setSubmissions([]);
    }
  }, [selectedForm]);

  return (
    <div className="my-6">
      <div className="flex gap-2 items-center mb-3">
        <label htmlFor="form-picker" className="font-medium">Select Form: </label>
        <select
          id="form-picker"
          className="border rounded px-2 py-1"
          value={selectedForm}
          onChange={(e) => setSelectedForm(e.target.value)}
        >
          <option value="">-- Choose --</option>
          {formNames.map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </div>
      {selectedForm && (
        <div className="overflow-x-auto rounded bg-white border p-3">
          <h4 className="font-semibold mb-3">Submissions for <span className="text-primary">{selectedForm}</span></h4>
          {submissions.length === 0 ? (
            <div className="italic text-muted-foreground">No submissions yet.</div>
          ) : (
            <table className="min-w-full border bg-white rounded">
              <thead>
                <tr>
                  {Object.keys(submissions[0]).map((field, idx) => (
                    <th key={field+idx} className="px-3 py-2 border-b font-medium text-sm">{field}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {submissions.map((row, idx) => (
                  <tr key={idx} className="hover:bg-muted/40">
                    {Object.keys(row).map((field, id2) => (
                      <td key={field+id2} className="px-3 py-2 border-b text-xs">{row[field]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

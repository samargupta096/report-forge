
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Field = {
  id: string;
  label: string;
  type: "text" | "number" | "textarea";
  required: boolean;
};

type CreatedForm = {
  id: string;
  name: string;
  fields: Field[];
};

function getAllForms(): CreatedForm[] {
  // Try to load from session (current session)
  const raw = sessionStorage.getItem("formbuilder-forms");
  if (raw) return JSON.parse(raw);
  return [];
}

function getFormById(id: string | undefined): CreatedForm | undefined {
  if (!id) return undefined;
  const forms = getAllForms();
  return forms.find(f => f.id === id);
}

export default function DynamicFormPage() {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState<CreatedForm | undefined>(undefined);
  const [values, setValues] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const found = getFormById(formId);
    setForm(found);
    if (found) {
      // Set defaults (empty) for all fields
      const v: any = {};
      found.fields.forEach(f => {
        v[f.id] = "";
      });
      setValues(v);
    }
  }, [formId]);

  if (!form) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-4">
        <h2 className="text-xl font-bold mb-4">Form not found</h2>
        <Button variant="outline" onClick={() => navigate("/form-builder")}>
          Back to Form Builder
        </Button>
      </div>
    );
  }

  const handleChange = (id: string, value: string) => {
    setValues(v => ({ ...v, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Compose data object with label:value pairs
    const data: any = {};
    form.fields.forEach(f => {
      data[f.label] = values[f.id] || "";
    });
    // Save to localStorage (same as builder's logic)
    const key = `formdata-${form.name}`;
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    existing.push(data);
    localStorage.setItem(key, JSON.stringify(existing));
    setSubmitted(true);
  };

  return (
    <div className="max-w-xl mx-auto bg-white border rounded p-6 my-8 shadow">
      <h1 className="text-2xl font-bold mb-3">{form.name}</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {form.fields.map(f => (
          <div key={f.id}>
            <label className="block text-sm font-medium mb-1" htmlFor={f.id}>
              {f.label} {f.required && <span className="text-destructive">*</span>}
            </label>
            {f.type === "text" && (
              <Input
                id={f.id}
                required={f.required}
                value={values[f.id] || ""}
                onChange={e => handleChange(f.id, e.target.value)}
                placeholder={f.label}
              />
            )}
            {f.type === "number" && (
              <Input
                id={f.id}
                type="number"
                required={f.required}
                value={values[f.id] || ""}
                onChange={e => handleChange(f.id, e.target.value)}
                placeholder={f.label}
              />
            )}
            {f.type === "textarea" && (
              <Textarea
                id={f.id}
                required={f.required}
                value={values[f.id] || ""}
                onChange={e => handleChange(f.id, e.target.value)}
                placeholder={f.label}
              />
            )}
          </div>
        ))}
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
      {submitted && (
        <div className="mt-4 p-3 rounded bg-green-100 text-green-800">
          Submission saved!
        </div>
      )}
      <div className="mt-4 flex gap-2">
        <Button variant="outline" onClick={() => navigate("/form-builder")}>
          Back to Form Builder
        </Button>
      </div>
    </div>
  );
}

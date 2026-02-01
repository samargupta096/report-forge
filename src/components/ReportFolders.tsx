
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

type Folder = { name: string; id: number };

export default function ReportFolders() {
  const [folders, setFolders] = React.useState<Folder[]>([]);
  const [name, setName] = React.useState("");
  React.useEffect(() => {
    const saved = localStorage.getItem("reportFolders");
    setFolders(saved ? JSON.parse(saved) : []);
  }, []);
  React.useEffect(() => {
    localStorage.setItem("reportFolders", JSON.stringify(folders));
  }, [folders]);

  return (
    <div className="mb-8">
      <h4 className="font-bold mb-2 flex gap-2 items-center">Report Folders</h4>
      <div className="flex gap-2 mb-3">
        <input
          className="border p-1 rounded text-sm"
          placeholder="New folder name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Button
          size="sm"
          onClick={() => {
            if (name) setFolders(f => [...f, { id: Date.now(), name }]);
            setName("");
          }}
        ><Plus size={14} className="mr-1" />Add</Button>
      </div>
      <ul className="space-y-2">
        {folders.length === 0 && (
          <li className="italic text-muted-foreground">No folders created yet.</li>
        )}
        {folders.map(f => (
          <li key={f.id} className="flex justify-between items-center bg-white rounded p-2 border">
            <span>{f.name}</span>
            <Button
              size="icon" variant="outline"
              onClick={() => setFolders(fs => fs.filter(x => x.id !== f.id))}
              title="Delete folder"
            >
              <Trash2 size={14}/>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

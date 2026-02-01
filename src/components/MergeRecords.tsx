
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

type Row = {
  id: number;
  name: string;
  email: string;
  joined: string;
};

const sampleRows: Row[] = [
  { id: 1, name: "Alice Lee", email: "alice@email.com", joined: "2023-10-11" },
  { id: 2, name: "Alice L.", email: "alice@email.com", joined: "2023-10-13" },
  { id: 3, name: "Bob Smith", email: "bob@email.com", joined: "2023-10-14" },
  { id: 4, name: "Carol White", email: "carol@email.com", joined: "2023-10-11" },
];


export default function MergeRecords() {
  const [selected, setSelected] = useState<number[]>([]);

  const handleSelect = (id: number) => {
    setSelected((s) =>
      s.includes(id) ? s.filter((v) => v !== id) : [...s, id]
    );
  };

  const handleMerge = () => {
    if (selected.length < 2) {
      toast({
        title: "Select 2+ rows",
        description: "Choose at least two records to merge.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Merged Records!",
      description: "Selected records would be merged (demo only).",
    });
    setSelected([]);
  };

  return (
    <div>
      <div className="flex mb-2 justify-between items-center">
        <div className="font-medium text-lg">Select records to merge</div>
        <Button variant="outline" onClick={handleMerge} disabled={selected.length < 2}>
          Merge Selected
        </Button>
      </div>
      <div className="overflow-auto rounded-xl border shadow-sm bg-white">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b"></th>
              <th className="px-4 py-2 border-b text-left">ID</th>
              <th className="px-4 py-2 border-b text-left">Name</th>
              <th className="px-4 py-2 border-b text-left">Email</th>
              <th className="px-4 py-2 border-b text-left">Joined</th>
            </tr>
          </thead>
          <tbody>
            {sampleRows.map((row) => (
              <tr key={row.id}
                className={selected.includes(row.id) ? "bg-blue-50" : ""}
              >
                <td className="px-4 py-2 border-b text-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-primary"
                    checked={selected.includes(row.id)}
                    onChange={() => handleSelect(row.id)}
                    aria-label={`Select row ${row.id}`}
                  />
                </td>
                <td className="px-4 py-2 border-b">{row.id}</td>
                <td className="px-4 py-2 border-b">{row.name}</td>
                <td className="px-4 py-2 border-b">{row.email}</td>
                <td className="px-4 py-2 border-b">{row.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

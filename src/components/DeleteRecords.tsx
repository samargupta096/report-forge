
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

type Row = {
  id: number;
  name: string;
  email: string;
  joined: string;
};

const initialRows: Row[] = [
  { id: 1, name: "Alice Lee", email: "alice@email.com", joined: "2023-10-11" },
  { id: 2, name: "Alice L.", email: "alice@email.com", joined: "2023-10-13" },
  { id: 3, name: "Bob Smith", email: "bob@email.com", joined: "2023-10-14" },
  { id: 4, name: "Carol White", email: "carol@email.com", joined: "2023-10-11" },
];

export default function DeleteRecords() {
  const [rows, setRows] = useState<Row[]>(initialRows);
  const [selected, setSelected] = useState<number[]>([]);

  const handleSelect = (id: number) => {
    setSelected((s) =>
      s.includes(id) ? s.filter((v) => v !== id) : [...s, id]
    );
  };

  const handleDelete = () => {
    if (!selected.length) {
      toast({
        title: "Select Records",
        description: "Choose records to delete.",
        variant: "destructive",
      });
      return;
    }
    setRows((r) => r.filter((row) => !selected.includes(row.id)));
    toast({
      title: "Deleted!",
      description: "Selected records were deleted (demo only).",
    });
    setSelected([]);
  };

  return (
    <div>
      <div className="flex mb-2 justify-between items-center">
        <div className="font-medium text-lg">Select records to delete</div>
        <Button variant="destructive" onClick={handleDelete} disabled={!selected.length}>
          Delete Selected
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
            {rows.map((row) => (
              <tr key={row.id}
                className={selected.includes(row.id) ? "bg-red-50" : ""}
              >
                <td className="px-4 py-2 border-b text-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-destructive"
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

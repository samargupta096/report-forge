
import React, { useRef } from "react";
import KpiWidget from "@/components/KpiWidget";

// Sort/reorder using drag-n-drop, order saved in localStorage
function moveItem<T>(arr: T[], from: number, to: number) {
  const updated = [...arr];
  const [moved] = updated.splice(from, 1);
  updated.splice(to, 0, moved);
  return updated;
}

type Kpi = { label: string; value: string | number; category?: string };

type Props = {
  kpis: Kpi[];
  setKpis: (items: Kpi[]) => void;
  onKpiClick: (kpi: Kpi) => void;
  editable: boolean;
};

export default function CustomizableKpiList({ kpis, setKpis, onKpiClick, editable }: Props) {
  const dragIdx = useRef<number | null>(null);

  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {kpis.map((kpi, i) => (
        <div
          key={kpi.label}
          draggable={editable}
          onDragStart={e => { dragIdx.current = i; }}
          onDragOver={e => {
            e.preventDefault();
            e.currentTarget.classList.add("ring-2");
          }}
          onDragLeave={e => e.currentTarget.classList.remove("ring-2")}
          onDrop={e => {
            e.currentTarget.classList.remove("ring-2");
            if (dragIdx.current !== null && dragIdx.current !== i) {
              setKpis(moveItem(kpis, dragIdx.current, i));
              // Save order to localStorage (simulate user preference)
              localStorage.setItem("kpiOrder", JSON.stringify(moveItem(kpis, dragIdx.current, i).map(x => x.label)));
            }
            dragIdx.current = null;
          }}
          className={editable ? "cursor-move" : ""}
          onClick={() => onKpiClick(kpi)}
          title={editable ? "Drag to re-order. Click to drill down." : "Click to drill down"}
        >
          <KpiWidget label={kpi.label} value={kpi.value} />
        </div>
      ))}
    </div>
  );
}

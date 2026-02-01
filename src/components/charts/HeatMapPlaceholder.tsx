
import React from "react";

export default function HeatMapPlaceholder() {
  return (
    <div className="w-full h-40 flex items-center justify-center bg-green-100 rounded border border-green-400 text-green-700 text-center font-semibold">
      <span>
        [Heat Map visualization placeholder]<br />
        (Want a full heat map? Ask to enable <b>recharts</b> here!)
      </span>
    </div>
  );
}

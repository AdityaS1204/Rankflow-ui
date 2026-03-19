import React from "react";

interface Prop {
  name: string;
  type: string;
  default: string;
  description: string;
}

interface PropsTableProps {
  props: Prop[];
}

export function PropsTable({ props }: PropsTableProps) {
  if (!props || props.length === 0) return null;

  return (
    <div className="my-10 overflow-x-auto">
      <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">Props Reference</h2>
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-4 py-3 text-sm font-semibold text-foreground">Prop</th>
              <th className="px-4 py-3 text-sm font-semibold text-foreground">Type</th>
              <th className="px-4 py-3 text-sm font-semibold text-foreground">Default</th>
              <th className="px-4 py-3 text-sm font-semibold text-foreground">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {props.map((prop) => (
              <tr key={prop.name} className="hover:bg-muted/10 transition-colors">
                <td className="px-4 py-4 font-mono text-xs font-semibold text-amber-500">{prop.name}</td>
                <td className="px-4 py-4 font-mono text-xs text-blue-400">{prop.type}</td>
                <td className="px-4 py-4 font-mono text-xs text-muted-foreground">{prop.default}</td>
                <td className="px-4 py-4 text-sm text-balance leading-relaxed text-muted-foreground">{prop.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

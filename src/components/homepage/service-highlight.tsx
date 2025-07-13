import type { ReactNode } from "react";

interface ServiceHighlightProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function ServiceHighlight({
  icon,
  title,
  description,
}: ServiceHighlightProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <h3 className="font-medium text-sm">{title}</h3>
        <p className="text-sm text-white/70">{description}</p>
      </div>
    </div>
  );
}

/** Minimal renderer for the light markdown the AI Command Center returns. */
const renderInline = (line: string) =>
  line.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-foreground">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );

export default function AiText({ text }: { text: string }) {
  const lines = text.split("\n");

  return (
    <div className="space-y-1.5 text-sm leading-relaxed text-muted-foreground">
      {lines.map((raw, i) => {
        const line = raw.trimEnd();
        if (!line.trim()) return <div key={i} className="h-1.5" />;

        const bullet = line.match(/^\s*(?:[-*•]|\d+\.)\s+(.*)$/);
        if (bullet) {
          return (
            <div key={i} className="flex gap-2 pl-1">
              <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <p>{renderInline(bullet[1])}</p>
            </div>
          );
        }

        const heading = line.match(/^#{1,4}\s+(.*)$/);
        if (heading) {
          return (
            <h3 key={i} className="pt-2 text-sm font-semibold text-foreground">
              {renderInline(heading[1])}
            </h3>
          );
        }

        return <p key={i}>{renderInline(line)}</p>;
      })}
    </div>
  );
}

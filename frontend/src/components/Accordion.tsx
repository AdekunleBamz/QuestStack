/**
 * Accordion Component
 * Collapsible content panels
 * 
 * @component
 */

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
}

export function Accordion({ items }: AccordionProps) {
  return (
    <div className="accordion">
      {items.map((item, index) => (
        <details key={index} className="accordion-item">
          <summary>{item.title}</summary>
          <div className="accordion-content">{item.content}</div>
        </details>
      ))}
    </div>
  );
}

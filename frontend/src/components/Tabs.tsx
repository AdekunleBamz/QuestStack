/**
 * Tabs Component
 * Tab navigation component
 * 
 * @component
 */

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
}

export function Tabs({ tabs, defaultTab }: TabsProps) {
  return (
    <div className="tabs">
      <div className="tab-list">
        {tabs.map((tab) => (
          <button key={tab.id} className="tab">{tab.label}</button>
        ))}
      </div>
      <div className="tab-content">
        {tabs[0]?.content}
      </div>
    </div>
  );
}

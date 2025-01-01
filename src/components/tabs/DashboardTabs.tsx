import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface DashboardTabsProps {
  activeSection: string;
  isAuthenticated: boolean;
  onValueChange: (value: string) => void;
}

const DashboardTabs = ({ activeSection, isAuthenticated, onValueChange }: DashboardTabsProps) => {
  return (
    <ToggleGroup
      type="single"
      value={activeSection}
      onValueChange={(value) => {
        if (value) onValueChange(value);
      }}
      className="justify-start"
    >
      <ToggleGroupItem value="INTRODUCTION" aria-label="Show introduction">
        Introduction
      </ToggleGroupItem>
      <ToggleGroupItem value="OVERVIEW" aria-label="Show overview">
        Overview
      </ToggleGroupItem>
      {isAuthenticated && (
        <>
          <ToggleGroupItem value="ACTIVE" aria-label="Show active projects">
            Active
          </ToggleGroupItem>
          <ToggleGroupItem value="UPCOMING" aria-label="Show upcoming projects">
            Upcoming
          </ToggleGroupItem>
          <ToggleGroupItem value="ENDED" aria-label="Show ended projects">
            Ended
          </ToggleGroupItem>
        </>
      )}
    </ToggleGroup>
  );
};

export default DashboardTabs;
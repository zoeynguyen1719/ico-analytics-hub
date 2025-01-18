import DashboardLayout from "@/components/DashboardLayout";
import ResourcePanel from "@/components/dashboard/ResourcePanel";
import UnitsPanel from "@/components/dashboard/UnitsPanel";
import CommandCenter from "@/components/dashboard/CommandCenter";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Resource Panel */}
        <div className="xl:col-span-3">
          <ResourcePanel />
        </div>

        {/* Main Content Area */}
        <div className="xl:col-span-6 space-y-6">
          <CommandCenter />
          {/* Map component will be added here in a future update */}
        </div>

        {/* Units Panel */}
        <div className="xl:col-span-3">
          <UnitsPanel />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;

import DashboardLayout from "@/components/DashboardLayout";
import ICOAnalytics from "@/components/ico/ICOAnalytics";

const Analytics = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
        <ICOAnalytics />
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
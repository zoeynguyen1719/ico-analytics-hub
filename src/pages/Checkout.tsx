import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import DashboardLayout from "@/components/DashboardLayout";

const CheckoutPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const paymentStatus = searchParams.get("payment");

  useEffect(() => {
    if (paymentStatus === "success") {
      toast.success("Payment successful! Welcome to your new subscription tier!");
      setTimeout(() => navigate("/dashboard"), 2000);
    } else if (paymentStatus === "cancelled") {
      toast.error("Payment was cancelled. Please try again.");
      setTimeout(() => navigate("/subscription"), 2000);
    }
  }, [paymentStatus, navigate]);

  return (
    <DashboardLayout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          {paymentStatus === "success" ? (
            <>
              <h1 className="text-3xl font-bold text-crypto-blue">
                Payment Successful!
              </h1>
              <p className="text-gray-400">
                Thank you for your subscription. Redirecting you to the dashboard...
              </p>
            </>
          ) : paymentStatus === "cancelled" ? (
            <>
              <h1 className="text-3xl font-bold text-crypto-blue">
                Payment Cancelled
              </h1>
              <p className="text-gray-400">
                Your payment was cancelled. Redirecting you back to subscription page...
              </p>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-crypto-blue">
                Processing Payment
              </h1>
              <p className="text-gray-400">
                Please wait while we process your payment...
              </p>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CheckoutPage;
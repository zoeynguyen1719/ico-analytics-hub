import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const TermsAndConditionsDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="hover:text-crypto-blue transition-colors">
          Terms & Conditions
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl mb-4">Terms and Conditions</DialogTitle>
          <DialogDescription className="space-y-4">
            <div className="text-left">
              <h3 className="text-lg font-semibold mb-2">1. Introduction</h3>
              <p>
                Welcome to Mericulum. By accessing our website, you agree to these terms and conditions.
              </p>
            </div>

            <div className="text-left">
              <h3 className="text-lg font-semibold mb-2">2. Data Privacy</h3>
              <p>
                We collect and process your data in accordance with our privacy policy. This includes:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Basic account information</li>
                <li>Portfolio data</li>
                <li>Usage analytics</li>
                <li>Communication preferences</li>
              </ul>
            </div>

            <div className="text-left">
              <h3 className="text-lg font-semibold mb-2">3. User Responsibilities</h3>
              <p>
                Users are responsible for:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Maintaining account security</li>
                <li>Providing accurate information</li>
                <li>Complying with applicable laws</li>
                <li>Respecting intellectual property rights</li>
              </ul>
            </div>

            <div className="text-left">
              <h3 className="text-lg font-semibold mb-2">4. Disclaimer</h3>
              <p>
                The information provided on Mericulum is for general informational purposes only. 
                We make no warranties about the accuracy or reliability of the website's content.
              </p>
            </div>

            <div className="text-left">
              <h3 className="text-lg font-semibold mb-2">5. Changes to Terms</h3>
              <p>
                We reserve the right to modify these terms at any time. Continued use of the platform 
                after changes constitutes acceptance of the new terms.
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default TermsAndConditionsDialog;
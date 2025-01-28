import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const PrivacyPolicyDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="hover:text-crypto-blue transition-colors">
          Privacy Policy
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl mb-4">Privacy Policy</DialogTitle>
          <DialogDescription className="space-y-4">
            <div className="text-left">
              <h3 className="text-lg font-semibold mb-2">1. Information We Collect</h3>
              <p>
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Name and contact information</li>
                <li>Account credentials</li>
                <li>Payment information</li>
                <li>Communication preferences</li>
                <li>Portfolio and investment data</li>
              </ul>
            </div>

            <div className="text-left">
              <h3 className="text-lg font-semibold mb-2">2. How We Use Your Information</h3>
              <p>
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Provide and maintain our services</li>
                <li>Process your transactions</li>
                <li>Send you technical notices and support messages</li>
                <li>Communicate with you about products, services, and events</li>
                <li>Protect against fraudulent or illegal activity</li>
              </ul>
            </div>

            <div className="text-left">
              <h3 className="text-lg font-semibold mb-2">3. Cookie Policy</h3>
              <p>
                We use cookies and similar tracking technologies to track activity on our platform and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier.
              </p>
              <p className="mt-2">
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our platform.
              </p>
            </div>

            <div className="text-left">
              <h3 className="text-lg font-semibold mb-2">4. Data Security</h3>
              <p>
                We implement appropriate technical and organizational measures to maintain the security of your personal information, including:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments</li>
                <li>Access controls and authentication measures</li>
                <li>Regular backups and data recovery procedures</li>
              </ul>
            </div>

            <div className="text-left">
              <h3 className="text-lg font-semibold mb-2">5. Your Rights</h3>
              <p>
                Under applicable data protection laws, you have the following rights:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Right to access your personal data</li>
                <li>Right to correct inaccurate data</li>
                <li>Right to request deletion of your data</li>
                <li>Right to restrict processing of your data</li>
                <li>Right to data portability</li>
              </ul>
            </div>

            <div className="text-left">
              <h3 className="text-lg font-semibold mb-2">6. Contact Us</h3>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
                privacy@mericulum.com
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PrivacyPolicyDialog;
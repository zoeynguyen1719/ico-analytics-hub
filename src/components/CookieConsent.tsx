import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import PrivacyPolicyDialog from './PrivacyPolicyDialog';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (
      command: string,
      action: string,
      params: { 
        event_category?: string; 
        event_label?: string; 
        value?: number;
        analytics_storage?: 'granted' | 'denied';
      }
    ) => void;
  }
}

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem('cookieConsent');
    if (!hasAccepted) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowBanner(false);
    toast.success('Cookie preferences saved');
    
    // Enable Google Analytics after consent
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted'
      } as any);
    }
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'false');
    setShowBanner(false);
    toast.success('Cookie preferences saved');
    
    // Disable Google Analytics if cookies are declined
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied'
      } as any);
    }
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm z-50">
      <Card className="max-w-4xl mx-auto p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            <p>
              We use cookies to enhance your browsing experience and analyze our traffic. 
              By clicking "Accept", you consent to our use of cookies. 
              See our <PrivacyPolicyDialog /> for more information.
            </p>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={declineCookies}
            >
              Decline
            </Button>
            <Button
              onClick={acceptCookies}
            >
              Accept
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CookieConsent;
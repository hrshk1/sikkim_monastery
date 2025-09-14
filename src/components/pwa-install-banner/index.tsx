'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { murals, artifacts, manuscripts } from '@/lib/data';

export function PwaInstallBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!localStorage.getItem('pwaInstallDismissed')) {
      setShowBanner(true);
    }

    const handleBeforeInstallPrompt = (event: any) => {
      event.preventDefault();
      setInstallPrompt(event);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    const allPages = [
      '/',
      '/about',
      '/contact',
      '/murals',
      '/artifacts',
      '/manuscripts',
      '/virtual-tour',
      '/booking',
      '/donations',
      '/festivals',
      '/community',
      ...murals.map(mural => mural.image),
      ...artifacts.map(artifact => artifact.image),
      ...manuscripts.map(manuscript => manuscript.image),
    ];

    if (installPrompt) {
      installPrompt.prompt();
      installPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the PWA install prompt');
        } else {
          console.log('User dismissed the PWA install prompt');
        }
        setInstallPrompt(null);
        setShowBanner(false);
      });
    } else {
      navigator.serviceWorker.controller?.postMessage({
        action: 'cachePages',
        pages: allPages,
      });
      toast({
        title: "Offline pages installed",
        description: "You can now access these pages offline.",
      });
      setShowBanner(false);
    }
  };

  const handleDismissClick = () => {
    localStorage.setItem('pwaInstallDismissed', 'true');
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="pwa-install-banner">
      <p>Network in Sikkim can be unreliable — install offline pages for a smoother experience.</p>
      <div>
        <Button onClick={handleInstallClick}>Install offline pages</Button>
        <Button onClick={handleDismissClick} variant="ghost">Remind me later</Button>
      </div>
    </div>
  );
}

import { usePortal } from '@gorhom/portal';

import { SignInSheet } from '.';
import { PortalWindowOverlay } from '../portal.window.overlay';
export function useSignInSheet() {
  const portal = usePortal();

  const present = () => {
    const portalName = 'sign-in-sheet';

    portal.addPortal(
      portalName,
      <PortalWindowOverlay>
        <SignInSheet onFinish={() => portal.removePortal(portalName)} />
      </PortalWindowOverlay>,
    );

    return () => portal.removePortal(portalName);
  };

  return present;
}

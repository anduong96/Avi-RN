import React from 'react';

import { uniqueId } from 'lodash';
import { usePortal } from '@gorhom/portal';

import { Toast } from '.';
import { PortalWindowOverlay } from '../portal.window.overlay';

/**
 * The `useToast` function is a custom hook that creates and displays toast notifications using a
 * portal.
 * @returns The `toast` function is being returned.
 */
export function useToast() {
  const portal = usePortal();

  /**
   * The `toast` function adds a toast message to a portal window overlay and removes it when finished.
   * @param props - The `props` parameter is an object that contains the properties to be passed to the
   * `Toast` component. The `Omit` utility type is used to exclude the `onFinish` property from the
   * `React.ComponentProps` of the `Toast` component. This means that the `onFinish
   */
  function toast(props: Omit<React.ComponentProps<typeof Toast>, 'onFinish'>) {
    const portalName = uniqueId('toast');
    portal.addPortal(
      portalName,
      <PortalWindowOverlay>
        <Toast {...props} onFinish={() => portal.removePortal(portalName)} />
      </PortalWindowOverlay>,
    );

    return {
      remove: () => portal.removePortal(portalName),
    };
  }

  return toast;
}

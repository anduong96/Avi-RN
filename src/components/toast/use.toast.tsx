import React from 'react';

import { uniqueId } from 'lodash';
import { usePortal } from '@gorhom/portal';

import { Toast } from '.';
import { PortalWindowOverlay } from '../portal.window.overlay';

export type ToastProps = React.ComponentProps<typeof Toast>;

/**
 * The `useToast` function is a custom hook that creates and displays toast notifications using a
 * portal.
 * @returns The `toast` function is being returned.
 */
export function useToast() {
  const portal = usePortal();

  /**
   * The `toast` function creates a toast notification and returns a function to remove the toast.
   * @param {ToastProps} props - The `props` parameter is an object that contains the properties for
   * the toast component. These properties can include things like the message to be displayed, the
   * duration of the toast, the type of toast (success, error, warning, etc.), and any additional
   * styling or customization options.
   * @returns The `toast` function returns an object with a `remove` method.
   */
  function toast(props: ToastProps) {
    const portalName = uniqueId('toast');

    const handleFinish = () => {
      portal.removePortal(portalName);
      props?.onFinish?.();
    };

    portal.addPortal(
      portalName,
      <PortalWindowOverlay>
        <Toast {...props} onFinish={handleFinish} />
      </PortalWindowOverlay>,
    );

    return {
      remove: () => portal.removePortal(portalName),
    };
  }

  return toast;
}

import { uniqueId } from 'lodash';
import { usePortal } from '@gorhom/portal';

import { Prompt } from '.';
import { PortalWindowOverlay } from '../portal.window.overlay';

/**
 * The `usePrompt` function is a custom hook that creates a prompt component and adds it to a portal
 * for rendering in a full window overlay.
 * @returns The `prompt` function is being returned.
 */
export function usePrompt() {
  const portal = usePortal();

  /**
   * The `prompt` function displays a prompt component inside a full window overlay using a portal.
   * @param params - The `params` parameter is an object that contains all the properties of the `Props`
   * type, except for the `onFinish` property.
   */
  const prompt = (
    params: Omit<React.ComponentProps<typeof Prompt>, 'onFinish'>,
  ) => {
    const portalName = uniqueId('portal');
    portal.addPortal(
      portalName,
      <PortalWindowOverlay>
        <Prompt onFinish={() => portal.removePortal(portalName)} {...params} />
      </PortalWindowOverlay>,
    );
  };

  return prompt;
}

import { IS_IOS } from '@app/lib/platform';

import { IosMap } from './map.ios';
import { AndroidMap } from './map.android';

export const Map = IS_IOS ? IosMap : AndroidMap;

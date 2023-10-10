import type { FirebaseAuthTypes } from '@react-native-firebase/auth';

function customHash(input: string): number {
  let hash = 0;

  if (input.length === 0) {
    return hash;
  }

  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    // eslint-disable-next-line no-bitwise
    hash = (hash << 5) - hash + char;
  }

  return hash;
}

function mapSeedToRange(seed: string, x: number, y: number): number {
  const seedNumber = customHash(seed);
  const range = y - x;
  return x + (seedNumber % range);
}

/**
 * The function `getAvatarIcon` takes a user object and returns an avatar icon based on the user's
 * unique identifier.
 * @param user - The `user` parameter is of type `FirebaseAuthTypes.User`. This is an object that
 * represents a user in Firebase Authentication. It contains information about the user, such as their
 * unique identifier (`uid`), email, display name, and more. In this function, we are using the `uid
 * @returns an avatar icon based on the user's UID.
 */
export function getAvatarIcon(user: FirebaseAuthTypes.User) {
  const seed = user.uid;
  const index = mapSeedToRange(seed, 0, icons.length);
  return icons[index];
}

const icons = `
🐵
🐒
🦍
🦧
🐶
🐕
🦮
🐕‍🦺
🐩
🐺
🦊
🦝
👽
🐱
🐈
🐈‍⬛
🦁
🐯
🐅
🐆
🐴
🐎
🦄
🦓
🫏
🦌
🫎
🦬
🐮
🐂
🐃
🐄
🐷
🐖
🐗
🐽
🐏
🐑
🐐
🐪
🐫
🦙
🦒
🐘
🦣
🦏
🦛
🐭
🐁
🐀
🐹
🐰
🐇
🐿️
🦫
🦔
🦇
🐻
🐻‍❄️
🐨
🐼
🦥
🦦
🦨
🦘
🦡
🐾
🦃
🐔
🐓
🐣
🐤
🐥
🐦
🐦‍⬛
🐧
🕊️
🦅
🦆
🦢
🪿
🦉
🦤
🪽
🪶
🦩
🦚
🦜
🪹
🪺
🐸
🐊
🐢
🦎
🐍
🐲
🐉
🦕
🦖
🐳
🐋
🐬
🦭
🐟
🐠
🐡
🦈
🐙
🪼
🐚
🪸
🦀
🦞
🦐
🦑
🦪
🐌
🦋
🐛
🐜
🐝
🪲
🐞
🦗
🪳
🕷️
🕸️
🦂
🦟
🪰
🪱
🦠
💐
🌸
💮
🪷
🏵️
🌹
🥀
🌺
🪻
🌻
🌼
🌷
🌱
🪴
🌲
🌳
🌴
🌵
🌾
🌿
☘️
🍀
🍁
🍂
🍃
🍄
🪨
🪵
🍇
🍈
🍉
🍊
🍋
🍌
🍍
🥭
🍎
🍏
🍐
🍑
🍒
🍓
🫐
🥝
🍅
🫒
🥥
🍱
🍘
🍙
🍚
🍛
🍜
🍠
🍢
🍣
🍤
🍥
🥮
🍡
🥟
🥠
🥡
🍦
🍧
🍨
🍩
🍪
🎂
🍰
🧁
🥧
🍫
🍬
🍭
🍮
🍯
`
  .trim()
  .split('\n');

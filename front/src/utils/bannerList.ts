import winterBg from '@assets/images/winterBg.jpg';
import fallBg from '@assets/images/fallBg.jpg';
import springBg from '@assets/images/springBg.jpg';
import bg1 from '@assets/images/bg1.svg';
import bg2 from '@assets/images/bg2.svg';
import bg3 from '@assets/images/bg3.svg';
import { ListTypes } from './mapList';

//  배경은 3개만

const defaultBanner1 = bg1.src;
const defaultBanner2 = bg2.src;
const defaultBanner3 = bg3.src;

export const banner: ListTypes = {
  banner1: bg1.src,
  banner2: bg2.src,
  banner3: bg3.src
};

export { defaultBanner1, defaultBanner2, defaultBanner3 };

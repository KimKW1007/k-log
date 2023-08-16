import bg1 from '@/src/assets/images/mainslide_01.jpg';
import bg2 from '@/src/assets/images/blank_space.jpg';
import bg3 from '@/src/assets/images/simple.jpg';
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

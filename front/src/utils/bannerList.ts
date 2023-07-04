import winterBg from '@assets/images/winterBg.jpg';
import fallBg from '@assets/images/fallBg.jpg';
import springBg from '@assets/images/springBg.jpg';
import { ListTypes } from './mapList';

//  배경은 3개만

const banner1 = winterBg.src;
const banner2 = fallBg.src;
const banner3 = springBg.src;

export const banner: ListTypes = {
  banner1: winterBg.src,
  banner2: fallBg.src,
  banner3: springBg.src
};

export { banner1, banner2, banner3 };

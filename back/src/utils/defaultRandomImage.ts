import * as path from "path";



const defaultImages = [
  path.join(process.cwd()+'/back', '../public/images/defaultImage1.jpg'),
  path.join(process.cwd()+'/back', '../public/images/defaultImage2.jpg'),
  path.join(process.cwd()+'/back', '../public/images/defaultImage3.jpg'),
  path.join(process.cwd()+'/back', '../public/images/defaultImage4.jpg'),
  path.join(process.cwd()+'/back', '../public/images/defaultImage5.jpg'),
  path.join(process.cwd()+'/back', '../public/images/defaultImage6.jpg'),
  path.join(process.cwd()+'/back', '../public/images/defaultImage7.jpg'),
  path.join(process.cwd()+'/back', '../public/images/defaultImage8.jpg'),
  path.join(process.cwd()+'/back', '../public/images/defaultImage9.jpg'),
];
const randomIndex = Math.floor(Math.random() * defaultImages.length);
export const selectedImage = defaultImages[randomIndex];
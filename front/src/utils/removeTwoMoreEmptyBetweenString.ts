export const removeTwoMoreEmptyBetweenString =(value : string)=>{
  return value.trim().replaceAll(/ +/g, " ")
}
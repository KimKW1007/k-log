export const removeTwoMoreEmptyBetweenString =(value : string)=>{
  return value.trim().replaceAll(/ +/g, " ")
}
export const removeEmptyBetweenString =(value : string)=>{
  return value.trim().replaceAll(" ", "")
}
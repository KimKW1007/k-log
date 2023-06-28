import springBg from "@images/springBg.jpg"
import summerBg from "@images/summerBg.jpg"
import fallBg from "@images/fallBg.jpg"
import winterBg from "@images/winterBg.jpg"

export const AuthSeasonBg = ()=>{
  let month = new Date().getMonth() + 1;
  let toDaySeason;
  if(3 <= month &&  month <= 5){
    toDaySeason =  springBg.src
  }else if(6 <= month &&  month <= 8){
    toDaySeason =  summerBg.src
  }else if(9 <= month &&  month <= 11){
    toDaySeason =  fallBg.src
  }else{
    toDaySeason =  winterBg.src
  }
  return toDaySeason
}
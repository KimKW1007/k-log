import {LogIn} from "@styled-icons/ionicons-solid/LogIn";
import {PeopleCommunityAdd} from "@styled-icons/fluentui-system-filled/PeopleCommunityAdd";
import {Home} from "@styled-icons/entypo/Home";

export interface LinkTypes {
  title :string;
  icon: JSX.Element;
  link : string;
  color: string;
}



export const iconLinks:LinkTypes[]=[
  {
    title :'홈으로',
    link: '/',
    icon : <Home/>,
    color : "#A084DC"
  },
  {
    title :'로그인',
    link: '/login',
    icon : <LogIn/>,
    color : "#FFB26B"
  },
  {
    title :'회원가입',
    link: '/signup',
    icon : <PeopleCommunityAdd/>,
    color : "#3D8361"
  }
]
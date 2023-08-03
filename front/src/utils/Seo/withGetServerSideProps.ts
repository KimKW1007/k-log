import { GetServerSideProps, GetServerSidePropsContext } from "next";
interface MapPathToSeo {
  [key: string]: { title: string | undefined; description: string | undefined };
}


const mapPathToSeo : MapPathToSeo = {
  "/": { title: "홈", description: "K:Log에 오신것을 환영합니다! 제가 작성한 게시물을 보면서 같이 공부해요!" },
  "/signup": {
    title: "회원가입",
    description: "K:Log를 알게 되신것에 대해 되게 감사합니다. 회원가입을 하시고 댓글과 게시물을 통해 원하는 정보를 확인해주세요!",
  },
  "/login": {
    title: "로그인",
    description: "K:Log를 알게 되신것에 대해 되게 감사합니다. 로그인 하시고 K:Log를 즐겨주세요!",
  },
  "/category": {
    title: "분류 전체보기",
    description: "K:Log에 있는 모든 게시물을 한번에 볼 수 있어요!",
  },
  "/accountEdit": {
    title: "계정설정",
    description: "K:Log를 이용하시는 회원분의 계정을 설정하는 곳이에요!",
  },
  "/accountEdit/changeEmail": {
    title: "이메일 변경",
    description: "K:Log를 이용하시는 회원분의 이메일을 변경하는 곳이에요!",
  },
  "/identity/find": {
    title: "분류 전체보기",
    description: "K:Log를 이용하셨던/이용하시는 회원분의 아이디/비밀번호 등을 찾는 곳이에요!",
  },
}

const propsPathToSeo= (title : string, subTitle ?: string)=>{
  if(subTitle){
    return {
      title: `${title}-${subTitle}`,
      description: `${subTitle}에 관한 게시물을 확인해 보세요!`,
    }
  }
  if(title){
    return {
      title: `${title}`,
      description: `${title}에 관한 게시물을 확인해 보세요!`,
    }
  }
}

const createOrEditInpropsPathToSeo = (createOrEdit : string, title : string) =>{
  if(createOrEdit === 'create'){
    return {
      title: `${title}에 새로운 게시물 만들기`,
      description: `${title}에 대한 새로운 게시물을 만들어보세요!`,
    }
  }
  if(createOrEdit === 'edit'){}
  return {
    title: `${title} 게시물 수정하기`,
    description: `${title}에 대한 게시물을 수정해보세요!`,
  }
}


const withGetServerSideProps = (getServerSideProps: GetServerSideProps) => {
  return async (context: GetServerSidePropsContext) => {
    const pagePath = context.resolvedUrl;
    return await getServerSideProps(context).then((res: { [key: string]: any }) => {
      const {title, subTitle, id} = res?.props;
      const notCreateOrEdit = (title || subTitle) ? propsPathToSeo(title, subTitle) : mapPathToSeo[pagePath];
      const createOrEdit = createOrEditInpropsPathToSeo(pagePath.split("/").at(-1)!, id ? title : subTitle);
      const isCreateOrEdit = pagePath.split("/").at(-1) === "create" || pagePath.split("/").at(-1) === "edit";
      return {
        ...res,
        props: {
          ...res.props,
          seoData: isCreateOrEdit ? createOrEdit : notCreateOrEdit,
        },
      };
    });
  };
};
export default withGetServerSideProps;

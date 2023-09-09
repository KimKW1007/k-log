const ContentsLinkTargetBlank = (ref: React.RefObject<HTMLDivElement>) => {
  if (ref.current) {
    const Links = ref.current.querySelectorAll('a');
    if(Links.length > 0){
      Links.forEach((Link)=>{
        if(!Link.href.includes(window.location.host)){
          Link.target = "_blank";
        }
      })
    }
  }
}

export default ContentsLinkTargetBlank
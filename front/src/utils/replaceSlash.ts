const replaceSlash = (slashText : string) => {
  return slashText.replaceAll("/","-")
}
const replaceDash = (dashText : string) => {
  return dashText.replaceAll("-","/")
}

export {replaceSlash , replaceDash}
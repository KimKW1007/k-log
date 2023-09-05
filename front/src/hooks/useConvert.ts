const useConvert = () => {
  const convertContent = (contents: string) => {
    if (!contents) return '';
    const convertValue = contents
                              .replaceAll(" ", "&nbsp;")
                              .replace(/\t/g, "&nbsp;".repeat(4))
                              .replace(/&lt;/g, '@lt;')
                              .replace(/</g, '&lt;')
                              .replace(/@lt;/g, '<')
                              .replace(/&gt;/g, '@gt;')
                              .replace(/>/g, '&gt;')
                              .replace(/@gt;/g, '>');
    return convertValue;
  };

  const decodeHTMLEntities = (str: any) => {
    if (str === undefined && str === null && str === '') {
      return '';
    }
    return str
      .replace(/&amp;/g, '&')
      .replaceAll("&nbsp;class", ' class')
      .replace(/&lt;/g, '@lt;').replace(/</g, '&lt;').replace(/@lt;/g, '<').replace(/&gt;/g, '@gt;').replace(/>/g, '&gt;').replace(/@gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&#39;/g, "'");
  };

  return { convertContent, decodeHTMLEntities };
};

export default useConvert;

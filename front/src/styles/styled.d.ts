import "styled-components";
declare module "styled-components" {
  export interface DefaultTheme {
      color: {[anyKeyword: string]};
      rem : {[anyKeyword: string]}
  }
}
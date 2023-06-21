import "styled-components";
declare module "styled-components" {
  export interface DefaultTheme {
      color: string;
      rem : {[anyKeyword: string]}
  }
}
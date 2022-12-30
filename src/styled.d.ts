// 이 파일은, 우리가 이전에 설치해놓은 이 파일을 override할거임// import original module declarations
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
    cardBgColor: string;
  }
}

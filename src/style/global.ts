import 'sanitize.css';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        padding: 0;
        margin: 0;

    }

    h1 {
        margin: 0;
    }
    
    a{
        text-decoration: none;
        color: #3B4856;
    }

    a:visited {
        color: #3B4856;
    }


    ::-webkit-scrollbar {
        width: 6px; /* 원하는 너비로 설정 */
    }

    ::-webkit-scrollbar-thumb {
        background-color: rgb(196,198,200);
        border-radius: 3px;
    }

    ::-webkit-scrollbar-track {
        background-color: rgb(234, 236, 239);
    }

    /* 파이어폭스용 */
    * {
        scrollbar-width: thin;
        scrollbar-color: rgb(196,198,200) rgb(234, 236, 239);
    }

`;

export default GlobalStyle;

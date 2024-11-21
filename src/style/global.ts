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
`;

export default GlobalStyle;

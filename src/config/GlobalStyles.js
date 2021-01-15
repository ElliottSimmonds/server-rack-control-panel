import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`

    body {
        background-color: ${({theme}) => theme.colors.lightgrey};
        font-family: ${({theme}) => theme.typography.fontFamily};
    }

    h1 {
        color: ${({theme}) => theme.colors.darkblue};
    }
    h2 {
        color: ${({theme}) => theme.colors.darkblue};
    }
    h4 {
        color: ${({theme}) => theme.colors.darkblue};
    }
    
`

export default GlobalStyles;

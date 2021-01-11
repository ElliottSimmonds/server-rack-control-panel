import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`

    body {
        background-color: ${({theme}) => theme.colors.lightgrey};
        font-family: ${({theme}) => theme.typography.fontFamily};
    }
    
`

export default GlobalStyles;

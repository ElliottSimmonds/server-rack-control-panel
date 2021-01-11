import { createMuiTheme } from '@material-ui/core/styles';

const theme = {
    colors: {
        blue: "#298CD6",
        darkblue: "#004072",
        green: "#28A745",
        darkgreen: '#216332',
        yellow: "#F5C32C",
        darkyellow: "#a07e18",
        red: "#DC3545",
        darkred: "#a02733",
        lightgrey: "#EEEEEE",
        darkgrey: "#6C757D",
    },
    typography: {
        fontFamily: "Segoe UI",//"sans-serif",
    }
};

const MuiTheme = createMuiTheme({
    palette: {
        primary: {
            main: theme.colors.blue,
        },
        secondary: {
            main: '#ffffff',
        },
        error: {
            main: theme.colors.red,
        },
    },
    typography: {
        fontFamily: "Segoe UI",
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
            mobile: 640,
            desktop: 1280,
        },
    },
});

export default theme;
export { MuiTheme };
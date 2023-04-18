
export const tokensDark = {
    secondary1: {
        100: "#d9e6ef",
        200: "#b3cddf",
        300: "#8eb5d0",
        400: "#689cc0",
        500: "#4283b0",
        600: "#35698d",
        700: "#284f6a",
        800: "#1a3446",
        900: "#0d1a23"
    },

    secondary: {
        100: "#cceaff",
        200: "#99d5ff",
        300: "#66c1ff",
        400: "#33acff",
        500: "#0097ff",
        600: "#0079cc",
        700: "#005b99",
        800: "#003c66",
        900: "#001e33"
},

    primary: {
        100: "#040509",
        200: "#080b12",
        300: "#0c101b",
        400: "#f2f0f0",
        500: "#141b2d",
        600: "#434957",
        700: "#727681",
        800: "#a1a4ab",
        900: "#d0d1d5",
        1000: "#8a9adb"
    },
    grey: {
        100: "#141414",
        200: "#292929",
        300: "#3d3d3d",
        400: "#525252",
        500: "#666666",
        600: "#858585",
        700: "#a3a3a3",
        800: "#c2c2c2",
        900: "#e0e0e0"
    },
};

//Reverses Token Colors On Mode
function reverseTokens(tokensDark) {
    const reversedTokens = {};
    Object.entries(tokensDark).forEach(([key, val]) => {
      const keys = Object.keys(val);
      const values = Object.values(val);
      const length = keys.length;
      const reversedObj = {};
      for (let i = 0; i < length; i++) {
        reversedObj[keys[i]] = values[length - i - 1];
      }
      reversedTokens[key] = reversedObj;
    });
    return reversedTokens;
  }
  export const tokensLight = reverseTokens(tokensDark);


  // MUI THEME SETTINGS - BASED ON DARK/LIGHT MODEE
export const themeSettings = (mode) => {
    return {
        palette: {
            mode: mode,
            ...(mode === 'dark'
                ? {
                    primary: {
                        main: tokensDark.primary[500],
                    },
                    secondary: {
                        main: tokensDark.secondary[500],
                    },
                    neutral: {
                        dark: tokensDark.grey[700],
                        main: tokensDark.grey[500],
                        light: tokensDark.grey[100]
                    },
                    background: {
                        default: tokensDark.primary[500],
                    }
                } : { 
                    //LIGHT MODE
                    primary: {
                        main: tokensDark.primary[500],
                    },
                    secondary: {
                        main: tokensDark.secondary[500],
                    },
                    neutral: {
                        dark: tokensDark.grey[700],
                        main: tokensDark.grey[500],
                        light: tokensDark.grey[100]
                    },
                    background: {
                        default: "#fcfcfc",
                    }  
                }
            ),
        },
        typography: {
            fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 14,
            },
        },
    };
};


/*
secondary: {
        100: "#d9e6ef",
        200: "#b3cddf",
        300: "#8eb5d0",
        400: "#689cc0",
        500: "#4283b0",
        600: "#35698d",
        700: "#284f6a",
        800: "#1a3446",
        900: "#0d1a23"
    },
    primary: {
        100: "#040509",
        200: "#080b12",
        300: "#0c101b",
        400: "#f2f0f0",
        500: "#141b2d",
        600: "#434957",
        700: "#727681",
        800: "#a1a4ab",
        900: "#d0d1d5",
        1000: "#8a9adb"
    },
    grey: {
        100: "#141414",
        200: "#292929",
        300: "#3d3d3d",
        400: "#525252",
        500: "#666666",
        600: "#858585",
        700: "#a3a3a3",
        800: "#c2c2c2",
        900: "#e0e0e0"
    },


 */
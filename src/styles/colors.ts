// This file has a really basic way of defining colors and palettes.
// If more colors are added, layout should change as shown in documentation.

type Colors = 'almostBlack' | 'darkBlue' | 'seaGreen' | 'grey' | 'white' | 'orange' | 'metal' | 'slate' | 'cream' | 'mango' | 'cerulean' | 'prussianBlue' | 'darkGreen' | 'black';
const colors: Record<Colors, string> = {
  almostBlack: '#191E29',
  darkBlue: '#132D46',
  seaGreen: '#01C38D',
  grey: '#696E79',
  white: '#FFFFFF',
  orange: '#E67E22',
  metal: '#4C5B61',
  slate: '#2C423F',
  cream: '#EDE7E3',
  mango: '#FFA62B',
  cerulean: '#007EA7',
  prussianBlue: '#003249',
  darkGreen: '#2F4B26',
  black: '#000000',
};

type Palette = 'primary' | 'secondary' | 'background' | 'text' | 'border' | 'error';
export const palette: Record<Palette, string> = {
  primary: colors.seaGreen,
  secondary: colors.almostBlack,
  background: colors.darkBlue,
  text: colors.white,
  border: colors.grey,
  error: colors.orange,
};

export const chartColors: string[] = [
  colors.black, // To display the available budget
  colors.seaGreen,
  colors.metal,
  colors.slate,
  colors.cream,
  colors.mango,
  colors.cerulean,
  colors.prussianBlue,
  colors.darkGreen,
];

// Utility function to apply opacity to hex colors
const applyOpacity = (hexColor: string, opacity: number): string => {
  const red = parseInt(hexColor.slice(1, 3), 16);
  const green = parseInt(hexColor.slice(3, 5), 16);
  const blue = parseInt(hexColor.slice(5, 7), 16);

  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
};

// You can also add specific shades or transparent versions as needed
type Transparent = 'clear' | 'lightGrey' | 'darkBlue';
export const transparent: Record<Transparent, string> = {
  clear: 'rgba(255, 255, 255, 0)',
  lightGrey: applyOpacity(colors.grey, 0.5),
  darkBlue: applyOpacity(colors.darkBlue, 0.5),
  // ... and so on
};

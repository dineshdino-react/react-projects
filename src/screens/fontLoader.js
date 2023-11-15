import * as Font from 'expo-font';

export const loadFonts = async () => {
  await Font.loadAsync({
    'SFProDisplay-Regular': require('../assets/fonts/sf.ttf'),
    'SFProDisplay-Bold': require('../assets/fonts/bold.ttf'),
    // Add other SF Pro fonts as needed
  });
};
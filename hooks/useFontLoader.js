import React from "react";
import * as Font from "expo-font";

export default function useFontLoader() {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "monserrat-font": require("../assets/fonts/Montserrat-Regular.ttf"),
        "monserrat-medium": require("../assets/fonts/Montserrat-Medium.ttf"),
        "monserrat-bold": require("../assets/fonts/Montserrat-Bold.ttf")
      });
      setReady(true);
    };

    loadFonts();
  }, []);

  return [ready];
}

import { SafeAreaView, useWindowDimensions, StyleSheet } from "react-native";
import { Reader, useReader } from "@epubjs-react-native/core";
import { useFileSystem } from "@epubjs-react-native/expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";

export const Inner = ({ local, src }) => {
  const { width, height } = useWindowDimensions();
  const { getCurrentLocation } = useReader();
  const [base64, setBase64] = useState(null);

  const checkLinkorLocal = async (src) => {
    if (src.includes("file:///")) {
      const base64 = await FileSystem.readAsStringAsync(src, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setBase64(base64.toString());
    } else setBase64(null);
  };

  useEffect(() => {
    addLocalToStorage();
    checkLinkorLocal(src);
  }, [src]);

  const addLocalToStorage = async () => {
    try {
      const localObj = getCurrentLocation();
      const obj = {
        src,
        localObj,
      };
      await AsyncStorage.setItem("@local", JSON.stringify(obj));
    } catch (e) {
      console.log("inner error", e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Reader
        src={base64 || src}
        width={width}
        height={height * 0.8}
        fileSystem={useFileSystem}
        initialLocation={local?.end?.cfi}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
});

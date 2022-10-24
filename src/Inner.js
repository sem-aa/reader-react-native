import { SafeAreaView, useWindowDimensions, StyleSheet } from "react-native";
import { Reader, useReader } from "@epubjs-react-native/core";
import { useFileSystem } from "@epubjs-react-native/expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

export const Inner = ({ local }) => {
  const { width, height } = useWindowDimensions();
  const { getCurrentLocation } = useReader();

  useEffect(() => {
    addLocalToStorage();
  });

  const addLocalToStorage = async () => {
    try {
      const localObj = getCurrentLocation();
      await AsyncStorage.setItem("@local", JSON.stringify(localObj));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Reader
        src="https://s3.amazonaws.com/moby-dick/OPS/package.opf"
        width={width}
        height={height * 0.9}
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
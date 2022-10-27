import { useLayoutEffect, useState } from "react";
import { ReaderProvider } from "@epubjs-react-native/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Inner } from "./Inner";
import {
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

const link = "https://s3.amazonaws.com/moby-dick/OPS/package.opf";

export const Book = () => {
  const [local, setLocal] = useState(null);
  const [src, setSrc] = useState(link);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@local");
      if (jsonValue) {
        const { src, localObj } = JSON.parse(jsonValue);
        setSrc(src);
        setLocal(localObj);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useLayoutEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.options}>
          <TouchableOpacity   onPress={() => setSrc(link)}>
            <Text style={styles.btn}>Open Moby Dick</Text>
          </TouchableOpacity>
          <TouchableOpacity
          
            onPress={async () => {
              const file = await DocumentPicker.getDocumentAsync();
              const base64 = await FileSystem.readAsStringAsync(file.uri, {
                encoding: FileSystem.EncodingType.Base64,
              });
              setSrc(base64.toString());
            }}
          >
            <Text style={styles.btn} >Open Book on phone</Text>
          </TouchableOpacity>
        </View>
        <ReaderProvider>
          <Inner local={local} src={src} />
        </ReaderProvider>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  options: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btn: {
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
  }
});

import { useLayoutEffect, useState } from "react";
import { ReaderProvider } from "@epubjs-react-native/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Inner } from "./Inner";

export const Book = () => {
  const [local, setLocal] = useState(null)

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@local");
      if (jsonValue) {
        setLocal(JSON.parse(jsonValue))
      }
    } catch (e) {
      console.log(e);
    }
  };

  useLayoutEffect(() => {
    getData()
  }, [])
 
  return (
    <ReaderProvider>
      <Inner local={local} />
    </ReaderProvider>
  );
};



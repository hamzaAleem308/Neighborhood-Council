import React from "react";
import { PaperProvider } from "react-native-paper";
import LoginScreen from "./Auth/Login";
import SplashScreen from "./SplashScreen";
import Template from "./BackgroundTemplate";
import SignUp from "./Auth/SignUp";
import SetupNavigation from "./Navigation";
import LoadingScreen from "./LoadingScreen"
import HomeScreen from "./Home";


export default function Main(){
  return(
    <PaperProvider>
        <SetupNavigation/>
    </PaperProvider>
  )
}
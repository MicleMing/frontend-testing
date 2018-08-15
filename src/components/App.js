import React from "react";
import LockScreen from "./LockScreen";

export default class App extends React.Component {
  render() {
    return (
      <LockScreen
        wallpaperPath="react_wallpaper.png"
        userInfoMessage="front test demo"
        onUnlocked={() => alert("unlocked!")}
      />
    );
  }
}

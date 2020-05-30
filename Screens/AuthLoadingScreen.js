import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Image,
  Text,
  Platform,
  Linking,
  TouchableOpacity
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { getAppstoreAppMetadata } from "react-native-appstore-version-checker";
import { getVersion } from "react-native-device-info";
import {myColors} from "../Globals/colors";

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, isUpdated: false };
  }

  async componentDidMount() {
    await this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    let appID = null;
    Platform.OS === "android"
      ? (appID = "com.digimenu")
      : "buraya appstore id gir";
    getAppstoreAppMetadata(appID).then(metadata => {
      const storeVersion = metadata.version;
      const appVersion = getVersion();
      console.log(storeVersion);
      console.log(appVersion);
      if (storeVersion !== appVersion) {
        this.setState({ isLoading: false, isUpdated: false });
      } else {
        this.setState({ isLoading: false, isUpdated: true });
        this.props.navigation.navigate(userToken ? "App" : "Auth");
      }
    });
  };

  //bu çok hızlı gerçekleştiği için bu ekranı göremiyoruz bile

  // This will switch to the App screen or Auth screen and this loading
  // screen will be unmounted and thrown away.
  goToStore = () => {
    if (Platform.OS === "android") {
      Linking.openURL(
        "https://play.google.com/store/apps/details?id=com.digimenu"
      ).catch(err => console.error("An error occurred", err));
    }
  };

  render() {
    return (
        <View style={styles.container}>
          {this.state.isLoading && (
            <ActivityIndicator animating={true} size="large" color="#0000ff" />
          )}
          {!this.state.isUpdated && !this.state.isLoading && (
            <View style={styles.container}>
              <Image
                style={{ width: 100, height: 100 }}
                source={require("../Assets/devekusu.png")}
              />
              <Text style={{ fontSize: 25, textAlign: "center", margin: 10 }}>
                Uygulamanız Güncel Değil ! Uygulamamızı Kullanabilmek İçin
                Lütfen Son Sürüme Güncelleyiniz.
              </Text>
              <TouchableOpacity
                style={styles.updateBtn}
                onPress={this.goToStore}
              >
                <Text style={{ fontSize: 20, color: "rgb(237,237,237)" }}>
                  Güncelle
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: myColors.darkShade,
  },
  updateBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 250,
    height: 50,
    backgroundColor: "#faa613",
    borderRadius: 10
  }
});

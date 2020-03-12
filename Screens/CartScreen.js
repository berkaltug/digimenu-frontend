import { observer } from "mobx-react";
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  AsyncStorage,
  ActivityIndicator,
  ScrollView,
  PermissionsAndroid,
  Platform,
  Alert
} from "react-native";
import MenuScreen from "./MenuScreen";
import { NavigationActions } from "react-navigation";
import cartInstance from "../Globals/globalCart";
import LinearGradient from "react-native-linear-gradient";
import CartStore from "../Store/CartStore";
import Icon from "react-native-vector-icons/FontAwesome";
import OrderRequest from "../Entity/OrderRequest";
import Geolocation from "@react-native-community/geolocation";
import {showGpsError} from "../Globals/Errors";
import {OrderSuccessModal} from "../Components/OrderSuccessModal";
@observer
export default class CartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sepetim: [],
      totalbill: 0,
      modalVisible: false,
      modalVisible2: false,
      isLoading: false,
      latitude: 0.0,
      longitude: 0.0
    };
  }
  modalCallback = data => {
    this.setState({ modalVisible: data });
  };
  async askGpsPermission() {
    if (
      Platform.OS === "android" &&
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      )
    ) {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "GPS Bilgisi",
          message:
            "Sipariş verebilmeniz için konum \t servislerine izin vermeniz \t gerekmektedir.",
          buttonPositive: "Aç"
        }
      );
    }
  }

  async orderWithCoords() {
    this.setState({ isLoading: true });
    await this.askGpsPermission();
    Geolocation.getCurrentPosition(
      position => {
        if (position.mocked == true) {
          Alert.alert(
            "Uyarı",
            "Görünüşe göre bir vekil konum sunucusu kullanmaktasınız.Sipariş verebilmek için bu sunucuyu kapatmanız gerekmektedir.",
            [{ text: "Kapat", onPress: () => {} }],
            { cancelable: false }
          );
          this.setState({ isLoading: false });
        } else {
          this.makeAjax(position);
        }
      },
      error => {
        showGpsError(error);
        this.setState({ isLoading: false });
      },
      {
        enableHighAccuracy: false,
        timeout: 25000,
        maximumAge: 5000
      }
    );
  }

  async makeAjax(position) {
    var local_test = "http://192.168.0.14:8080/table_orders/1/10";
    var URL =
      global.URL[0] +
      "//" +
      global.URL[2] +
      "/table_orders/" +
      global.resNo +
      "/" +
      global.masaNo;

    var token = await AsyncStorage.getItem("userToken");
    var tokenStr = JSON.parse(token);
    var request = new OrderRequest();
    request.items = CartStore.cart;
    request.kampanya = [];
    request.latitude = position.coords.latitude;
    request.longitude = position.coords.longitude;
    console.log(JSON.stringify(request));

    await fetch(URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Basic " + tokenStr
      },
      body: JSON.stringify(request)
    }).then(response => {
      console.log(JSON.stringify(response, null, "\t"));
      if (response.status === 201) {
        console.log("success içinde");
        this.setState({ modalVisible: true });
        CartStore.flushCart();
      } else {
        Alert.alert(
          "Uyarı",
          "Sipariş verebilmek için restoran içerisinde bulunmanız gerekmektedir.",
          [{ text: "Kapat", onPress: () => {} }],
          { cancelable: false }
        );
      }
    });
    this.setState({ isLoading: false });
  }

  render() {
    return (
      <LinearGradient
        colors={["rgb(226, 54, 45)", "rgb(245, 193, 153)"]}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <Text style={styles.textshadow}>Sepetim</Text>
          <View style={styles.sepet}>
            <ScrollView>
              {CartStore.cart.map((item, index) => {
                return (
                  <View
                    key={Math.floor(Math.random() * 10000) + 1}
                    style={styles.cartrow}
                  >
                    <Text
                      key={Math.floor(Math.random() * 10000) + 1}
                      style={{ fontSize: 19 }}
                    >
                      {item.item}
                    </Text>
                    <Text
                      key={Math.floor(Math.random() * 10000) + 1}
                      style={{
                        fontSize: 19,
                        marginLeft: "auto",
                        marginRight: 20
                      }}
                    >
                      {item.price} ₺
                    </Text>
                    <TouchableOpacity
                      key={Math.floor(Math.random() * 10000) + 1}
                      style={styles.removeButton}
                      onPress={() => {
                        CartStore.removeItem(item);
                      }}
                    >
                      <Text key={Math.floor(Math.random() * 10000) + 1}>
                        {" "}
                        <Icon name="close" color="#d7263d" />{" "}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
          </View>
          <ActivityIndicator
            animating={this.state.isLoading}
            size="large"
            color="#0000ff"
          />

          <View
            style={{
              flex: 1 / 2,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              style={styles.sepetbosaltbutton}
              onPress={() => {
                CartStore.flushCart();
              }}
            >
              <Text style={{ color: "rgb(237,237,237)", fontSize: 17 }}>
                Sepeti Boşalt
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sepetonaybutton}
              onPress={async () => {
                if (CartStore.cart.length == 0) {
                  alert("Sepetiniz Boş");
                } else {
                  await this.orderWithCoords();
                }
              }}
            >
              <Text style={{ color: "rgb(237,237,237)", fontSize: 17 }}>
                Sipariş Ver
              </Text>
            </TouchableOpacity>
          </View>
          <OrderSuccessModal modalVisible={this.state.modalVisible} parentCallback={this.modalCallback} />
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textshadow: {
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
    fontSize: 30,
    fontWeight: "bold",
    marginRight: "auto",
    marginLeft: 20,
    color: "rgb(237, 237, 237)"
  },
  sepet: {
    flex: 1 / 1.5,
    backgroundColor: "rgb(236, 236, 236)",
    borderRadius: 10,
    elevation: 16,
    marginTop: 5,
    width: 350
  },
  cartrow: {
    flexDirection: "row",
    marginTop: 4
  },
  sepetonaybutton: {
    width: 110,
    height: 45,
    fontSize: 20,
    borderRadius: 2,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#048223",
    margin: 10
  },
  removeButton: {
    backgroundColor: "rgb(237, 237, 237)",
    elevation: 12,
    margin: 3,
    padding: 3,
    borderRadius: 50,
    width: 26,
    height: 26,
    justifyContent: "center",
    alignItems: "center"
  },
  sepetbosaltbutton: {
    width: 110,
    height: 45,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#db461f",
    borderRadius: 2,
    elevation: 10,
    margin: 10
  }
});

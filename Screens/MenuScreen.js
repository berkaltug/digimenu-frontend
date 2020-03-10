import { observer } from "mobx-react";
import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  AsyncStorage,
  ActivityIndicator,
  Alert,
  PermissionsAndroid
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationActions } from "react-navigation";
import base64 from "base-64";
import LinearGradient from "react-native-linear-gradient";
import NumericInput from "react-native-numeric-input";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList
} from "accordion-collapse-react-native";
import _ from "lodash";
import CartStore from "../Store/CartStore";
import CounterStore from "../Store/CounterStore";
import Geolocation from "@react-native-community/geolocation";
import WaiterRequest from "../Entity/WaiterRequest";
import BackgroundTimer from "react-native-background-timer";
import { AddButton } from "../Components/AddButton";
import { ItemContainer } from "../Components/ItemContainer";
import { CampaignCollapseHeader } from "../Components/CampaignCollapseHeader";
import { FavCollapseHeader } from "../Components/FavCollapseHeader";
import { ItemCollapseHeader } from "../Components/ItemCollapseHeader";
import {ItemAddingModal} from "../Components/ItemAddingModal";
import { showGpsError } from "../Globals/Errors.js";

@observer
export default class MenuScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      menuItem: {},
      cartArr: new Array(),
      menuArr: new Array(),
      favouriteArr: new Array(),
      campaignArr: new Array(),
      isLoading: false,
      amount: 1,
      isPressed: false
    };
  }

  //menuyu çek
  // _.groupBy lodash kütüphanesinde reduce fonk kullanan hazır bir fonk direk internetten bulduk
  async componentWillMount() {
    let response = await this.getItems();
    array = _.groupBy(response.items, "category");
    this.setState({
      menuArr: array,
      favouriteArr: response.favourites,
      campaignArr: response.campaigns
    });
  }

  async getItems() {
    var URL =
      global.URL[0] +
      "//" +
      global.URL[2] +
      "/" +
      global.URL[3] +
      "/" +
      global.resNo;
    console.log(URL);
    this.setState({ isLoading: true });
    var token = await AsyncStorage.getItem("userToken");
    var tokenStr = JSON.parse(token);
    var test_url = "http://192.168.0.14:8080/menu/1";
    const response = await fetch(test_url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Basic " + tokenStr
      }
    })
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        return data;
      });
    this.setState({ isLoading: false });
    return response;
  }

  diff_minutes(dt1, dt2) {
    return Math.round((dt2 - dt1) / 60000);
  }

  async getWaitressWithCoords() {
    if (this.state.isPressed === true) {
      Alert.alert("Uyarı", "5 dakika içinde bir seferden fazla basamazsınız.", [
        { text: "Kapat", onPress: () => {} }
      ]);
    } else {
      this.setState({ isLoading: true });
      await this.askGpsPermission();
      Geolocation.getCurrentPosition(
        position => {
          if (position.mocked == true) {
            Alert.alert(
              "Uyarı",
              "Görünüşe göre bir vekil konum sunucusu kullanmaktasınız.Uygulamayı kullanabilmek için bu sunucuyu kapatmanız gerekmektedir.",
              [{ text: "Kapat", onPress: () => {} }],
              { cancelable: false }
            );
            this.setState({ isLoading: false });
          } else {
            let request = new WaiterRequest();
            request.latitude = position.coords.latitude;
            request.longitude = position.coords.longitude;
            this.makeAjaxWaitress(request);
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
  }

  async makeAjaxWaitress(request) {
    var URL =
      global.URL[0] +
      "//" +
      global.URL[2] +
      "/table_orders/garson/" +
      global.resNo +
      "/" +
      global.masaNo;
    var token = await AsyncStorage.getItem("userToken");
    var tokenStr = JSON.parse(token);
    let test_url = "http://192.168.0.14:8080/table_orders/garson/1/5";
    await fetch(test_url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Basic " + tokenStr
      },
      body: JSON.stringify(request)
    })
      .then(res => {
        if (res.status === 200) {
          Alert.alert("İsteğiniz restoran ekranına iletildi");
          if (Platform.OS === "ios") {
            BackgroundTimer.start();
          }
          BackgroundTimer.setTimeout(() => {
            this.setState({ isPressed: false });
            if (Platform.OS === "ios") {
              BackgroundTimer.stop();
            }
          }, 60000);
          this.setState({ isLoading: false });
          this.setState({ isPressed: true });
        } else {
          Alert.alert(
            "Uyarı",
            "İsteğinizin iletilebilmesi için restoran içerisinde olmanız gereklidir",
            [{ text: "Kapat", onPress: () => {} }]
          );
          this.setState({ isLoading: false });
        }
      })
      .catch(err => {
        Alert.alert("Sunucuda bir sorun oluştu");
        this.setState({ isLoading: false });
        throw err;
      });
  }

  setModal(visible) {
    this.setState({ modalVisible: visible });
  }

  modalCallback = data => {
    this.setState({ modalVisible: data });
  };

  convertRequestItem(item) {
    return {
      id: item.id,
      item: item.item,
      ingredients: item.ingredients,
      price: item.price,
      category: item.category,
      message: ""
    };
  }

  convertRequestCampaign(camp) {
    return {
      id: camp.id,
      item: camp.name,
      ingredients: camp.contents,
      price: camp.price,
      category: "",
      message: ""
    };
  }

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
            "Garson çağırabilmek için konum \t servislerine izin vermeniz \t gerekmektedir.",
          buttonPositive: "Aç"
        }
      );
    }
  }

  render() {
    return (
      <LinearGradient
        colors={["rgb(226, 54, 45)", "rgb(245, 193, 153)"]}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <ScrollView>
            <Image
              style={{ width: 300, height: 128, margin: 7 }}
              source={require("../Assets/whitelogo.png")}
            />
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: "rgb(237, 237, 237)"
              }}
            >
              Menü
            </Text>

            <TouchableOpacity
              onPress={async () => {
                await this.getWaitressWithCoords();
              }}
              style={styles.waitressbutton}
            >
              <Text style={{ color: "rgb(235, 235, 235)", fontWeight: "bold" }}>
                Garson Çağır{"  "}
              </Text>
              <Icon
                name="hand-o-up"
                size={25}
                style={{ color: "rgb(235, 235, 235)", marginRight: 2 }}
              />
            </TouchableOpacity>

            <ActivityIndicator
              animating={this.state.isLoading}
              size="large"
              color="#0000ff"
            />
            {this.state.campaignArr.length > 0 && (
              <View>
                <Collapse>
                  <CollapseHeader>
                    <CampaignCollapseHeader />
                  </CollapseHeader>
                  <CollapseBody>
                    {this.state.campaignArr.map((camp, index) => {
                      return (
                        <ItemContainer
                          item={camp}
                          itemType="campaign"
                          parentCallback1={this.modalCallback}
                        />
                      );
                    })}
                  </CollapseBody>
                </Collapse>
              </View>
            )}

            {this.state.favouriteArr.length > 0 && (
              <View>
                <Collapse>
                  <CollapseHeader>
                    <FavCollapseHeader />
                  </CollapseHeader>
                  <CollapseBody>
                    {this.state.favouriteArr.map((fav, index) => {
                      return (
                        <ItemContainer
                          item={fav}
                          itemType="item"
                          parentCallback1={this.modalCallback}
                        />
                      );
                    })}
                  </CollapseBody>
                </Collapse>
              </View>
            )}

            {Object.keys(this.state.menuArr)
              .sort(function(a, b) {
                return a.localeCompare(b);
              })
              .map((category, index) => {
                return (
                  <Collapse>
                    <CollapseHeader>
                      <ItemCollapseHeader category={category} />
                    </CollapseHeader>

                    <CollapseBody>
                      {this.state.menuArr[category].map((item, idx) => {
                        return (
                          <ItemContainer
                            item={item}
                            itemType="item"
                            parentCallback1={this.modalCallback}
                          />
                        );
                      })}
                    </CollapseBody>
                  </Collapse>
                );
              })}
          </ScrollView>
          <ItemAddingModal modalVisible={this.state.modalVisible} parentCallback={this.modalCallback} />
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent"
  },
  waitressbutton: {
    width: 320,
    height: 40,
    backgroundColor: "#84343D",
    elevation: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    margin: 5,
    padding: 2
  }
});

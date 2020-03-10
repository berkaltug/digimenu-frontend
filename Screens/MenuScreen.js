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
import CartScreen from "./CartScreen";
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
import {ItemCollapseHeader} from "../Components/ItemCollapseHeader";

import {showGpsError} from "../Globals/Errors.js";

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
            {(() => {
              if (this.state.campaignArr.length > 0) {
                return (
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
                );
              }
            })()}

            {(() => {
              if (this.state.favouriteArr.length > 0) {
                return (
                  <View>
                    <Collapse>
                      <CollapseHeader>
                        <FavCollapseHeader/>
                      </CollapseHeader>
                      <CollapseBody>
                        {this.state.favouriteArr.map((fav, index) => {
                          return (
                            <ItemContainer item={fav} itemType="item" parentCallback1={this.modalCallback}/>
                          );
                        })}
                      </CollapseBody>
                    </Collapse>
                  </View>
                );
              }
            })()}

            {Object.keys(this.state.menuArr)
              .sort(function(a, b) {
                return a.localeCompare(b);
              })
              .map((category, index) => {
                return (
                  <Collapse>
                    <CollapseHeader>
                      <ItemCollapseHeader category={category}/>
                    </CollapseHeader>

                    <CollapseBody>
                      {this.state.menuArr[category].map((item, idx) => {
                        return (
                        <ItemContainer item={item} itemType="item" parentCallback1={this.modalCallback} />
                        );
                      })}
                    </CollapseBody>
                  </Collapse>
                );
              })}
          </ScrollView>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {}}
          >
            <LinearGradient
              colors={["rgb(226, 54, 45)", "rgb(245, 193, 153)"]}
              style={{ flex: 1 }}
            >
              <View style={styles.container}>
                <Text style={{ fontSize: 30, fontWeight: "bold", margin: 3 }}>
                  {CartStore.menuItem.item}
                </Text>
                <View style={styles.addcontainer}>
                  <Text
                    style={{ fontSize: 25, margin: 3, textAlign: "center" }}
                  >
                    Sepete Eklemek İstediğinizden Emin Misiniz ?
                  </Text>
                  <View style={styles.adetcontainer}>
                    <Text style={{ fontSize: 20 }}>Adet Seçimi:</Text>

                    <NumericInput
                      initValue={1}
                      minValue={1}
                      maxValue={15}
                      onChange={value => CounterStore.setCount(value)}
                    />
                  </View>
                  <View style={styles.buttoncontainer}>
                    <TouchableOpacity
                      style={styles.addcontainerbutton2}
                      onPress={() => {
                        this.setModal(false);
                        CounterStore.setCount(1);
                        CartStore.setMenuItem({});
                      }}
                    >
                      <Text style={{ fontSize: 16 }}>İptal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.addcontainerbutton}
                      onPress={() => {
                        this.setModal(false);
                        CartStore.pushCart(
                          CartStore.menuItem,
                          CounterStore.count
                        );
                        CounterStore.setCount(1);
                      }}
                    >
                      <Text style={{ fontSize: 16 }}>Sepete Ekle</Text>
                    </TouchableOpacity>
                  </View>
                  <TextInput
                    placeholder={
                      "Lütfen özel isteğiniz varsa burada belirtiniz."
                    }
                    multiline={true}
                    numberOfLines={4}
                    maxLength={140}
                    defaultValue="" //gerekli yoksa menuitem.message null set eder restoran ekranını patlatır
                    style={{
                      height: 70,
                      width: 330,
                      borderColor: "gray",
                      borderWidth: 1,
                      backgroundColor: "white",
                      borderRadius: 10
                    }}
                    onChangeText={text => {
                      CartStore.menuItem.message = text;
                    }}
                  />
                </View>
              </View>
            </LinearGradient>
          </Modal>
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
  optionbutton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    width: 320,
    elevation: 4,
    backgroundColor: "#f9f7f5",
    margin: 5,
    padding: 2,
    minHeight: 50,
    borderRadius: 5
  },
  collapseHeader: {
    flex: 1,
    alignItems: "center",
    width: 320,
    elevation: 4,
    backgroundColor: "#e87159",
    margin: 5,
    padding: 2,
    borderRadius: 5,
    borderBottomWidth: 2,
    borderRightWidth: 1,
    borderColor: "#af5a49"
  },
  categoryHeader: {
    fontSize: 19,
    fontStyle: "italic",
    color: "rgb(235, 235, 235)"
  },
  addbutton: {
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
  adetcontainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "stretch"
  },
  buttoncontainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "stretch"
  },
  addcontainer: {
    flex: 1 / 1.5,
    backgroundColor: "#f1a281",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    width: 350,
    elevation: 5,
    borderRadius: 10,
    padding: 2
  },
  addcontainerbutton: {
    width: 90,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#95f98e",
    borderRadius: 3,
    elevation: 3
  },
  addcontainerbutton2: {
    width: 90,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "tomato",
    borderRadius: 3,
    elevation: 3
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

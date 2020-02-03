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
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationActions } from "react-navigation";
import CartScreen from "./CartScreen";
import cartInstance from "../Globals/globalCart";
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

@observer
export default class MenuScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      menuItem: {},
      cartArr: new Array(),
      menuArr: new Array(),
      isLoading: false,
      amount: 1
    };
  }

  //menuyu çek
  // _.groupBy lodash kütüphanesinde reduce fonk kullanan hazır bir fonk direk internetten bulduk
  async componentWillMount() {
    let response = await this.getItems();
    this.setState({ menuArr: _.groupBy(response.items, "category") });
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
    //console.log(token);
    const response = await fetch(URL, {
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
    console.log(response);
    return response;
  }

  async getWaitress() {
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
    await fetch(URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Basic " + tokenStr
      }
    })
      .then(function(res) {
        Alert.alert("İsteğiniz restoran ekranına iletildi");
      })
      .catch(function(err) {
        Alert.alert("Sunucuda bir sorun oluştu");
      });
  }

  setModal(visible) {
    this.setState({ modalVisible: visible });
  }

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
              onPress={() => {
                this.getWaitress();
              }}
              style={styles.waitressbutton}
            >
              <Text style={{ color: "rgb(235, 235, 235)", fontWeight: "bold" }}>
                {" "}
                Garson Çağır{" "}
              </Text>
              <Icon
                name="hand-o-up"
                size={25}
                style={{ color: "rgb(235, 235, 235)" }}
              />
            </TouchableOpacity>

            <ActivityIndicator
              animating={this.state.isLoading}
              size="large"
              color="#0000ff"
            />

            {Object.keys(this.state.menuArr).map((category, index) => {
              return (
                <Collapse key={Math.floor(Math.random() * 10000) + 1}>
                  <CollapseHeader
                    key={Math.floor(Math.random() * 10000) + 1}
                    style={styles.collapseHeader}
                  >
                    <View key={Math.floor(Math.random() * 10000) + 1}>
                      <Text style={styles.categoryHeader}> {category} </Text>
                    </View>
                  </CollapseHeader>

                  <CollapseBody key={Math.floor(Math.random() * 10000) + 1}>
                    {this.state.menuArr[category].map((item, idx) => {
                      return (
                        <View
                          key={Math.floor(Math.random() * 10000) + 1}
                          style={styles.optionbutton}
                        >
                          <View
                            key={Math.floor(Math.random() * 10000) + 1}
                            style={{ flex: 3 }}
                          >
                            <Text
                              key={Math.floor(Math.random() * 10000) + 1}
                              style={{ color: "#E2362D", fontSize: 18 }}
                            >
                              {item.item}
                            </Text>
                            <Text
                              key={Math.floor(Math.random() * 10000) + 1}
                              style={{ color: "#E2362D", fontSize: 14 }}
                            >
                              {item.ingredients}
                            </Text>
                          </View>
                          <View
                            key={Math.floor(Math.random() * 10000) + 1}
                            style={{
                              flex: 1,
                              flexDirection: "row",
                              justfyContent: "flex-end",
                              alignItems: "center"
                            }}
                          >
                            <View style={{ marginLeft: "auto" }}>
                              <Text
                                key={Math.floor(Math.random() * 10000) + 1}
                                style={{ color: "#7B7C00", fontSize: 16 }}
                              >
                                {item.price} ₺
                              </Text>
                            </View>
                            <TouchableOpacity
                              key={Math.floor(Math.random() * 10000) + 1}
                              style={styles.addbutton}
                              onPress={() => {
                                CartStore.setMenuItem(
                                  this.convertRequestItem(item)
                                );
                                this.setModal(true);
                              }}
                            >
                              <Text key={Math.floor(Math.random() * 10000) + 1}>
                                {" "}
                                <Icon name="plus" color="#d7263d" />{" "}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
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
                    <Text style={{fontSize:20 }}>Adet Seçimi:</Text>

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
                    placeholder={"Lütfen özel isteğiniz varsa burada belirtiniz."}
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
    alignSelf:"stretch"
  },
  buttoncontainer: {
    flexDirection:"row",
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf:"stretch"
  },
  addcontainer: {
    flex: 1 / 1.5,
    backgroundColor: "#f1a281",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    width: 350,
    elevation: 5,
    borderRadius:10,
    padding:2
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
    backgroundColor: "#e19c8e",
    elevation: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    padding: 2
  }
});

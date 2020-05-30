import React, { Component } from "react";
import {
  TouchableOpacity,
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import NumericInput from "react-native-numeric-input";
import CartStore from "../Store/CartStore";
import CounterStore from "../Store/CounterStore";
import { myColors } from "../Globals/colors";

export class ItemAddingModal extends Component {
  constructor(props) {
    super(props);
  }

  sendModalData() {
    this.props.parentCallback(false);
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.modalVisible}
        onRequestClose={() => {}}
      >
        <View style={styles.container}>
          <Text style={styles.headerFont}>{CartStore.menuItem.item}</Text>
          <View style={styles.addcontainer}>
            <Text
              style={{
                fontSize: 25,
                margin: 3,
                textAlign: "center",
                color: myColors.darkAccent
              }}
            >
              Sepete Eklemek İstediğinizden Emin Misiniz ?
            </Text>
            <View style={styles.adetcontainer}>
              <Text style={{ fontSize: 20, color: myColors.darkAccent }}>
                Adet Seçimi:
              </Text>

              <NumericInput
                initValue={1}
                minValue={1}
                maxValue={15}
                rounded
                rightButtonBackgroundColor={myColors.main}
                leftButtonBackgroundColor={myColors.mainComplementary}
                iconStyle={{color: myColors.lightShade}}
                onChange={value => CounterStore.setCount(value)}
              />
            </View>
            <View style={styles.buttoncontainer}>
              <TouchableOpacity
                style={styles.addcontainerbutton2}
                onPress={() => {
                  this.sendModalData();
                  CounterStore.setCount(1);
                  CartStore.setMenuItem({});
                }}
              >
                <Text style={styles.buttonFont}>İptal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addcontainerbutton}
                onPress={() => {
                  this.sendModalData();
                  CartStore.pushCart(CartStore.menuItem, CounterStore.count);
                  CounterStore.setCount(1);
                }}
              >
                <Text style={styles.buttonFont}>Sepete Ekle</Text>
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
                borderColor: myColors.darkShade,
                borderWidth: 1,
                backgroundColor: myColors.lightAccent,
                borderRadius: 10
              }}
              onChangeText={text => {
                CartStore.menuItem.message = text;
              }}
            />
          </View>
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: myColors.lightAccent
  },
  headerFont: {
    color: myColors.darkAccent,
    fontSize: 30,
    fontWeight: "bold",
    margin: 3
  },
  buttonFont: {
    fontSize: 16,
    color: myColors.lightShade
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
    backgroundColor: myColors.lightShade,
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
    backgroundColor: myColors.main,
    borderRadius: 3,
    elevation: 3
  },
  addcontainerbutton2: {
    width: 90,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: myColors.mainComplementary,
    borderRadius: 3,
    elevation: 3
  }
});

import React,{Component} from 'react';
import {TouchableOpacity,Modal,View,Text,TextInput,StyleSheet} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import NumericInput from "react-native-numeric-input";
import CartStore from "../Store/CartStore";
import CounterStore from "../Store/CounterStore";

export class ItemAddingModal extends Component{
  constructor(props){
    super(props)
  }

  sendModalData(){
    this.props.parentCallback(false);
  }

  render(){
    return(
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.modalVisible}
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
                    this.sendModalData();
                    CounterStore.setCount(1);
                    CartStore.setMenuItem({});
                  }}
                >
                  <Text style={{ fontSize: 16 }}>İptal</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.addcontainerbutton}
                  onPress={() => {
                    this.sendModalData();
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
    )
  }
}
const styles=StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent"
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
  }
})

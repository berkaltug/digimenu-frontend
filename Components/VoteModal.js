import React, { Component } from "react";
import {
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  AsyncStorage
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { VoteContainer } from "./VoteContainer";
import PastStore from "../Store/PastStore";
import { observer } from "mobx-react";
import RatingStore from "../Store/RatingStore";
import { RatingRequest } from "../Entity/RatingRequest";
import { Button } from "react-native-elements";
import { myColors } from "../Globals/colors";

@observer
export class VoteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      isSend: false,
      isSending: false
    };
  }

  closeModal = () => {
    this.setState({ isSend: false });
    this.props.voteModalCallback(false);
  };

  async sendVoting() {
    const URL = "https://digimenu.herokuapp.com/comment/makeComment";
    const TEST_URL = "http://192.168.0.14:8080/comment/makeComment";
    const token = await AsyncStorage.getItem("userToken");
    const tokenStr = JSON.parse(token);
    const ratingRequest = new RatingRequest(
      PastStore.clickedOrderId,
      PastStore.clickedRestaurantId,
      this.state.message,
      RatingStore.tupleList
    );
    this.setState({ isSending: true });
    console.log(JSON.stringify(ratingRequest, null, 2));
    await fetch(TEST_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Basic " + tokenStr
      },
      body: JSON.stringify(ratingRequest)
    }).then(response => {
      if (response.status === 200) {
        this.setState({ isSend: true });
      } else {
        Alert.alert(
          "Uyarı",
          "Sistemimizde bir sorun oluştu , lütfen daha sonra tekrar deneyiniz.",
          [{ text: "Kapat", onPress: () => {} }],
          { cancelable: false }
        );
      }
    });
    RatingStore.setTupleList([]);
    this.setState({ isSending: false });
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.modalVisible}
        onRequestClose={() => {}}
      >
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.headerFont}>Puan Ver</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={this.closeModal}
            >
              <Text style={{ color: myColors.lightShade }}>Kapat</Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            <KeyboardAvoidingView style={styles.container} behaviour="padding">
              <Text style={styles.resName}>
                {PastStore.clickedRestaurantName}
              </Text>
              {PastStore.clickedPastOrderList.map((order, index) => {
                return <VoteContainer orderName={order.name} />;
              })}
              <TextInput
                placeholder={"Ek yorumuzunuzu buraya yazabilirsiniz."}
                multiline={true}
                numberOfLines={3}
                maxLength={140}
                defaultValue=""
                style={styles.textinput}
                onChangeText={text => {
                  this.setState({ message: text });
                }}
              />

              <Button
                title={this.state.isSend === true ? "Gönderildi" : "Gönder"}
                loading={this.state.isSending}
                disabled={this.state.isSending || this.state.isSend}
                buttonStyle={styles.votebutton}
                disabledStyle={{ backgroundColor: "#4b671b" }}
                onPress={() => {
                  console.log(RatingStore.tupleList);
                  this.sendVoting();
                }}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: myColors.lightAccent
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  closeButton: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    backgroundColor: myColors.mainComplementary,
    fontSize: 18,
    padding: 7,
    borderRadius: 8
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    marginHorizontal: 30,
    marginVertical: 18
  },
  headerFont: {
    color: myColors.darkAccent,
    fontSize: 25,
    fontWeight: "bold"
  },
  resName: {
    color: myColors.darkAccent,
    fontSize: 27,
    fontWeight: "bold"
  },
  textinput: {
    height: 70,
    width: 340,
    borderColor: myColors.main,
    borderWidth: 1,
    backgroundColor: myColors.lightShade,
    borderRadius: 8,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6
  },
  votebutton: {
    justifyContent: "center",
    alignItems: "center",
    width: 340,
    padding: 5,
    backgroundColor: myColors.main,
    borderRadius: 8
  }
});

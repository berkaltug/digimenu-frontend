import React, { Component } from "react";
import {
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { VoteContainer } from "./VoteContainer";
import PastStore from "../Store/PastStore";
import { observer } from "mobx-react";
@observer
export class VoteModal extends Component {
  constructor(props) {
    super(props);
  }

  closeModal = () => {
    this.props.voteModalCallback(false);
  };

  render() {
    return (
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
          <View style={styles.header}>
            <Text
              style={{
                color: "rgb(65, 58, 58)",
                fontSize: 25,
                fontWeight: "bold"
              }}
            >
              Puan Ver
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={this.closeModal}
            >
              <Text style={{ color: "rgb(237,237,237)" }}>Kapat</Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            <KeyboardAvoidingView style={styles.container} behaviour="padding">
              <Text
                style={{
                  color: "rgb(65, 58, 58)",
                  fontSize: 27,
                  fontWeight: "bold"
                }}
              >
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
                onChangeText={text => {}}
              />
              <TouchableOpacity style={styles.votebutton} onPress={() => {}}>
                <Text
                  style={{
                    fontSize: 20,
                    color: "rgb(237,237,237)",
                    fontWeight: "bold"
                  }}
                >
                  Gönder
                </Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </ScrollView>
        </LinearGradient>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  closeButton: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    backgroundColor: "#3d405b",
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
  textinput: {
    height: 70,
    width: 340,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "rgb(237,237,237)",
    borderRadius: 8,
    margin: 10
  },
  votebutton: {
    justifyContent: "center",
    alignItems: "center",
    width: 340,
    padding: 5,
    backgroundColor: "#688e26",
    borderRadius: 8
  }
});

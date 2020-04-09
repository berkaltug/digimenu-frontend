import React, { Component } from "react";
import { View, Modal, TouchableOpacity, StyleSheet, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {VoteContainer} from "./VoteContainer";

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
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>Puan Ver</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={this.closeModal}
          >
            <Text style={{ color: "rgb(237,237,237)" }}>Kapat</Text>
          </TouchableOpacity>
        </View>

          <View style={styles.container}>

            <Text style={{ color: "rgb(237,237,237)" }}>
              {this.props.restaurantName}
            </Text>
          </View>
        </LinearGradient>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
  }
});

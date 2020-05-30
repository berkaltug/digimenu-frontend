import React, { Component } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { myColors } from "../Globals/colors";

export class OrderSuccessModal extends Component {
  constructor(props) {
    super(props);
  }

  sendModalData = () => {
    this.props.parentCallback(false);
  };

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.modalVisible}
        onRequestClose={() => {}}
      >
        <View style={styles.container}>
          <Icon
            name="check-circle"
            size={100}
            style={{ color: "rgb(58, 164, 91)" }}
          />
          <Text style={{ fontSize: 40 }}>Sipariş Başarılı</Text>
          <TouchableOpacity
            style={{
              margin: 50,
              width: 90,
              height: 40,
              backgroundColor: myColors.main,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10
            }}
            onPress={this.sendModalData}
          >
            <Text style={{ fontSize: 17,color: myColors.lightShade }}>Kapat</Text>
          </TouchableOpacity>
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
  }
});

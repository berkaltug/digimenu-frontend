import React, { Component } from "react";
import {
  AsyncStorage,
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  Text
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { PastContainer } from "./PastContainer";
import { VoteModal } from "./VoteModal";
export class PastOrdersModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      past: {},
      isLoading: false,
      modalVisible: false
    };
  }

  async componentWillMount() {
    const test_url = "http://192.168.0.14:8080/table_orders/past-orders";
    const token = await AsyncStorage.getItem("userToken");
    const tokenStr = JSON.parse(token);
    const response = await fetch(test_url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Basic " + tokenStr
      }
    })
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        return data;
      });
    this.setState({ past: response });
  }

  setVoteModal = value => {
    this.setState({ modalVisible: value });
  };

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
        <LinearGradient
          colors={["rgb(226, 54, 45)", "rgb(245, 193, 153)"]}
          style={{ flex: 1 }}
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={{ fontSize: 23, fontWeight: "bold" }}>Geçmişim</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={this.sendModalData}
              >
                <Text style={{ color: "rgb(237, 237, 237)" }}>Kapat</Text>
              </TouchableOpacity>
            </View>

            <ScrollView>
              {this.state.past.pastOrders &&
                this.state.past.pastOrders.map((pastOrder, index) => {
                  return (
                    <PastContainer
                      restaurantName={pastOrder.restaurantName}
                      orderDate={pastOrder.orderDate}
                      orders={pastOrder.orders}
                      voteModalCallback={this.setVoteModal}
                    />
                  );
                })}
            </ScrollView>
            <VoteModal
              modalVisible={this.state.modalVisible}
              voteModalCallback={this.setVoteModal}
            />
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

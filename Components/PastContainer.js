import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import PastStore from "../Store/PastStore";
import { myColors } from "../Globals/colors";

export class PastContainer extends Component {
  constructor(props) {
    super(props);
  }

  sendContainerData = () => {
    this.props.voteModalCallback(true);
  };

  sendRestaurantData = name => {
    this.props.restaurantCallback(name);
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.resName}>{this.props.restaurantName}</Text>
          <Text style={styles.date}>{this.props.orderDate}</Text>
        </View>
        {this.props.orders &&
          this.props.orders.map((order, index) => {
            return (
              <View style={styles.orders}>
                <View style={styles.innerBox}>
                  <Text>{order.name}</Text>
                  <Text>{order.count} adet</Text>
                </View>
                <View style={styles.innerBoxRight}>
                  <Text>{order.total} ₺</Text>
                </View>
              </View>
            );
          })}
        <TouchableOpacity
          disabled={this.props.isVoted}
          style={styles.vote}
          onPress={() => {
            this.sendContainerData();
            PastStore.setClickedOrderId(this.props.orderId);
            PastStore.setClickedRestaurantId(this.props.restaurantId);
            PastStore.setClickedRestaurantName(this.props.restaurantName);
            PastStore.setClickedPastOrderList(this.props.orders);
          }}
        >
          <Text style={{ color: myColors.lightShade }}>
            {this.props.isVoted ? "Puan Verildi" : "Puan Ver"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 340,
    borderRadius: 8,
    borderWidth: 0.8,
    borderColor: myColors.main,
    marginTop: 10,
    padding: 5,
    backgroundColor: myColors.lightShade,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch"
  },
  resName: {
    fontSize: 20
  },
  date: {
    fontSize: 15,
    fontStyle: "italic"
  },
  orders: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    marginTop: 2,
    borderTopWidth: 0.25,
    borderTopColor: "rgb(112, 112, 112)"
  },
  innerBox: {
    flex: 0.75,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    paddingHorizontal: 10
  },
  innerBoxRight: {
    flex: 0.25,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  vote: {
    backgroundColor: myColors.main,
    paddingHorizontal: 20,
    paddingVertical: 8,
    margin: 5,
    borderRadius: 8
  }
});

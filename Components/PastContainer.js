import React, { Component } from "react";
import { StyleSheet, View, Text,TouchableOpacity } from "react-native";

export class PastContainer extends Component {
  constructor(props) {
    super(props);
  }

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
        <TouchableOpacity style={styles.vote}>
          <Text style={{color:"rgb(237, 237, 237)"}}>Puan Ver</Text>
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
    borderWidth: 0.5,
    borderColor: "rgb(145, 105, 105)",
    marginTop: 10,
    padding: 5,
    backgroundColor: "#f4f1de"
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
  vote:{
    backgroundColor:"#faa613",
    paddingHorizontal:20,
    paddingVertical:8,
    margin:5,
    borderRadius:8

  }
});

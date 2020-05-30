import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { myColors } from "../Globals/colors";

export class ItemCollapseHeader extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.collapseHeader}>
        <Text style={styles.categoryHeader}> {this.props.category} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  collapseHeader: {
    flex: 1,
    alignItems: "center",
    width: 320,
    backgroundColor: myColors.main,
    margin: 7,
    padding: 2,
    borderRadius: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  categoryHeader: {
    fontSize: 19,
    color: myColors.lightShade
  }
});

import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { myColors } from "../Globals/colors";

export class FavCollapseHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.favCollapseHeader}>
        <Text style={styles.favHeaderText}>
          Sık Tercih Edilenler{"  "}
          <Icon
            name="star"
            size={20}
            style={{
              color: myColors.lightShade,
              marginRight: 2
            }}
          />
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  favCollapseHeader: {
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
  favHeaderText: {
    fontSize: 21,
    fontStyle: "italic",
    color: myColors.lightShade
  }
});

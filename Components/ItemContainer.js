import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AddButton } from "./AddButton";
import StarRating from "react-native-star-rating";

export class ItemContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.item);
    return (
      <View style={styles.optionbutton}>
        <View style={{ flex: 3, paddingHorizontal: 2 }}>
          <Text style={{ color: "#E2362D", fontSize: 18 }}>
            {this.props.item.name || this.props.item.item}
          </Text>
          {this.props.item.rating !== 0.0 && (
            <View style={{ flexDirection: "row" }}>
              <StarRating
                disabled={true}
                starSize={16}
                fullStarColor={"#faa613"}
                rating={this.props.item.rating}
              />
            </View>
          )}
          <Text style={{ color: "#E2362D", fontSize: 14 }}>
            {this.props.item.contents || this.props.item.ingredients}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justfyContent: "flex-end",
            alignItems: "center"
          }}
        >
          <View style={{ marginLeft: "auto" }}>
            <Text style={{ color: "#7B7C00", fontSize: 16 }}>
              {this.props.item.price} ₺
            </Text>
          </View>
          <AddButton
            item={this.props.item}
            itemType={this.props.itemType}
            parentCallback2={this.props.parentCallback1}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  optionbutton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    width: 320,
    elevation: 4,
    backgroundColor: "#f9f7f5",
    margin: 5,
    padding: 2,
    minHeight: 50,
    borderRadius: 5
  }
});

import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import StarRating from "react-native-star-rating";
import RatingStore from "../Store/RatingStore";
import { RatingTuple } from "../Entity/RatingTuple";
import { myColors } from "../Globals/colors";

export class VoteContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 4
    };
  }

  componentDidMount() {
    let tuple = new RatingTuple(this.props.orderName, this.state.starCount);
    RatingStore.addTuple(tuple);
  }

  onStarRatingPress(name, rating) {
    this.setState({
      starCount: rating
    });
    let tuple = new RatingTuple(name, rating);
    RatingStore.addTuple(tuple);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.ratingItem}>
          <Text style={{ fontSize: 15 }}>{this.props.orderName}</Text>
          <StarRating
            halfStarEnabled={false}
            starSize={30}
            fullStarColor={myColors.favourite}
            rating={this.state.starCount}
            selectedStar={rating =>
              this.onStarRatingPress(this.props.orderName, rating)
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: 340,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: myColors.main,
    marginTop: 10,
    padding: 3,
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
  ratingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch"
  }
});

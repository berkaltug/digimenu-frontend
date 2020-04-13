import React, { Component } from "react";
import { StyleSheet, View, Text,TouchableOpacity } from "react-native";
import StarRating from "react-native-star-rating";

export class VoteContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      starCount: 4
    };
  }

  onStarRatingPress(rating) {
      this.setState({
        starCount: rating
      });
    }


  render(){
    return (
        <View style={styles.container}>
              <View style={styles.ratingItem}>
                <Text  style={{ fontSize:15 }}>{this.props.orderName}</Text>
                <StarRating
                halfStarEnabled={false}
                starSize={30}
                fullStarColor={"#faa613"}
                rating={this.state.starCount}
                selectedStar={(rating)=>this.onStarRatingPress(rating)}
                />
              </View>
        </View>
    )
  }
}


const styles=StyleSheet.create({
  container:{
    justifyContent:"center",
    alignItems:"center",
    width:340,
    borderWidth:0.5,
    borderRadius:8,
    borderColor: "rgb(145, 105, 105)",
    marginTop: 10,
    padding: 3,
    backgroundColor: "#f4f1de"
  },
  ratingItem:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    alignSelf:"stretch"
  }
});

import React, { Component } from "react";
import { StyleSheet, View, Text,TouchableOpacity } from "react-native";
import StarRating from "react-native-star-rating";

export class VoteContainer extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
        <View style={styles.container}>
          {this.props.orderlist && this.props.orderlist.map((order,index)=>{
            return(
              <View>
                <Text>{order}</Text>
              </View>
            )
          })}
        </View>
    )
  }
}


const styles=StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"space-between",
    alignItems:"center",
    width:340,
    borderWidth:0.5,
    borderRadius:8,
    borderColor: "rgb(145, 105, 105)",
    marginTop: 10,
    padding: 3,
    backgroundColor: "#f4f1de"
  }
});

import React,{Component} from 'react';
import {StyleSheet , View , Text} from 'react-native';

export class ItemCollapseHeader extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <View style={styles.collapseHeader}>
        <Text style={styles.categoryHeader}> {this.props.category} </Text>
      </View>
    )
  }
}

const styles=StyleSheet.create({
  collapseHeader: {
    flex: 1,
    alignItems: "center",
    width: 320,
    elevation: 4,
    backgroundColor: "#e87159",
    margin: 5,
    padding: 2,
    borderRadius: 5,
    borderBottomWidth: 2,
    borderRightWidth: 1,
    borderColor: "#af5a49"
  },
  categoryHeader: {
    fontSize: 19,
    fontStyle: "italic",
    color: "rgb(235, 235, 235)"
  }
})

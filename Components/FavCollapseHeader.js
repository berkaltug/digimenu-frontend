import React,{Component} from 'react';
import {StyleSheet , View , Text} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
export class favCollapseHeader extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <View style={styles.favCollapseHeader}>
        <Text style={styles.favHeaderText}>
          Favori Ürünler{" "}
          <Icon
            name="star"
            size={20}
            style={{
              color: "rgb(235, 235, 235)",
              marginRight: 2
            }}
          />
        </Text>
      </View>
    )
  }
}

const styles=StyleSheet.create({
  favCollapseHeader: {
    flex: 1,
    alignItems: "center",
    width: 320,
    elevation: 4,
    backgroundColor: "#faa613",
    margin: 5,
    padding: 2,
    borderRadius: 5,
    borderBottomWidth: 1.5,
    borderRightWidth: 1,
    borderColor: "#ab7d2c"
  },
  favHeaderText: {
    fontSize: 21,
    fontStyle: "italic",
    color: "rgb(235, 235, 235)"
  }
})

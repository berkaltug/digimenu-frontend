import React,{Component} from 'react';

import {View,StyleSheet,Text} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";

export class CampaignCollapseHeader extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <View style={styles.campCollapseHeader}>
        <Text style={styles.campHeaderText}>
          Kampanyalar{" "}
          <Icon
            name="bullhorn"
            size={22}
            style={{
              color: "rgb(235, 235, 235)",
              marginRight: 2
            }}
          />
        </Text>
      </View>
  );
  }
}
const styles=StyleSheet.create({
  campCollapseHeader: {
    flex: 1,
    alignItems: "center",
    width: 320,
    elevation: 4,
    backgroundColor: "#688e26",
    margin: 5,
    padding: 2,
    borderRadius: 5,
    borderBottomWidth: 2,
    borderRightWidth: 1,
    borderColor: "#515d3c"
  },
  campHeaderText: {
    fontSize: 22,
    fontStyle: "italic",
    color: "rgb(235, 235, 235)"
  }
})

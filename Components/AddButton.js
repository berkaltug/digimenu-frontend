import React, { Component } from "react";
import { observer } from "mobx-react";
import CartStore from "../Store/CartStore";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

@observer
export class AddButton extends Component {
  constructor(props) {
    super(props);
    this.onPressEvent=this.onPressEvent.bind(this);
  }

  sendModalData() {
    this.props.parentCallback2(true);
  };

  onPressEvent(){
    let item;
    if(this.props.itemType==="campaign"){
      item=this.convertRequestCampaign(this.props.item);
    }else if(this.props.itemType==="item"){
      item=this.convertRequestItem(this.props.item);
    }
    CartStore.setMenuItem(item);
    this.sendModalData();
  }

  convertRequestCampaign(camp) {
    return {
      id: camp.id,
      item: camp.name,
      ingredients: camp.contents,
      price: camp.price,
      category: "",
      message: ""
    };
  }

  convertRequestItem(item) {
    return {
      id: item.id,
      item: item.item,
      ingredients: item.ingredients,
      price: item.price,
      category: item.category,
      message: ""
    };
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          style={styles.addbutton}
          onPress={this.onPressEvent}>
          <Text><Icon name="plus" color="#d7263d"/></Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  addbutton: {
    backgroundColor: "rgb(237, 237, 237)",
    elevation: 12,
    margin: 3,
    padding: 3,
    borderRadius: 50,
    width: 26,
    height: 26,
    justifyContent: "center",
    alignItems: "center"
  }
});

import React, { Component } from "react";

import { View, Dimensions, Text ,TouchableOpacity, Modal,AsyncStorage} from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import Icon from "react-native-vector-icons/Ionicons";
import {PastOrdersModal} from "../Components/PastOrdersModal";
import * as Animatable from "react-native-animatable";
import { withNavigationFocus } from 'react-navigation';
import { myColors } from "../Globals/colors";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

console.disableYellowBox = true;

class QrScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      modalVisible: false,
      qr_data: ''
    }
  }
   onSuccess(code) {
     //globalCart içinde tanımlı
    global.URL=code.data.split("/");
    global.masaNo=global.URL[5];
    global.resNo=global.URL[4];
     //alert(global.masaNo);
     console.log("url "+global.URL);
     console.log("masa "+global.masaNo);
     console.log("res "+global.resNo);
    this.props.navigation.navigate('Menu');
  }

  makeSlideOutTranslation(translationType, fromValue) {
    return {
      from: {
        [translationType]: SCREEN_WIDTH * -0.18
      },
      to: {
        [translationType]: fromValue
      }
    };
  }

  setPastModal = visible => {
    this.setState({modalVisible:visible})
  }

  _signOutAsync = async () => {
      await  AsyncStorage.removeItem('userToken');
      this.props.navigation.navigate('AuthLoading');
    };

  render() {
    if(this.props.isFocused && !this.state.modalVisible){
      return (
        <QRCodeScanner
          showMarker
          onRead={this.onSuccess.bind(this)}
          cameraStyle={{ height: SCREEN_HEIGHT }}
          customMarker={
            <View style={styles.rectangleContainer}>
              <View style={styles.topOverlay}>
                <Text style={{ fontSize: 30, color: "white" ,textAlign:"center"}}>
                  Lütfen Masada Bulunan{"\n"} Qr Kodu Okutunuz
                </Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <View style={styles.leftAndRightOverlay} />

                <View style={styles.rectangle}>
                <Icon
                name="ios-qr-scanner"
                size={SCREEN_WIDTH * 0.7}
                color={iconScanColor}
                />
                <Animatable.View
                style={styles.scanBar}
                direction="alternate-reverse"
                iterationCount="infinite"
                duration={1700}
                easing="linear"
                animation={this.makeSlideOutTranslation(
                  "translateY",
                  SCREEN_WIDTH * -0.54
                )}
                />
                </View>

                <View style={styles.leftAndRightOverlay} />
              </View>



              <View style={styles.bottomOverlay}>

              <TouchableOpacity style={styles.pastbutton} onPress={()=>{this.setPastModal(true)}}>
                <Text style={{fontSize:18,fontWeight:'bold',color: myColors.lightText}}> Geçmişim </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.choicebutton3} onPress={this._signOutAsync}>
                <Text style={{fontSize:18,fontWeight:'bold',color: myColors.lightText}}>Çıkış Yap</Text>
              </TouchableOpacity>
              </View>

            </View>
          }
        />

      )
    }else if (this.state.modalVisible){
      return(<PastOrdersModal
        modalVisible={this.state.modalVisible}
        parentCallback={this.setPastModal}
      />)
    }
    else{
      return null;
    }

  }
}

const overlayColor = "rgba(0,0,0,0.5)"; // this gives us a black color with a 50% transparency

const rectDimensions = SCREEN_WIDTH * 0.65; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = SCREEN_WIDTH * 0.003; // this is equivalent to 2 from a 393 device width
const rectBorderColor = "red";

const scanBarWidth = SCREEN_WIDTH * 0.46; // this is equivalent to 180 from a 393 device width
const scanBarHeight = SCREEN_WIDTH * 0.0025; //this is equivalent to 1 from a 393 device width
const scanBarColor = "#a91101";

const iconScanColor = "rgb(45, 45, 45)";

const styles = {
  rectangleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },

  rectangle: {
    height: rectDimensions,
    width: rectDimensions,
    borderWidth: rectBorderWidth,
    borderColor: rectBorderColor,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },

  topOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    justifyContent: "center",
    alignItems: "center",
  },

  bottomOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    paddingBottom: SCREEN_WIDTH * 0.25,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  },

  leftAndRightOverlay: {
    height: SCREEN_WIDTH * 0.65,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor
  },

  scanBar: {
    width: scanBarWidth,
    height: scanBarHeight,
    backgroundColor: scanBarColor
  },
  choicebutton2:{
    flex:2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#a91101',
    marginTop:10,
    marginBottom:5,
    borderRadius:10,
    width:220
  },
  choicebutton3:{
    flex:0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: myColors.main,
    margin:10,
    borderRadius:10,
    width:150,

  },
  pastbutton:{
    flex:0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:myColors.mainComplementary,
    margin:10,
    borderRadius:10,
    width:150,
    marginTop:30
  }
};
export default withNavigationFocus(QrScreen);

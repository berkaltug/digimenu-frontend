import React, { Component } from "react";

import { View, Dimensions, Text ,TouchableOpacity, Modal} from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import Icon from "react-native-vector-icons/Ionicons";
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';

import * as Animatable from "react-native-animatable";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

console.disableYellowBox = true;

export default class QrCodeCamera extends Component {

  constructor(props){
    super(props);
    this.state = {
      modalVisible: false,
      qr_data: ''
    }
  }
  onSuccess(code) {
  //  this.setState({qr_data: code.data, modalVisible: true});
  alert(JSON.stringify(code.data));
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

  render() {
    return (
      <QRCodeScanner
        showMarker
        onRead={this.onSuccess.bind(this)}
        cameraStyle={{ height: SCREEN_HEIGHT }}
        customMarker={
          <View style={styles.rectangleContainer}>
            <View style={styles.topOverlay}>
              <Text style={{ fontSize: 30, color: "white" }}>
                Lütfen Masada Bulunan Qr Kodu Okutunuz
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
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Menu')}}
            style={{backgroundColor:'blue',padding:3,marginTop:6}}>
              <Text>Demo Button</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.choicebutton2} onPress={()=>{}}>
              <Text style={{fontSize: 26,fontWeight:'bold'}}>Restorana</Text>
              <Text style={{fontSize: 26,fontWeight:'bold'}}>Gidiyorum</Text>
              <Text>(Yapım Aşamasında)</Text>
            </TouchableOpacity>
            </View>
          </View>
        }
      />

    );
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
    textAlign:"center"
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
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#a91101',
    margin:20,
    borderRadius:10,
    width:220
  }
};

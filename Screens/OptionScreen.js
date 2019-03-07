import React, {Component} from 'react';
import {StyleSheet,View,Text,ScrollView,TouchableOpacity,Image} from 'react-native';
export default class OptionScreen extends Component{
  state={
  options:[
    {'option':'Hesap Ayarları'},
    {'option':'Geçmişim'},
    {'option':'Dil'},
    {'option':'Bildirim Ayarları'},
    {'option':'Yardım Merkezi'},
    {'option':'Sorun Bildir'},
    {'option':'Gizlilik İlkesi ve Kullanım Koşulları '},
    {'option':'Lisans'}
  ]
}

  render() {
      return(
        <View style={styles.container}>
        <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          >
            <Image
              style={{
                flex: 1,
                resizeMode:'repeat',
                backgroundColor:'rgb(164, 154, 83)'
              }}
              source={require('../Assets/foodpattern.png')}
            />
        </View>

              <ScrollView >
                {
                  this.state.options.map((item, index) => (
                   <View key = {item}>
                      <TouchableOpacity  style={styles.optionbutton} >
                        <Text>{item.option}</Text>
                      </TouchableOpacity>
                   </View>
                    ))
                }
              </ScrollView>
      </View>

    );

  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  optionbutton:{
    textAlign:'left',
    padding:13,
    marginLeft:17,
    marginRight:17,
    marginTop:7,
    backgroundColor:'rgb(236, 236, 236)',
    fontSize:14,
    borderRadius:10,
    borderWidth:1.2,
    borderColor:'black'
  }
})

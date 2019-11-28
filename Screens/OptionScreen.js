import React, {Component} from 'react';
import {StyleSheet,View,Text,ScrollView,TouchableOpacity,Image,AsyncStorage} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
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
_signOutAsync = async () => {
    await  AsyncStorage.removeItem('userToken');
    this.props.navigation.navigate('AuthLoading');
  };

  render() {
      return(
      <LinearGradient colors={['rgb(226, 54, 45)','rgb(245, 193, 153)']} style={{flex:1}}>
        <View style={styles.container}>
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

                   <TouchableOpacity  style={styles.optionbutton} onPress={this._signOutAsync} >
                     <Text>Çıkış Yap</Text>
                   </TouchableOpacity>

              </ScrollView>
      </View>
    </LinearGradient>
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

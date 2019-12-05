import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, Modal, TouchableHighlight, Image ,Switch,ScrollView} from 'react-native';
import userInstance from '../Globals/globalUser';
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
export default class ForgetPasswordScreen extends Component{
  constructor(props){
    super(props);
    this.state={
      modalVisible: false,
      user: userInstance,
      status: ' ',
      isLoading:false
    }
  }

  setIndicator(visible){
    this.setState({isLoading:visible});
  }

  setModal(visible){
    this.setState({modalVisible:visible});
  }

  render(){
    return(
    <LinearGradient colors={['rgb(226, 54, 45)','rgb(245, 193, 153)']} style={{flex:1}}>
      <View style={styles.container}>
      {/*Modal Section  -- ReactJS'de yorum satırı bu şekilde olmalıymış */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {}}>
          <ScrollView contentContainerStyle={styles.container}>
              <Text style={{fontSize:40,textAlign:'center'}}>{this.state.status}</Text>
              <Button
                title="Kapat"
                style = {{margin: 5,width:100}}
                onPress={() => {
                  this.setModal(false);
                }}
              />
          </ScrollView>
        </Modal>
        <TextInput
          placeholder = {"E-POSTA ADRESİNİZ"}
          placeholderTextColor='rgb(237, 237, 237)'
          style={styles.input}
          onChangeText={(data) => {this.state.user.email = data; }}
        />



        <Button
          buttonStyle = {{margin: 10, width:300,backgroundColor:'rgb(237, 75, 66)',borderRadius:10}}
          title="Gönder"
          loading={this.state.isLoading}
          disabled={this.state.isLoading}
          onPress={async () => {
            this.setIndicator(true);
            await this.state.user.forgetPassword().then( (res)=>{  this.setState({status:res})  });
            this.setModal(true);
            this.setIndicator(false);
          }}
        />

        <View style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <Button
              buttonStyle = {{margin: 10 , width:100,backgroundColor:'rgb(237, 75, 66)'}}
              title="Anasayfa"
              onPress={() => { this.props.navigation.navigate('Login') }}
            />
        </View>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {}}>
          <ScrollView style={styles.container}>
              <Text style={{fontSize:40,textAlign:'center'}}>{this.state.status}</Text>
              <Button
                buttonStyle = {{margin: 5,width:100}}
                title="Kapat"
                onPress={() => {
                  this.setModal(false);
                }}
            />
          </ScrollView>
        </Modal>
      </View>
    </LinearGradient>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  input:{
    width:300,
    height:35,
    borderColor:'rgb(237, 237, 237)',
    borderTopWidth:0,
    borderLeftWidth:0,
    borderRightWidth:0,
    borderBottomWidth:2,
    borderRadius:5,
    backgroundColor:'transparent',
    color:'rgb(237, 237, 237)',
    margin:5
  },
  buttons:{
    width:300,
    height:30,
    backgroundColor:'yellow',
    padding:5,
    alignItems:'center',
    borderRadius:5,
    borderWidth:2,
    borderColor:'gray',
    margin:5,

  }
});

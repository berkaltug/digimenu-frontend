import React, {Component} from 'react';
import {StyleSheet,View,Text,ScrollView,TouchableOpacity,Image,Modal,AsyncStorage,ActivityIndicator,Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {NavigationActions} from 'react-navigation';
import CartScreen from './CartScreen';
import cartInstance from '../Globals/globalCart';
import base64 from 'base-64';
import LinearGradient from 'react-native-linear-gradient';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import _ from 'lodash';

var sepet=[];

export default class MenuScreen extends Component{

  constructor(props){
    super(props);
    this.state={
      modalVisible:false,
      menuItem: [],
      menuArr:new Array(),
      isLoading:false
    }
  }

  //menuyu çek
  // _.groupBy lodash kütüphanesinde reduce fonk kullanan hazır bir fonk direk internetten bulduk
  async componentWillMount(){
    this.setState({menuArr: _.groupBy(await this.getItems(),'category')});
  }

  async getItems() {
    var URL=global.URL[0]+"//"+global.URL[2]+"/"+global.URL[3]+"/"+global.resNo;
    // console.log(URL);
    this.setState({isLoading:true});
    var token = await AsyncStorage.getItem('userToken');
    var tokenStr=JSON.parse(token);
    //console.log(token);
    const response= await fetch( URL , {
      method:'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + tokenStr,
      }
    })
    .then(function(res){
        return res.json();
    })
    .then(function(data){
        return data;
    });
    this.setState({isLoading:false});
    return response;

}

async getWaitress(){
  var URL=global.URL[0]+"//"+global.URL[2]+"/table_orders/garson/"+global.resNo+"/"+global.masaNo;
  var token = await AsyncStorage.getItem('userToken');
  var tokenStr=JSON.parse(token);
  await fetch(URL ,{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + tokenStr,
    }
  }).then(function(res){
        Alert.alert('İsteğiniz restoran ekranına iletildi');
  }).catch(function(err){
        Alert.alert('Sunucuda bir sorun oluştu');
  });
  }

  //calısmıyor
  componentWillReceiveProps(nextProps){
      this.forceUpdate();
  }

  shouldComponentUpdate(){
    return true;
  }

  setModal(visible){
    this.setState({modalVisible:visible});
  }


  render(){
    return(
    <LinearGradient colors={['rgb(226, 54, 45)','rgb(245, 193, 153)']} style={{flex:1}}>
      <View style={styles.container}>

      <ScrollView >
      <Image style={{width:300,height:128,margin:5}} source={require("../Assets/whitelogo.png")}/>
      <Text style={{fontSize:22,fontWeight:'bold',color:'rgb(237, 237, 237)'}}>Menü</Text>
      <ActivityIndicator animating={this.state.isLoading} size="large" color="#0000ff" />
      <TouchableOpacity onPress={()=>{this.getWaitress()}} style={styles.waitressbutton}>
        <Text style={{color:'rgb(203, 102, 102)'}}> Garson Çağır </Text>
      </TouchableOpacity>

      {
        Object.keys(this.state.menuArr).map((category,index)=>{
          return (
              <Collapse key={Math.floor(Math.random() * 10000) + 1}>
                <CollapseHeader key={Math.floor(Math.random() * 10000) + 1} style={styles.collapseHeader}>
                    <View key={Math.floor(Math.random() * 10000) + 1} >

                      <Text style={styles.categoryHeader}> {category} </Text>

                    </View>
                </CollapseHeader>
                <CollapseBody key={Math.floor(Math.random() * 10000) + 1}>
                {
                    this.state.menuArr[category].map((item,idx)=>{
                    return(

                        <View key={Math.floor(Math.random() * 10000) + 1} style={styles.optionbutton}>
                              <View key={Math.floor(Math.random() * 10000) + 1} style={{}}>
                                <Text key={Math.floor(Math.random() * 10000) + 1} style={{color:'rgb(237, 237, 237)',fontSize:18}}>{item.item}</Text>
                                <Text key={Math.floor(Math.random() * 10000) + 1} style={{color:'rgb(237, 237, 237)',fontSize:14}}>{item.ingredients}</Text>
                              </View>
                              <Text key={Math.floor(Math.random() * 10000) + 1} style={{color:'rgb(237, 237, 237)',fontSize:18,marginLeft:'auto'}}>{item.price} ₺</Text>
                              <TouchableOpacity key={Math.floor(Math.random() * 10000) + 1} style={styles.addbutton} onPress={
                                  ()=>{this.setModal(true);
                                    var menuitem={id:item.id,
                                      item:item.item,
                                      ingredients:item.ingredients,
                                      price:item.price,
                                      category:item.category};


                                      global.cart.push(menuitem);
                                      console.log(item.item);
                                      this.setState({menuItem:global.cart});
                                    }}>
                                  <Text key={Math.floor(Math.random() * 10000) + 1}> <Icon name='plus' color='#d7263d'/> </Text>
                                </TouchableOpacity>
                            </View>

                    );
                  }
                )
               }

               </CollapseBody>
              </Collapse>
            )
         }
       )
    }

            </ScrollView>
      <Modal
      animationType="slide"
      transparent={false}
      visible={this.state.modalVisible}
      onRequestClose={() => {}}>
      <View style={styles.container}>
        <Text style={{fontSize:40}}>{this.state.menuItem.name}</Text>
        <View style={styles.addcontainer}>
        <Text style={{fontSize:25,fontWeight:'bold',flex:1,margin:3,textAlign:'center'}}>Sepete Eklemek İstediğinizden Emin Misiniz ?</Text>
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-around',margin:3}}>

            <TouchableOpacity style={styles.addcontainerbutton2}
             onPress={()=>{
               this.setModal(false);
               // en son ekleneni globalden çıkar
               global.cart.pop();
             }}>
            <Text style={{fontSize:16}}>İptal</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.addcontainerbutton}
            onPress={() => {
              this.setModal(false);
              this.props.navigation.dispatch(NavigationActions.setParams({
			             params: { mycart: this.state.menuItem },
			                key: "Cart",
                    }));
            }}>
            <Text style={{fontSize:16}}>Sepete Ekle</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
  optionbutton:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    width:320,
    elevation:4,
    backgroundColor:'darkgray',
    margin:5,
    padding:2,
    height:50
  },
  collapseHeader:{
    flex:1,
    alignItems:'center',
    width:320,
    elevation:4,
    backgroundColor:'rgb(105, 105, 105)',
    margin:5,
    padding:2
  },
  categoryHeader:{
    fontSize:19,
    fontStyle:'italic',
    color:'rgb(237, 237, 237)',
  },
  addbutton:{
    backgroundColor:'rgb(237, 237, 237)',
    elevation:12,
    margin:3,
    padding:3,
    borderRadius:50,
    width:26,
    height:26,
    justifyContent:'center',
    alignItems:'center'
  },
  addcontainer:{
    flex:1/3,
    backgroundColor:'#f4f2cb',
    borderWidth:2,
    borderRadius:10,
    borderColor:'grey',
    justifyContent:'space-between',
    width:350
  },
  addcontainerbutton:{
    width:90,
    height:40,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#95f98e',
    borderRadius:3
  },
  addcontainerbutton2:{
    width:90,
    height:40,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'tomato',
    borderRadius:3
  },
  waitressbutton:{
    width:320,
    height:40,
    backgroundColor:'rgb(249, 244, 147)',
    elevation:8,
    justifyContent:'center',
    alignItems:'center',
    margin:5,
    padding:2
  }

});

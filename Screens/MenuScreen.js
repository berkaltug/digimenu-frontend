import React, {Component} from 'react';
import {StyleSheet,View,Text,ScrollView,TouchableOpacity,Image,Modal,AsyncStorage,ActivityIndicator,Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MenuItem from '../MenuItem';
import {NavigationActions} from 'react-navigation';
import CartScreen from './CartScreen';
import cartInstance from '../Globals/globalCart';
import base64 from 'base-64';
import LinearGradient from 'react-native-linear-gradient';

// var menuArray=new Array(
//   new MenuItem(1,"Ciğer şiş","dana ciğer,soğan,biber,domates",21,"yemek"),
//   new MenuItem(2,"Ciğer Şiş Dürüm","dana ciğer,soğan,biber,domates,lavaş",15,"yemek"),
//   new MenuItem(3,"Et Şiş","dana et,soğan,biber,domates",25,"yemek"),
//   new MenuItem(4,"Adana Kebap","dana et,soğan,biber,domates",21,"yemek"),
//   new MenuItem(5,"Urfa Kebap","dana et,soğan,biber,domates",21,"yemek"),
//   new MenuItem(6,"Beyti","dana et,soğan,biber,domates,yoğurt",24,"yemek"),
//   new MenuItem(7,"Tavuk Kanat","tavuk eti,soğan,biber,domates,yoğurt",14,"yemek"),
//   new MenuItem(8,"Tavuk Şiş","tavuk eti,soğan,biber,domates,yoğurt",14,"yemek"),
//   new MenuItem(9,"Kaşarlı Pide","kaşar,biber,yoğurt",17,"yemek"),
//   new MenuItem(10,"Kıymalı Pide","dana kıyma,biber,yoğurt",19,"yemek"),
//   new MenuItem(11,"Karışık Pide","dana kıyma,kaşar,biber,yoğurt",21,"yemek"),
//   new MenuItem(12,"Ayran","",3,"icecek"),
//   new MenuItem(13,"Coca-Cola","",5,"icecek"),
//   new MenuItem(14,"Fanta","",5,"icecek"),
//   new MenuItem(15,"Şalgam","",4,"icecek"),
// );
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
  async componentWillMount(){
    this.setState({menuArr: await this.getItems()});
    console.log(this.state.menuArr);
    console.log('willmount cagrıldııı');
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
      // console.log('----------------------------------------------------------------');
      // console.log(JSON.stringify(res));
      return res.json();
    })
    .then(function(data){
      // console.log('-----------------------------------------------------');
      // console.log(data);
      return data;
    });
    // console.log('-----------------------------------------------------');
    // console.log(response);
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
      //this.state.sepetim.push(this.props.navigation.getParam('mycart'));
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
        <Text> Garson Çağır </Text>
      </TouchableOpacity>
      {
      this.state.menuArr.map((item,index)=>{
          //her türlü itemi yazdır şu anlık
          if(true){
            return(
              <View key={Math.floor(Math.random() * 10000) + 1} style={styles.optionbutton}>
              <View key={Math.floor(Math.random() * 10000) + 1} style={{}}>
              <Text key={Math.floor(Math.random() * 10000) + 1} style={{color:'rgb(237, 237, 237)',fontSize:18}}>{item.item}</Text>
              <Text key={Math.floor(Math.random() * 10000) + 1} style={{color:'rgb(237, 237, 237)',fontSize:14}}>{item.ingredients}</Text>
              </View>
              <Text key={Math.floor(Math.random() * 10000) + 1} style={{color:'rgb(237, 237, 237)',fontSize:18,marginLeft:'auto'}}>{item.price} ₺</Text>
              <TouchableOpacity key={index} style={styles.addbutton} onPress={
                    ()=>{this.setModal(true);
                    var menuitem={id:item.id,
                    item:item.item,
                    ingredients:item.ingredients,
                    price:item.price,
                    category:item.category};

                    console.log('before');
                    console.log(global.cart);
                    global.cart.push(menuitem);
                    console.log('after');
                    console.log(global.cart);
                    this.setState({menuItem:global.cart});
                  }}>
                  <Text key={Math.floor(Math.random() * 10000) + 1}> <Icon name='plus' color='#d7263d'/> </Text>
                  </TouchableOpacity>
                  </View>
                );
              }
              if(item.type == "icecek"){
                return(
                  <View key={Math.floor(Math.random() * 10000) + 1} style={styles.optionbutton}>

                  <Text key={Math.floor(Math.random() * 10000) + 1} style={{fontSize:18}}>{item.name}</Text>

                  <Text key={Math.floor(Math.random() * 10000) + 1} style={{fontSize:19,marginLeft:'auto'}}>{item.price} ₺</Text>
                  <TouchableOpacity key={index}
                    style={styles.addbutton} onPress={()=>{
                      this.setModal(true);
                      var menuitem={id:item.id,
                      item:item.item,
                      ingredients:item.ingredients,
                      price:item.price,
                      category:item.category};
                      global.cart.push(menuitem);
                      this.setState({menuItem:global.cart});
                  }}>
                  <Text key={Math.floor(Math.random() * 10000) + 1} > <Icon name='plus' color='white'/> </Text>
                  </TouchableOpacity>
                  </View>
                );
              }

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

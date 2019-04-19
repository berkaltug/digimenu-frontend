import React, {Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Modal,Image,AsyncStorage,ActivityIndicator} from 'react-native';
import MenuScreen from './MenuScreen';
import {NavigationActions} from 'react-navigation';
import cartInstance from '../Globals/globalCart';
export default class CartScreen extends Component{

  constructor(props){
    super(props);
    this.state={
      sepetim:[],
      totalbill:0,
      modalVisible:false,
      isLoading:false
    };
  }



componentWillReceiveProps(nextProps){
    //this.state.sepetim.push(this.props.navigation.getParam('mycart'));
    this.forceUpdate();
}

shouldComponentUpdate(){
  return true;
}

async sendOrder(){
  var URL=global.URL[0]+"//"+global.URL[2]+"/table_orders/"+global.resNo+"/"+global.masaNo;
  var token = await AsyncStorage.getItem('userToken');
  var tokenStr=JSON.parse(token);
  console.log(URL);
  this.setState({isLoading:true});
  await fetch(URL, {
    method: 'POST',
    headers: {
      'Accept' : 'application/json',
      'Content-Type': 'application/json',
      'Authorization' : 'Basic ' + tokenStr
    },
    body: JSON.stringify( this.state.sepetim ),
  });
 this.setState({isLoading:false});
}

  render(){
    this.state.sepetim=this.props.navigation.getParam('mycart');
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
        <Text style={{fontSize:30,fontWeight:'bold',marginRight:'auto',marginLeft:20,color:'black'}}>Sepetim</Text>
        <View style={styles.sepet}>
        {
          cart.map((item,index)=>{
            console.log('cart screen cart');
            console.log(global.cart);
            return (<View key={Math.floor(Math.random() * 10000) + 1} style={styles.cartrow}>
            <Text key={Math.floor(Math.random() * 10000) + 1} style={{fontSize:23}}>{item.item}</Text>
            <Text key={Math.floor(Math.random() * 10000) + 1} style={{fontSize:23,marginLeft:'auto'}}>{item.price} ₺</Text>
            </View>
          );
        })
        }
        </View>
        <ActivityIndicator animating={this.state.isLoading} size="large" color="#0000ff" />
        <View style={{flex:1/2,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        <TouchableOpacity style={styles.sepetbosaltbutton} onPress={()=>{
          global.cart=[];
          this.setState({sepetim:global.cart});

        }}>
        <Text style={{fontSize:17}}>Sepeti Boşalt</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sepetonaybutton} onPress={  ()=>{
          if(global.cart.length==0){
            alert('Sepetiniz Boş');
          }else{
            global.cart=[];
            this.sendOrder();
            this.setState({modalVisible:true,sepetim:global.cart});
          }
        }}>
          <Text style={{fontSize:17}}>Sipariş Ver</Text>
        </TouchableOpacity>
        </View>


        <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {}}>
          <View style={styles.container}>
            <Text style={{fontSize:40}}>Sipariş Başarılı</Text>
            <TouchableOpacity style={{margin:50,width:90,height:40,backgroundColor:'tomato',
            justifyContent:'center',alignItems:'center',borderRadius:10}} onPress={()=>{this.setState({modalVisible:false})}}>
              <Text style={{fontSize:17}}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFBAF',
  },
  sepet:{
    flex:1/2,
    backgroundColor:'rgb(236, 236, 236)',
    borderRadius:10,
    borderColor:'black',
    borderWidth:3,
    width:350
  },
  cartrow:{
    flexDirection:'row',
    marginTop:4,
  },
  sepetonaybutton:{
    width:110,
    height:45,
    fontSize:20,
    borderRadius:5,
    borderColor:'rgb(31, 31, 31)',
    borderWidth:2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#95f98e',
    margin:10
  },
  sepetbosaltbutton:{
    width:110,
    height:45,
    fontSize:20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'tomato',
    borderRadius:5,
    borderColor:'rgb(31, 31, 31)',
    borderWidth:2,
    margin:10
  }
});

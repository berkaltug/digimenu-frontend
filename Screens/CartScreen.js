import React, {Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Modal,Image} from 'react-native';
import MenuScreen from './MenuScreen';
import {NavigationActions} from 'react-navigation';
export default class CartScreen extends Component{

  constructor(props){
    super(props);
    this.state={
      sepetim:[],
      totalbill:0,
      modalVisible:false
    };
    gecici=this.props.navigation.getParam('mycart');
    if(gecici==null){
      this.state.sepetim=[];
    }else{
      this.state.sepetim=gecici;
    }
  }

componentWillReceiveProps(nextProps){
    //this.state.sepetim.push(this.props.navigation.getParam('mycart'));
    this.forceUpdate();
}

shouldComponentUpdate(){

  return true;
}


componentWillUpdate(){
  //let item=this.props.navigation.getParam('mycart');
  //this.state.sepetim.push(item);
  this.state.sepetim=this.props.navigation.getParam('mycart');
}
// componentDidMount(){
//   //let item=this.props.navigation.getParam('mycart');
//   //this.state.sepetim.push(item);
//   this.state.sepetim=this.props.navigation.getParam('mycart');
// }
// calculateBill(){
//   let bill=this.state.sepetim.map((item,index)=>{this.state.totalbill+=item.price;});
//
// }

  render(){
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
          this.state.sepetim.map((item,index)=>{return (<View key={index} style={styles.cartrow}>
          <Text key={index} style={{fontSize:23}}>{item.name}</Text>
          <Text key={index} style={{fontSize:23,marginLeft:'auto'}}>{item.price} ₺</Text>
        </View>
      );
    })
  }
        </View>

        <View style={{flex:1/2,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        <TouchableOpacity style={styles.sepetbosaltbutton} onPress={()=>{
          let x=[];
          this.setState({sepetim:x});
          console.log(this.state.sepetim);
          this.props.navigation.dispatch(NavigationActions.setParams({
            params: { mycart2: x },
            key: "Menu",
          }));
        }}>
        <Text style={{fontSize:17}}>Sepeti Boşalt</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sepetonaybutton} onPress={()=>{
          let x=[];
          this.setState({sepetim:x,modalVisible:true});
        this.props.navigation.dispatch(NavigationActions.setParams({
  			             params: { mycart2: x },
  			                key: "Menu",
                      }));
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

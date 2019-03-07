import React, {Component} from 'react';
import {StyleSheet,View,Text,ScrollView,TouchableOpacity,Image,Modal} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MenuItem from '../MenuItem';
import {NavigationActions} from 'react-navigation';
import CartScreen from './CartScreen';
var menuArray=new Array(
  new MenuItem(1,"Ciğer şiş","dana ciğer,soğan,biber,domates",21,"yemek"),
  new MenuItem(2,"Ciğer Şiş Dürüm","dana ciğer,soğan,biber,domates,lavaş",15,"yemek"),
  new MenuItem(3,"Et Şiş","dana et,soğan,biber,domates",25,"yemek"),
  new MenuItem(4,"Adana Kebap","dana et,soğan,biber,domates",21,"yemek"),
  new MenuItem(5,"Urfa Kebap","dana et,soğan,biber,domates",21,"yemek"),
  new MenuItem(6,"Beyti","dana et,soğan,biber,domates,yoğurt",24,"yemek"),
  new MenuItem(7,"Tavuk Kanat","tavuk eti,soğan,biber,domates,yoğurt",14,"yemek"),
  new MenuItem(8,"Tavuk Şiş","tavuk eti,soğan,biber,domates,yoğurt",14,"yemek"),
  new MenuItem(9,"Kaşarlı Pide","kaşar,biber,yoğurt",17,"yemek"),
  new MenuItem(10,"Kıymalı Pide","dana kıyma,biber,yoğurt",19,"yemek"),
  new MenuItem(11,"Karışık Pide","dana kıyma,kaşar,biber,yoğurt",21,"yemek"),
  new MenuItem(12,"Ayran","",3,"icecek"),
  new MenuItem(13,"Coca-Cola","",5,"icecek"),
  new MenuItem(14,"Fanta","",5,"icecek"),
  new MenuItem(15,"Şalgam","",4,"icecek"),
);
var sepet=[];
export default class MenuScreen extends Component{

  constructor(props){
    super(props);
    this.state={
      modalVisible:false,
      menuItem:[],
      menuItemAmount:0,
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
    let x=this.props.navigation.getParam('mycart2');
    if(x==[]){
      this.state.menuItem=x;
    }
}
  setModal(visible){
    this.setState({modalVisible:visible});
  }

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
      <ScrollView >
      <Image style={{width:300,height:128,margin:5}} source={require("../Assets/aydın-ciğerci.png")}/>
      <Text style={{fontSize:22,fontWeight:'bold',color:'black'}}>Menü</Text>

      {
        menuArray.map((item,index)=>{
          if(item.type=="yemek"){
            return(
              <View key={index} style={styles.optionbutton}>
              <View key={index} style={{}}>
              <Text key={index} style={{fontSize:18}}>{item.name}</Text>
              <Text key={index} style={{fontSize:14}}>{item.ingredients}</Text>
              </View>
              <Text key={index} style={{fontSize:18,marginLeft:'auto'}}>{item.price} ₺</Text>
              <TouchableOpacity key={index} style={styles.addbutton} onPress={()=>{this.setModal(true);
                  var menuitem={itemId:item.itemId,
                    name:item.name,
                    ingredients:item.ingredients,
                    price:item.price,
                    type:item.type};
                    sepet.push(menuitem);
                    this.setState({menuItem:sepet});
                  }}>
                  <Text key={index}> <Icon name='plus' color='white'/> </Text>
                  </TouchableOpacity>
                  </View>
                );
              }
              if(item.type=="icecek"){
                return(
                  <View key={index} style={styles.optionbutton}>

                  <Text key={index} style={{fontSize:18}}>{item.name}</Text>

                  <Text key={index} style={{fontSize:19,marginLeft:'auto'}}>{item.price} ₺</Text>
                  <TouchableOpacity key={index} style={styles.addbutton} onPress={()=>{
                      this.setModal(true);
                      var menuitem={itemId:item.itemId,
                      name:item.name,
                      ingredients:item.ingredients,
                      price:item.price,
                      type:item.type};
                      sepet.push(menuitem);
                      this.setState({menuItem:sepet});

                  }}>
                  <Text key={index} > <Icon name='plus' color='white'/> </Text>
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
             onPress={()=>this.setModal(false)}>
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
  optionbutton:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    width:320,
    borderRadius:5,
    borderWidth:2,
    borderColor:'rgb(31, 31, 31)',
    backgroundColor:'rgb(236, 236, 236)',
    margin:5,
    padding:2,
    height:50
  },
  addbutton:{
    backgroundColor:'tomato',
    margin:3,
    padding:3,
    color:'white',
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
  }

});

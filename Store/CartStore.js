import mobx, { observable , action } from "mobx";

class CartStore{
  @observable cart=[];
  @observable menuItem={};

  @action pushCart=(item,count)=>{
      for(let i=0;i<count;i++){
      this.cart.push(item)
      }
  }

  @action removeItem = (item)=>{
      let index = this.cart.indexOf(item);
      this.cart.splice(index, 1);
  }

  @action flushCart = () => { this.cart=[] }

  @action setMenuItem = (obj) => { this.menuItem=obj }

}

const cartStore= new CartStore();
export default cartStore;

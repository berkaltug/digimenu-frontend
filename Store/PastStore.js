import mobx, { observable , action } from "mobx";

class PastStore{
  @observable clickedRestaurantName;
  @observable clickedRestaurantId;
  @observable clickedPastOrderList=[];

  @action setClickedRestaurantId=(id)=>{
    this.clickedRestaurantId=id;
  }

  @action setClickedRestaurantName=(name)=>{
    this.clickedRestaurantName=name;
  }

  @action setClickedPastOrderList=(arr)=>{
    this.clickedPastOrderList=arr;
  }
}

const pastStore = new PastStore();
export default pastStore;

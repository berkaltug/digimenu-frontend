import mobx, { observable , action } from "mobx";

class CounterStore{
  @observable count=1;

  @action
  setCount=(value)=>{this.count=value}


}

const counterStore= new CounterStore();
export default counterStore;

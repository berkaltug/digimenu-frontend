import mobx, { observable, action } from "mobx";

class RatingStore {
  @observable tupleList = new Array();

  @action setTupleList = arr => {
    this.tupleList = arr;
  };

  @action addTuple = tuple => {
    const oldtuple = this.tupleList.find(
      item => item.itemName === tuple.itemName
    );
    if (oldtuple !== undefined) {
      let index = this.tupleList.indexOf(oldtuple);
      this.tupleList.splice(index, 1);
      this.tupleList.push(tuple);
    } else {
      this.tupleList.push(tuple);
    }
  };
}

const ratingStore = new RatingStore();
export default ratingStore;

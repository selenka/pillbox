import { makeObservable, observable, action } from 'mobx';
let index = 0;
// const mock = [
//   { id: 11, label: '2' },
//   { id: 12, label: '2' },
//   { id: 13, label: '2' },
//   { id: 14, label: '2' },
//   { id: 19, label: '2' },
//   { id: 15, label: '2' },
//   { id: 16, label: '2' },
//   { id: 17, label: '2' },
//   { id: 18, label: '2' },
//   { id: 20, label: '2' },
//   { id: 21, label: '2' },
//   { id: 22, label: '2' },
// ];
class PillsStore {
  pills = [];
  constructor() {
    makeObservable(this, {
      pills: observable,
      addNewPill: action,
      removePill: action,
    });
  }

  addNewPill(pill = {}) {
    pill.id = index;
    this.pills = [...this.pills, pill];
    index++;
  }

  removePill(id) {
    this.pills = this.pills.filter((p) => p.id !== id);
  }
}

export default new PillsStore();

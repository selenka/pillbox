import React from 'react';
import { makeObservable, observable, action } from 'mobx';

class PillsStore {
    pills = [];
    constructor() {
        makeObservable(this, {
            pills: observable,
            addNewPill: action,
        });
    }

    addNewPill (pill = {}) {
        console.log(' action addNewPill', pill)
        this.pills.push(pill)
    }

}

export default new PillsStore();

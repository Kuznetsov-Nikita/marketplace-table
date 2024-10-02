class Item {
    constructor(itemsData) {
        for (let key in itemsData) {
            this[key] = itemsData[key];
        } 
    }
}

export default Item;

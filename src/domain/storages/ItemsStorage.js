class ItemsStorage {
    constructor() {
        this.items = [];
        this.listeners = [];
    }

    updateItems(items) {
        this.items = items;
        this.notifyListeners();
    }

    addListener(listener) {
        this.listeners.push(listener);
    }

    removeListener(listener) {
        this.listeners.splice(this.listeners.indexOf(listener), 1);
    }

    notifyListeners() {
        this.listeners.forEach((listener) => listener.onItemsChanged());
    }
}

export default ItemsStorage;

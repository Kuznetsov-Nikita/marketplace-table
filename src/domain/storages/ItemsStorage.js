class ItemsStorage {
    constructor() {
        this.items = [];
        this.listeners = [];
        this.pages = 0;
        this.page = 0;
    }

    updateItems(items, pages, page) {
        this.items = items;
        this.pages = pages;
        this.page = page;
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

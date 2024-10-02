class TableBloc {
    constructor(fieldsInfoStorage, itemsStorage) {
        this.fieldsInfoStorage = fieldsInfoStorage;
        this.itemsStorage = itemsStorage;

        this.fields = fieldsInfoStorage.getAllFieldsInfo();
        this.activeFields = this.fields;

        this.fieldsInfoStorage.addListener(this);
        this.itemsStorage.addListener(this);
    }

    attachView = (view) => {
        this.view = view;
    };

    detachView = () => {
        this.view = undefined;
    };

    notifyViewAboutChanges = () => {
        if (this.view) {
          this.view.onBlocChanged();
        }
    };

    onFieldsInfoChanged = () => {
        this.fields = this.fieldsInfoStorage.getAllFieldsInfo();
        this.activeFields = this.fields;
        this.notifyViewAboutChanges();
    };
    
    onItemsChanged = () => {
        this.notifyViewAboutChanges();
    };

    onActiveFieldsChanged = (activeFields) => {
        this.activeFields = activeFields;
        this.notifyViewAboutChanges();
    }
}

export default TableBloc;

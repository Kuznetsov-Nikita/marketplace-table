import { ITEMS_PER_PAGE } from "../../core/constants";

class TableBloc {
    constructor(fieldsInfoStorage, itemsStorage, filtersStorage, searchByFieldsUseCase) {
        this.fieldsInfoStorage = fieldsInfoStorage;
        this.itemsStorage = itemsStorage;
        this.filtersStorage = filtersStorage;
        this.searchByFieldsUseCase = searchByFieldsUseCase;

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

    changeActiveFields = (activeFields) => {
        this.activeFields = activeFields;
        this.notifyViewAboutChanges();
    };

    onPageClick = async (page) => {
        await this.searchByFieldsUseCase.searchByFields(this.filtersStorage.filters, ITEMS_PER_PAGE * (page - 1))
    }
}

export default TableBloc;

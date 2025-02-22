import FilterBloc from "./FilterBloc";
import Filter from "../../domain/entities/Filter";

class FiltersBloc {
    constructor(fieldsInfoStorage, filtersStorage, searchByFieldsUseCase) {
        this.fieldsInfoStorage = fieldsInfoStorage;
        this.filtersStorage = filtersStorage;
        this.searchByFieldsUseCase = searchByFieldsUseCase;

        let fields = fieldsInfoStorage.getAllFieldsInfo();
        this.filters = fields.filter((field) => field.name !== 'code')
                             .map((fieldInfo) => new FilterBloc(fieldInfo));

        this.fieldsInfoStorage.addListener(this);
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
        let fields = this.fieldsInfoStorage.getAllFieldsInfo();
        this.filters = fields.filter((field) => field.name !== 'code')
                             .map((fieldInfo) => new FilterBloc(fieldInfo));

        this.notifyViewAboutChanges();
    };

    onSearchButtonClick = async () => {
        let filtersInfo = this.filters.map(
            (filter) => {
                let values;
                if (filter.value) {
                    values = [Number(filter.value)];
                } else {
                    values = filter.values;
                }

                return new Filter(
                    filter.fieldInfo.name, 
                    values,
                    filter.fromValue !== null && filter.fromValue !== undefined
                        ? Number(filter.fromValue) : filter.fromValue,
                    filter.toValue !== null && filter.toValue !== undefined 
                        ? Number(filter.toValue) : filter.toValue,
                    filter.containsString
                );
            }
        );

        this.filtersStorage.updateFilters(filtersInfo);
        await this.searchByFieldsUseCase.searchByFields(filtersInfo, 0);
    };
}

export default FiltersBloc;

class SearchByCodeBloc {
    constructor(searchByCodeUseCase) {
        this.searchByCodeUseCase = searchByCodeUseCase;

        this.code = '';
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

    onCodeChanged = (code) => {
        this.code = code;
        this.notifyViewAboutChanges();
    };

    onSearchButtonClick = async () => {
        await this.searchByCodeUseCase.searchByCode(parseInt(this.code));
    };
}

export default SearchByCodeBloc;

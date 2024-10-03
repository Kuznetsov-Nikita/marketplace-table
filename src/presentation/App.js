import ItemsRepository from '../data/ItemsRepository';
import FieldsInfoStorage from '../domain/storages/FieldsInfoStorage';
import ItemsStorage from '../domain/storages/ItemsStorage';
import GetFieldsUseCase from '../domain/use-cases/GetFieldsUseCase';
import SearchByCodeUseCase from '../domain/use-cases/SearchByCodeUseCase';
import SearchByFieldsUseCase from '../domain/use-cases/SearchByFieldsUseCase';
import './App.css';
import FiltersBloc from './blocs/FiltersBloc';
import SearchByCodeBloc from './blocs/SearchByCodeBloc';
import TableBloc from './blocs/TableBloc';
import FiltersComponent from './components/filters/FiltersComponent';
import SearchByCodeComponent from './components/search-by-code/SearchByCodeComponent';
import TableComponent from './components/table/TableComponent';

function App() {
    const itemsRepository = new ItemsRepository();

    const fieldsInfoStorage = new FieldsInfoStorage();
    const itemsStorage = new ItemsStorage();
    const getFieldsUseCase = new GetFieldsUseCase(itemsRepository, fieldsInfoStorage);
    const searchByCodeUseCase = new SearchByCodeUseCase(itemsRepository, itemsStorage);
    const searchByFieldsUseCase = new SearchByFieldsUseCase(itemsRepository, itemsStorage);

    getFieldsUseCase.getFields();

    const searchByCodeBloc = new SearchByCodeBloc(searchByCodeUseCase);
    const tableBloc = new TableBloc(fieldsInfoStorage, itemsStorage);
    const filtersBloc = new FiltersBloc(fieldsInfoStorage, searchByFieldsUseCase);

    return (
        <div className="App">
            <FiltersComponent filtersBloc={filtersBloc}/>
            <div className="table-container">
                <SearchByCodeComponent searchByCodeBloc={searchByCodeBloc}/>
                <TableComponent tableBloc={tableBloc}/>
            </div>
        </div>
    );
}

export default App;

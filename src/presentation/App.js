import ItemsRepository from '../data/ItemsRepository';
import FieldsInfoStorage from '../domain/storages/FieldsInfoStorage';
import ItemsStorage from '../domain/storages/ItemsStorage';
import GetFieldsUseCase from '../domain/use-cases/GetFieldsUseCase';
import SearchByCodeUseCase from '../domain/use-cases/SearchByCodeUseCase';
import './App.css';
import SearchByCodeBloc from './blocs/SearchByCodeBloc';
import TableBloc from './blocs/TableBloc';
import SearchByCodeComponent from './components/SearchByCodeComponent';
import TableComponent from './components/TableComponent';

function App() {
  const itemsRepository = new ItemsRepository();

  const fieldsInfoStorage = new FieldsInfoStorage();
  const itemsStorage = new ItemsStorage();
  const getFieldsUseCase = new GetFieldsUseCase(itemsRepository, fieldsInfoStorage);
  const searchByCodeUseCase = new SearchByCodeUseCase(itemsRepository, itemsStorage);

  getFieldsUseCase.getFields();

  const searchByCodeBloc = new SearchByCodeBloc(searchByCodeUseCase);
  const tableBloc = new TableBloc(fieldsInfoStorage, itemsStorage);

  return (
    <div className="App">
        <SearchByCodeComponent searchByCodeBloc={searchByCodeBloc}/>
        <TableComponent tableBloc={tableBloc}/>
    </div>
  );
}

export default App;

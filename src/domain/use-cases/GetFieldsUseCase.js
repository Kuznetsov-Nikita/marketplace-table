class GetFieldsUseCase {
    constructor(itemsRepository, fieldsInfoStorage) {
        this.itemsRepository = itemsRepository;
        this.fieldsInfoStorage = fieldsInfoStorage;
    }

    async getFields() {
        let fieldsInfo = await this.itemsRepository.getFields();
        this.fieldsInfoStorage.updateFieldsInfo(fieldsInfo);
    }
}

export default GetFieldsUseCase;

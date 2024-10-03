class SearchByFieldsUseCase {
    constructor(itemsRepository, itemsStorage) {
        this.itemsRepository = itemsRepository;
        this.itemsStorage = itemsStorage;
    }

    async searchByFields(filters, offset) {
        let response = await this.itemsRepository.searchByFields(filters, offset);
        this.itemsStorage.updateItems(response.items, response.pages, response.page);
    }
}

export default SearchByFieldsUseCase;

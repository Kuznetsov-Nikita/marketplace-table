class SearchByCodeUseCase {
    constructor(itemsRepository, itemsStorage) {
        this.itemsRepository = itemsRepository;
        this.itemsStorage = itemsStorage;
    }

    async searchByCode(code) {
        let found;
        try {
            found = await this.itemsRepository.searchByCode(code);
            this.itemsStorage.updateItems([found], 1, 1);
        } catch(err) {
            found = null;
            this.itemsStorage.updateItems([], 0, 0);
        }
    }
}

export default SearchByCodeUseCase;

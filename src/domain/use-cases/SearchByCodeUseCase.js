class SearchByCodeUseCase {
    constructor(itemsRepository, itemsStorage) {
        this.itemsRepository = itemsRepository;
        this.itemsStorage = itemsStorage;
    }

    async searchByCode(code) {
        let found;
        try {
            found = await this.itemsRepository.searchByCode(code);
            this.itemsStorage.updateItems([found]);
        } catch(err) {
            found = null;
            this.itemsStorage.updateItems([]);
        }

        return found;
    }
}

export default SearchByCodeUseCase;

import { ITEMS_PER_PAGE, RESPONSE_TIMEOUT } from "../core/constants";
import fieldsData from "../assets/fields.json";
import itemsData from "../assets/items.json";
import Item from "../domain/entities/Item";
import FieldsInfo from "../domain/entities/FieldsInfo";
import SearchByFieldsResponse from "../domain/entities/SearchByFieldsResponse";

class ItemsRepository {
    getFields() {
        return new Promise((resolve, _reject) => setTimeout(
            () => resolve(new FieldsInfo(fieldsData)), 
            RESPONSE_TIMEOUT
        ));
    }

    searchByCode(code) {
        let found = itemsData.items.find((item) => item.code === code);

        return new Promise((resolve, reject) => setTimeout(
            () => {
                if (found === undefined) {
                    reject(new Error('Not found'));
                }
                resolve(new Item(found));
            },
            RESPONSE_TIMEOUT
        ));
    }

    searchByFields(filters, offset) {
        let found = itemsData.items;

        for (let i = 0; i < filters.length; ++i) {
            let filter = filters[i];
            let fieldName = filter.fieldName;

            if (filter.values) {
                found = found.filter((item) => 
                    filter.values.includes(item[fieldName])
                );
            }
            if (filter.rangeFrom) {
                found = found.filter((item) => 
                    item[fieldName] >= filter.rangeFrom
                );
            }
            if (filter.rangeTo) {
                found = found.filter((item) => 
                    item[fieldName] <= filter.rangeTo
                );
            }
            if (filter.containsString) {
                found = found.filter((item) => 
                    item[fieldName].toLowerCase()
                        .includes(filter.containsString.toLowerCase())
                );
            }
        }

        let pages = Math.ceil(found.length / ITEMS_PER_PAGE);
        let page = Math.floor(offset / ITEMS_PER_PAGE);

        found = found
            .slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

        return new Promise((resolve, _reject) => setTimeout(
            () => resolve(new SearchByFieldsResponse(
                found.map((item) => new Item(item)), pages, page + 1
            )),
            RESPONSE_TIMEOUT
        ));
    }
}

export default ItemsRepository;

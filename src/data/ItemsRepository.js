import { RESPONSE_TIMEOUT } from "../core/constants";
import fieldsData from "../assets/fields.json";
import itemsData from "../assets/items.json";
import Item from "../domain/entities/Item";
import FieldsInfo from "../domain/entities/FieldsInfo";

class ItemsRepository {
    getFields() {
        return new Promise((resolve, _reject) => 
            setTimeout(
                () => resolve(new FieldsInfo(fieldsData)), 
                RESPONSE_TIMEOUT
            )
        );
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
}

export default ItemsRepository;

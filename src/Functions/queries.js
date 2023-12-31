import { URL_PRODUCTS, QUERY_KEY_PRODUCTS, URL_CATEGORIES, QUERY_KEY_CATEGORIES } from "../Constanst/constant";
import { useQuery } from "react-query";

export function getCategories() {
    const query = useQuery(QUERY_KEY_CATEGORIES, async () => {
    const res = await fetch(URL_CATEGORIES);
    const json = await res.json();

    if (json.error) {
        throw new Error(json.error);
    }

    return json;
});
return query;
}

export function getProducts(filter) {
const query = useQuery([QUERY_KEY_PRODUCTS, filter], async () => {
    const urlFetch = filter ? URL_PRODUCTS + filter : URL_PRODUCTS;
    const res = await fetch(urlFetch);
    const json = await res.json();

    if (json.error) {
        throw new Error(json.error);
    }

    return json;
});
return query;
}

export function getProductDetail(id) {
    const query = useQuery([QUERY_KEY_PRODUCTS, id], async () => {
    const urlFetch = id ? URL_PRODUCTS + "/" + id : URL_PRODUCTS;
    const res = await fetch(urlFetch);
    const json = await res.json();

    if (json.error) {
        throw new Error(json.error);
    }

    if (json.name === "EntityNotFoundError") {
        throw new Error(`${json.name}: ${json.message}`);
    }

    return json;
});
return query;
}
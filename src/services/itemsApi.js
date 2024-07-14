const ORGANISATION_ID = import.meta.env.VITE_ORGANISATION_ID;
const API_KEY = import.meta.env.VITE_API_KEY;
const APP_ID = import.meta.env.VITE_APP_ID;

export async function getItems(category) {
  let categoryId;
  const DEFAULT_STRING = `https://api.timbu.cloud/products?organization_id=${ORGANISATION_ID}&reverse_sort=false&page=1&size=10&Appid=${APP_ID}&Apikey=${API_KEY}`;
  try {
    if (category) {
      categoryId = await getCategory(category);
    }

    const API_URL = category
      ? `${DEFAULT_STRING}&category_id=${categoryId}`
      : `${DEFAULT_STRING}`;

    const res = await fetch(`${API_URL}`);

    if (!res.ok)
      throw new Error("An Error Occured While Trying to fetch data..");

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getCategory(category) {
  try {
    const res = await fetch(
      `https://api.timbu.cloud/categories?organization_id=${ORGANISATION_ID}&reverse_sort=false&page=1&size=10&Appid=${APP_ID}&Apikey=${API_KEY}`
    );

    if (!res.ok)
      throw new Error("An Error Occured While trying to fetch category data..");

    const categories = await res.json();

    const categorId = categories.items.find(
      (cat) => cat.name.replace("&", "and") === category
    ).id;

    return categorId;
  } catch (error) {
    console.log(error);
  }
}

export async function getItem(id) {
  try {
    const res = await fetch(
      `https://api.timbu.cloud/products/${id}?organization_id=${ORGANISATION_ID}&Appid=${APP_ID}&Apikey=${API_KEY}`
    );

    if (!res.ok)
      throw new Error("An Error Occured While trying to get that item");

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

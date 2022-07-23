import { Column } from "src/support/helpers/models";

export const addExtraColumn = (columns: [Column], newColumn: string) => {
  return columns.push({
    name: newColumn,
    label: newColumn,
    field: newColumn,
    sortable: true,
  });
};

export const ordenaAZ = (array: [], comparador: string) => {
  return array.sort(function (a, b) {
    if (a[comparador] > b[comparador]) return 1;
    if (a[comparador] < b[comparador]) return -1;
    return 0;
  });
};

export const ordenaZA = (array: [], comparador: string) => {
  return array.sort(function (a, b) {
    if (a[comparador] > b[comparador]) return -1;
    if (a[comparador] < b[comparador]) return 1;
    return 0;
  });
};

export const copyArray = (array: []) => {
  const newArray: [] = [];
  array.forEach((v) => {
    const val = typeof v === "object" ? Object.assign({}, v) : v;
    newArray.push(val);
  });
  return newArray;
};

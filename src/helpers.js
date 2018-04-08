export const convertObjToList = function (obj) {
    const list = [];
    for (const key in obj) {
        list.push({key, ...obj[key]})
    }
    return list;
};

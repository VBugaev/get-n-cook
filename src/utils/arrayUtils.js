export const normalizeArray = (arr) => {
    return arr.reduce((userObj, value) => {
        userObj[value.Id] = value;
        return userObj;
      }, {});
};

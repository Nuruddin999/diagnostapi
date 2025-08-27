const {AbroadInfo} = require("../models");
const isAllAbroadEmpty = (obj) => {
    let isEmpty = true;
    for (const key in obj) {
        if (obj[key] !== "") {
            isEmpty = false;
        }
        if (obj.date === "") {
            obj.date = null
        }
    }
    return isEmpty;
}


const updateAbroad = async (id, obj) => {

    const isEmpty = isAllAbroadEmpty(obj)
console.log(isEmpty)
    console.log(obj)
    if (!isEmpty) {
        try {
            return await AbroadInfo.upsert({...obj, applId: id});
        }
        catch (err) {
            console.log(err);
        }
    }

}

module.exports = updateAbroad

export const isEmptyObject = (obj) => {
    for (const key in obj) {
        if (Object.hasOwn(obj, key)) { // Remove this if you want to check for
            // enumerable inherited properties
            return false;
        }
    }
    return true;
}

export const validateEmail = (email) => {

    let valid = String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

    return valid ? true : false
};




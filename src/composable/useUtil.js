export default function useUtilities() {
    const checkIfExistAndAddKeyValue = (obj1, obj2, comparer, key, value) => obj1.filter(o1 => obj2.some(o2 => {
        return o1[comparer] === o2[comparer] ? o1[key] = value : o1[key] = false       
    }));
    const checkIfNaN = (value) => {
        const toNum = Number(value)
        if (isNaN(toNum)) {
            return true
        }
    }
    return { checkIfExistAndAddKeyValue, checkIfNaN }
    }
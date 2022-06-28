import { ref } from 'vue'

const favoriteUsers = ref([])
export default function uselocalStorage() {
    const saveToLocalStorage = (key, data) => {
      localStorage.setItem(key, JSON.stringify(data));
    }
    const getFromLocalStorage = (key) => {
      let data = JSON.parse(localStorage.getItem(key))
      if (data === null) data = []
      return data
    }
    function isAlreadyAdded(obj, list, key) {
      return list.some(elem => elem[key] === obj[key])
  }
  function toggleFavorite (user) {
    const isAdded = isAlreadyAdded(user, favoriteUsers.value, 'id')
    if (isAdded) {
      const index = favoriteUsers.value.findIndex(key => key.id === user.id);
      user.checked = false
      favoriteUsers.value.splice(index, 1)
    } else {
      user.checked = true
      favoriteUsers.value.push(user)
    }
    saveToLocalStorage('favorite', favoriteUsers.value)
  }
    return { saveToLocalStorage, getFromLocalStorage, isAlreadyAdded, toggleFavorite, favoriteUsers };
  }
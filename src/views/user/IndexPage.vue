<template>
  <div v-if="!state.isLoading && state.users.length > 0" class="home">
    <q-list bordered class="rounded-borders" style="max-width: 1200px; width: 500px;">
      <q-item-label header>
        <q-input v-model="searchText" @input="searchUsers(searchText)" label="Search for user (by name)"></q-input>
      </q-item-label>
      <q-item v-for="user in searchUsers(searchText)" :key="user.id">
        <q-item-section avatar top>
          <q-avatar square>
            <img :src="user.avatar">
          </q-avatar>
        </q-item-section>

        <q-item-section top class="col-2 gt-sm">
          <q-item-label class="q-mt-sm">{{ user.first_name }}</q-item-label>
        </q-item-section>

        <q-item-section class="col-6" top>
          <q-item-label caption>
            Get more details
          </q-item-label>
          <q-item-label class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
            <q-item clickable :to="'/user/' + user.id">Get person details</q-item>
          </q-item-label>
        </q-item-section>

        <q-item-section top side>
          <div class="text-grey-8">
            <q-btn @click="addOrRemoveFavorite(user)" class="gt-xs" size="20px" flat dense round :class="{isChecked: user.checked}" icon="favorite"></q-btn>
          </div>
        </q-item-section>
      </q-item>
    </q-list>
    <div style="min-height: 100vh;">
      <div v-if="!state.isLoading" class="q-pa-lg flex flex-center">
        <q-pagination v-model="currentPage" @click="changePage(currentPage)" :max="state.totalPages"></q-pagination>
      </div>
    </div>
  </div>
  
  <div v-else-if="!state.isLoading && state.users.length === 0">
    something went wrong. <router-link to="/users/1">go back to main page</router-link>
  </div> 
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from 'vue-router';
import useUtilities from '@/composable/useUtil.js'
import uselocalStorage from "@/composable/useLocalStorage";
export default {
  name: "IndexPage",
  setup() {
    const route = useRoute();
    const router = useRouter()
    const currentPage = ref(Number(route.params.page))
    const changePage = (payload) => {
      router.push(`/users/${payload}`)
    }
    const searchText = ref('')
    const searchUsers = (text) => {
      const filteredUser = state.users.filter(user => {
        return user.first_name.toLowerCase().includes(text.toLowerCase())
      })
      return filteredUser
    }
    const state = reactive({
      users: null,
      isLoading: true,
      totalPages: null
    });
    const { favoriteUsers, addOrRemoveFavorite } = uselocalStorage()
    const { checkIfExistAndAddKeyValue, checkIfNaN } = useUtilities();
    onMounted(async () => {
      checkIfNaN(route.params.page) ? router.push('/users/1') : null
      const response = await fetch(`https://reqres.in/api/users?page=${route.params.page}`);
      const res = await response.json();
      checkIfExistAndAddKeyValue(res.data, favoriteUsers.value, "id", "checked", true);
      state.users = res.data;
      state.isLoading = false
      state.totalPages = Number(res.total_pages);
    });

    return {
      state,
      currentPage,
      changePage,
      searchUsers,
      searchText,
      addOrRemoveFavorite,
      favoriteUsers
    };
  }
};
</script>
<style lang="scss" scoped>
.isChecked {
  color: green;
}
</style>
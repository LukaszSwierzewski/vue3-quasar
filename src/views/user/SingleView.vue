<template>
  <div v-if="!state.isLoading" class="about">
    <h1>Page about {{ state.user.first_name }}</h1>
    <q-banner rounded class="bg-grey-3">
      <template v-slot:avatar>
        <img :src="state.user.avatar" style="width: 100px; height: 64px">
      </template>      
      <FavoriteIconBtn :toggle-favorite="toggleFavorite" :user="state.user" :isChecked="state.user.checked" />
      {{ isFav ? 'You really like this person!' : "It is not your favorite person :(" }}
      <template v-slot:action>
        <q-btn flat label="Go back to Users" to="/users/1"></q-btn>
      </template>
    </q-banner>
  </div>
</template>
<script>
import { onMounted, reactive, computed } from "vue";
import { useRoute } from 'vue-router';
import uselocalStorage from '@/composable/useLocalStorage'
import useUtilities from "@/composable/useUtil";
import FavoriteIconBtn from "@/components/FavoriteIconBtn.vue";
export default {
    name: "IndexPage",
    setup() {
        const route = useRoute();
        const { favoriteUsers, toggleFavorite } = uselocalStorage();
        const { checkIfExistAndAddKeyValue } = useUtilities();
        const state = reactive({
            user: null,
            isLoading: true
        });
        onMounted(async () => {
            const response = await fetch(`https://reqres.in/api/users/${route.params.id}`);
            const res = await response.json();
            checkIfExistAndAddKeyValue([res.data], favoriteUsers.value, "id", "checked", true);
            state.user = res.data;
            state.isLoading = false;
        });
        const isFav = computed(() => {
            return state.user.checked;
        });
        return {
            toggleFavorite,
            state,
            isFav
        };
    },
    components: { FavoriteIconBtn }
}

</script>
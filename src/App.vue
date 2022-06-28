<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title>
          Person app
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Essential Links</q-item-label>
        <q-item clickable to="/users/1">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Main page</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container class="center-layout">
      <router-view :key="$route.path"  />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import uselocalStorage from './composable/useLocalStorage'
export default {
  name: 'LayoutDefault',
  setup () {
    const { getFromLocalStorage, favoriteUsers } = uselocalStorage()
    favoriteUsers.value = getFromLocalStorage('favorite')

    return {
      leftDrawerOpen: ref(false)
    }
  }
}
</script>
<style scoped lang="scss">
.center-layout {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

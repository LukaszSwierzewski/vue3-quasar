<template>
<q-btn @click="toggleFavorite(user)" class="gt-xs" size="20px" flat dense round :class="{isChecked: isChecked}" icon="favorite"></q-btn>
</template>

<script>
    export default {
        props: {
           toggleFavorite: {
            type: Function,
            required: true
           },
           user: {
            type: Object,
            required: true
           },
           isChecked: {
            type: Boolean,
            required: true
           }
        }
    }
</script>
<style lang="scss" scoped>
.isChecked {
  color: green;
}
</style>
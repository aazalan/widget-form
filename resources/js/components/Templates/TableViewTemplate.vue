<script>
export default {

}
</script>

<template>
    <div class="table-view">
        <div class="table-view__header">
            <slot name="header"></slot>
        </div>

        <div class="table-view__body">
            <slot name="body"></slot>
        </div>
    </div>
</template>

<style scoped>

</style>

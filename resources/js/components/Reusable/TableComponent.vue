<script>
export default {
    props: {
        tableHeaders: Array,
        tableRows: Array,
    }
}
</script>

<template>
<div>
    <table>
        <thead>
            <tr>
                <th v-for="header in tableHeaders">{{header}}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in tableRows">
                <td v-for="item in row">{{item}}</td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<style scoped>

</style>

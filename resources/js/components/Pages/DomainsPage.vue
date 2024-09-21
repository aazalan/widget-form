<script>
import TableViewTemplate from "../Templates/TableViewTemplate.vue";
import TableComponent from "../Reusable/TableComponent.vue";

export default {
    components: {TableComponent, TableViewTemplate},
    data() {
        return {
            domains: [],
            domainsHeaders: [
                'ID',
                'Домен',
                'Количество посещений',
                'Количество посещений за прошлый месяц',
                'Количество контактов оставленных на сайте',
                'Дата последнего оставленного контакта',
            ],
        };
    },

    async mounted() {
      const response = await fetch("/api/domains");
      const { data } = await response.json();
      this.domains = data;
    },
}
</script>

<template>
    <TableViewTemplate>
        <template #header>
            Список доменов
        </template>
        <template #body>
            <div>
                <table>
                    <thead>
                    <tr>
                        <th v-for="header in domainsHeaders">{{header}}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="domain in domains">

                    </tr>
                    </tbody>
                </table>
            </div>
        </template>
    </TableViewTemplate>
</template>

<style scoped>

</style>

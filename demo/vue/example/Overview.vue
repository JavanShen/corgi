<template>
    <a-list :grid="{ gutter: 16, column: 3 }" :data-source="componentsList">
        <template #renderItem="{ item: { name, label } }">
            <a-list-item>
                <router-link :to="`/components/${name}`">
                    <a-card
                        :title="`${name} ${label}`"
                        :bodyStyle="{ textAlign: 'center' }"
                        hoverable
                    >
                        <a-image
                            :height="160"
                            :src="`../assets/${name}.png`"
                            :preview="false"
                        />
                    </a-card>
                </router-link>
            </a-list-item>
        </template>
    </a-list>
</template>
<script setup lang="ts">
import componentsList from '../componentsList'
</script>

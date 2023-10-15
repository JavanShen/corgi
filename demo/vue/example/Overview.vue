<template>
    <List :grid="{ gutter: 16, column: 3 }" :data-source="componentsList">
        <template #renderItem="{ item: { name, label } }">
            <ListItem>
                <RouterLink :to="`/components/${name}`">
                    <Card
                        :title="`${name} ${label}`"
                        :bodyStyle="{ textAlign: 'center' }"
                        hoverable
                    >
                        <Image
                            :height="160"
                            :src="`https://github.com/JavanShen/corgi/blob/main/packages/assets/pic/${name}.png?raw=true`"
                            :preview="false"
                        />
                    </Card>
                </RouterLink>
            </ListItem>
        </template>
    </List>
</template>
<script setup lang="ts">
import { List, ListItem, Card, Image } from 'ant-design-vue'
import componentsList from '../componentsList'
</script>

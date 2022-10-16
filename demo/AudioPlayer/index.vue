<template>
    <AudioPlayer :source="path" />
</template>
<script setup lang="ts">
import { AudioPlayer } from '@corgi/vue'
import { path } from './source'
</script>

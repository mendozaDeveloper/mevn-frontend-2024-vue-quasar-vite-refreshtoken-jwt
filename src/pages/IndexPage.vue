<template>
    <q-page padding>
        <addLink />
        <!-- <pre>
            {{ useLink.links }}
        </pre>-->
        <template v-for="link in useLink.links" :key="link._id">
            <LinkCard :link="link" />
        </template>
    </q-page>
</template>

<script setup>
import { useLinkStore } from "../stores/link-store.js";

// component
import addLink from "../components/AddLink.vue";
import LinkCard from "../components/LinkCard.vue";

const useLink = useLinkStore();
</script>

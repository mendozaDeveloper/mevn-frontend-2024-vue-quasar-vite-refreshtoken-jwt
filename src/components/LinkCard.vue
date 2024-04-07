<script setup>
import { useLinkStore } from "../stores/link-store.js";
import { useQuasar } from "quasar";
import { useNotify } from "src/composables/notifyHook.js";

const useLink = useLinkStore();
const $q = useQuasar();
const { errorNotify, successNotify } = useNotify();

defineProps({
    link: Object,
});

const deleteLink = async (_id) => {
    $q.dialog({
        title: "Cuidado",
        message: "¿Quieres eliminar el elemento?",
        cancel: true,
        persistent: true,
    }).onOk(async () => {
        try {
            await useLink.removeLink(_id);
            successNotify("Se elimino el link");
        } catch (error) {
            if (error.errors) {
                return error.errors.forEach((item) => {
                    errorNotify(item.msg);
                });
            }
            errorNotify(error);
        }
    });
};

const updateLink = (link) => {
    $q.dialog({
        title: "Actualizar Link",
        message: "Actualiza aqui tu enlace",
        prompt: {
            model: link.longLink,
            type: "text", // optional
        },
        cancel: true,
        persistent: true,
    }).onOk(async (data) => {
        try {
            const newLink = { ...link, longLink: data };
            await useLink.modifiedLink(newLink);
            successNotify("Se actualizo el link");
        } catch (error) {
            if (error.errors) {
                return error.errors.forEach((item) => {
                    errorNotify(item.msg);
                });
            }
            errorNotify(error);
        }
    });
};

const copyLink = async (nanoLink) => {
    try {
        console.log(process.env.FRONT_URI);
        const path = `${process.env.FRONT_URI}/${nanoLink}`;
        await navigator.clipboard.writeText(path);
        successNotify("Se copio el nanolink");
    } catch (error) {
        console.log(error);

        errorNotify(error);
    }
};
</script>

<template>
    <q-card class="my-card q-mb-sm">
        <q-card-section>
            <div class="text-overline">{{ link.nanoLink }}</div>
            {{ link }}
        </q-card-section>
        <q-separator />

        <q-card-actions>
            <q-btn
                flat
                round
                icon="mdi-trash-can-outline"
                color="red"
                @click="deleteLink(link._id)"
            />
            <q-btn
                flat
                round
                icon="mdi-pencil-outline"
                @click="updateLink(link)"
            />
            <q-btn flat color="primary" @click="copyLink(link.nanoLink)"
                >Copy</q-btn
            >
        </q-card-actions>
    </q-card>
</template>

import { defineStore } from "pinia";
import { ref } from "vue";

import { api } from "src/boot/axios";
import { useUserStore } from "./user-store.js";
import { useQuasar } from "quasar";

export const useLinkStore = defineStore("url", () => {
    const userStore = useUserStore();
    const links = ref([]);
    const $q = useQuasar();

    const createLink = async (longLink) => {
        try {
            $q.loading.show();
            const res = await api({
                url: "/links",
                method: "POST",
                headers: {
                    Authorization: "Bearer " + userStore.token,
                },
                data: {
                    longLink,
                },
            });
            console.log(res.data);
            links.value.push(res.data.newLink);
        } catch (error) {
            throw error.response?.data || error;
        } finally {
            $q.loading.hide();
        }
    };

    const getLinks = async () => {
        try {
            console.log("LLamar todos los links");
            const res = await api({
                url: "/links",
                method: "GET",
                headers: {
                    Authorization: "Bearer " + userStore.token,
                },
            });
            console.log(res.data);
            //links.value = res.data.links.map((item) => item);
            links.value = [...res.data.links];
        } catch (error) {
            console.log(error);
        }
    };

    getLinks();

    const removeLink = async (_id) => {
        try {
            $q.loading.show();
            await api({
                url: `/links/${_id}`,
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + userStore.token,
                },
            });
            links.value = links.value.filter((item) => item._id !== _id);
        } catch (error) {
            throw error.response?.data || error;
        } finally {
            $q.loading.hide();
        }
    };

    const modifiedLink = async (newLink) => {
        try {
            $q.loading.show();
            await api({
                url: `/links/${newLink._id}`,
                method: "PATCH",
                data: {
                    longLink: newLink.longLink,
                },
                headers: {
                    Authorization: "Bearer " + userStore.token,
                },
            });
            links.value = links.value.map((item) =>
                item._id === newLink._id ? newLink : item
            );
        } catch (error) {
            throw error.response?.data || error;
        } finally {
            $q.loading.hide();
        }
    };

    return {
        createLink,
        links,
        removeLink,
        modifiedLink,
    };
});

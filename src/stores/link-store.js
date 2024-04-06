import { defineStore } from "pinia";
import { ref } from "vue";

import { api } from "src/boot/axios";
import { useUserStore } from "./user-store.js";

export const useLinkStore = defineStore("url", () => {
    const userStore = useUserStore();
    const links = ref([]);

    const createLink = async (longLink) => {
        try {
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

    return {
        createLink,
        links,
    };
});

import { useMainStore } from "~/store/main";
import { storeToRefs } from "pinia";

export const useUsers = () => {
    const token = useCookie('token')
    const config = useRuntimeConfig()
    const main = useMainStore()
    const { users }: any = storeToRefs(main)
    const { totalPages } = storeToRefs(main)

    const getUsers = async () => {
        try {
            const pagenum = storeToRefs(main).page

            const data: any = await $fetch(`${config.public.apiBase}/users/list?page=${pagenum.value}&size=5`, {
                method: "GET",
                headers: {
                    "x-auth-token": `${token.value}`,
                },
            });
            if (data) {
                console.log(data)
                var { paginatedUsers } = data;
                if (Array.isArray(paginatedUsers)) {
                    users.value = paginatedUsers.map((paginatedUser) => {
                        return { ...paginatedUser, editing: false };
                    });
                }
                pagenum.value += 1
                totalPages.value = data.totalPages
                users.value = data.paginatedUsers
                console.log(data.paginatedUsers)
            }
        } catch (error: any) {
            console.log(error);
        }
    };

    const registerUser = async (user: any) => {
        try {
            const data = await $fetch(`${config.public.apiBase}/users/register`, {
                method: "POST",
                body: user,
                headers: {
                    "x-auth-token": `${token.value}`,
                },
            });
            if (data) {
                users.value = users.value.push(user)
            }
        } catch (error: any) {
            console.log(error);
        }
    };

    const deleteUser = async (id: number) => {
        try {
            const data: any = await $fetch(`${config.public.apiBase}/users/delete`, {
                method: "post",
                headers: {
                    "x-auth-token": `${token.value}`,
                },
                body: { id: id }
            });
            if (data) {
                 users.value.splice(id, 1)
            }
        } catch (error: any) {
            console.log(error);
        }
    };

    const updateUser = async (payload: any) => {
        try {
            const data: any = await $fetch(`${config.public.apiBase}/users/update`, {
                method: "post",
                headers: {
                    "x-auth-token": `${token.value}`,
                },
                body: payload
            });
            if (data) {
                console.log(data)
                const updateIndex = users.value.findIndex((user: { id: any; }) => user.id === payload.id)
                console.log(updateIndex)
                users.value[updateIndex] = { ...users.value[updateIndex], name: payload.name, score: payload.score, age: payload.age }
            }
        } catch (error: any) {
            console.log(error);
        }
    };

    return {
        getUsers, registerUser, deleteUser, updateUser
    };
};

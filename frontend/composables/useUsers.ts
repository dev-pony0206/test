import { useMainStore } from "~/store/main";
import { storeToRefs } from "pinia";

export const useUsers = () => {
    const token = useCookie('token')
    const config = useRuntimeConfig()
    const main = useMainStore()
    const { users }: any = storeToRefs(main)
    const { totalPages } = storeToRefs(main)
    const { allUsers } = storeToRefs(main)

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
                users.value = paginatedUsers.map((paginatedUser: any) => {
                    return { ...paginatedUser, editing: false };
                });
                totalPages.value = data.totalPages
                users.value = data.paginatedUsers
                console.log(data.paginatedUsers)
            }
        } catch (error: any) {
            console.log(error);
        }
    };

    const getAllUsers = async () => {
        try {
            const data: any = await $fetch(`${config.public.apiBase}/users/all`, {
                method: "GET",
                headers: {
                    "x-auth-token": `${token.value}`,
                },
            });
            if (data) {
                const router = useRouter()
                allUsers.value = data
                await router.push('/dashboard')
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
                getUsers()
            }
        } catch (error: any) {
            console.log(error);
        }
    };

    const deleteUser = async (_id: string, id: number) => {
        try {
            const data: any = await $fetch(`${config.public.apiBase}/users/delete`, {
                method: "post",
                headers: {
                    "x-auth-token": `${token.value}`,
                },
                body: { id: _id }
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
                const updateIndex = users.value.findIndex((user: { id: any; }) => user.id === payload.id)
                users.value[updateIndex] = { ...users.value[updateIndex], name: payload.name, score: payload.score, age: payload.age }
            }
        } catch (error: any) {
            console.log(error);
        }
    };

    return {
        getUsers, registerUser, deleteUser, updateUser, getAllUsers
    };
};

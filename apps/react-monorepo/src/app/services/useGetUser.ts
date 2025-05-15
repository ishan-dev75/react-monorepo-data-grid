import { useFetcher } from "@modules/shared/hooks/useFetcher";
import { User } from '@modules/shared/data/type';

export function useGetUser() {
    const { data, ...rest } = useFetcher<User[]>("/api/users", {
        method: "GET",
    });

    return { userList: data, ...rest };
}
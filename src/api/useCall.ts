import { useState } from "react";
import { notify } from "../lib";

function handleError(error: any) {
    notify.error(error);
    console.error(error);
}

function handleSuccess(message: string) {
    message && notify.success(message);
}

export default function useCall<R, P>(
    callback: (args?: P) => R,
    options?: {
        onSuccess?: (result?: Awaited<R>) => void,
        onError?: () => void,
        successMessage?: string,
        errorMessage?: string,
    }
) {
    const [isLoading, setIsLoading] = useState(false);

    const call = async (args?: P) => {
        try {
            setIsLoading(true);
            const data = await callback(args)
            handleSuccess(options?.successMessage);
            options?.onSuccess?.(data);
            return data;
        } catch (error) {
            handleError(options?.errorMessage || error.message);
            options?.onError?.();
        }
        finally {
            setIsLoading(false);
        }
    }


    return { isLoading, call };
}
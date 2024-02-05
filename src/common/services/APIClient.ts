export type ApiResponse<T> = {
    data: T;
    error: string | null;
};

export const APIClient = async <T>(url: string, method: string = 'GET', body?: object): Promise<ApiResponse<T>> => {
    try {
        const baseUri = 'https://localhost:7149/api/';
        const jsonBody = body ? JSON.stringify(body) : undefined;

        const response = await fetch(`${baseUri}${url}`, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonBody,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        return { data, error: null };
    } catch (error) {
        let errorMessage = "Failed to do something exceptional";

        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return { data: null as T, error: errorMessage };
    }
};
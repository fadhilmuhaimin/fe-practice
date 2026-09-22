const BASE_URL = "https://dummyjson.com";

type RequestOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    headers?: Record<string, string>;
    body?: unknown;
}

export async function apiClient<T>(
    endpoint : string,
    options? : RequestOptions = {}
) : Promise<T> {


    const { method = "GET",body,headers = {} } = options;

    const config : RequestInit = {
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
    };

    if(body){
        config.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`,config);

    if(!response.ok){
        throw new Error(`API request failed with status ${response.status}`);
    }

    return  response.json();


}
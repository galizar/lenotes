interface IRestResponse<T> {
  body: T,
}

export default class RestUtilities {
  static async get<T>(url: string): Promise<T> {
    return RestUtilities.request<T>("GET", url);
  }

  static delete(url: string): Promise<void> {
    return RestUtilities.request<void>("DELETE", url);
  }

  static put(
    url: string, 
  ): Promise<void> 
  {
    return RestUtilities.request<void>("PUT", url);
  }

  static async post<T>(
    url: string, 
  ): Promise<T> 
  {
    return await RestUtilities.request<T>("POST", url);
  }

  private static async request<T>(
    method: string,
    url: string,
  ): Promise<T>  
  {
    let res = await fetch(url, {method});
    return res.json();
  }
}

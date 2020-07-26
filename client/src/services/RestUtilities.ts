export interface IErrorContent {
  error: string,
  error_description: string,
  [key: string]: string,
}

export interface IRestResponse<T> {
  is_error?: boolean,
  error_content?: IErrorContent,
  content?: T,
}

export default class RestUtilities {
  static get<T>(url: string): Promise<IRestResponse<T>> {
    return RestUtilities.request<T>("GET", url);
  }

  static delete(url: string): Promise<IRestResponse<void>> {
    return RestUtilities.request<void>("DELETE", url);
  }

  static put<T>(
    url: string, 
    data: T 
  ): Promise<IRestResponse<T>> 
  {
    return RestUtilities.request<T>("PUT", url, data);
  }

  static post<T>(
    url: string, 
    data: T 
  ): Promise<IRestResponse<T>> 
  {
    return RestUtilities.request<T>("POST", url, data);
  }

  private static request<T>(
    method: string,
    url: string,
    data?: T | string
  ): Promise<IRestResponse<T>> 
  {
    let isJsonResponse = false;
    let isBadRequest = false;
    let body = data;
    let headers = new Headers();

    headers.set('Accept', 'application/json');

    if (data) {
      headers.set('Content-Type', 'application/json');
      body = JSON.stringify(data);
    }

    return fetch(
      url,
      {
        method: method,
        headers: headers,
        body: body as string
      })
      .then((response: any) => {

        isBadRequest = response.status === 400;

        let responseContentType = response.headers.get('content-type');
        if (
          responseContentType &&
          responseContentType.indexOf("application/json") !== -1
        ) {
          isJsonResponse = true;
          return response.json();
        } else {
          return response.text();
        }
      })
      .then((responseContent: any) => {

        let response: IRestResponse<T> = {
          is_error: isBadRequest,
          error_content: isBadRequest ? responseContent : null,
          content: isBadRequest ? null : responseContent
        };
        return response;
      });
  }
}

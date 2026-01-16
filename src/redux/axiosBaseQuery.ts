import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios, { AxiosError, type AxiosRequestConfig,  } from "axios";

type AxiosBaseQueryArgs = {
  baseUrl: string;
};

const axiosBaseQuery =
  ({
    baseUrl,
  }: AxiosBaseQueryArgs): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method = "GET", data, params }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        withCredentials: true,  
      });

      return { data: result.data };
    } catch (error) {
      const err = error as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data ?? err.message,
        },
      };
    }
  };

export default axiosBaseQuery;

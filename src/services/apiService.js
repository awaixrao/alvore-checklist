import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const REACT_APP_API_URL = "http://localhost:3003";
const API_URL = REACT_APP_API_URL;

// Handle blob downloads for file responses
const handleBlobDownload = async (response, filename) => {
  const reader = response?.body?.getReader();
  const stream = new ReadableStream({
    start(controller) {
      function push() {
        reader?.read().then(({ done, value }) => {
          if (done) {
            controller?.close();
            return;
          }
          controller?.enqueue(value);
          push();
        });
      }
      push();
    },
  });

  const blob = await new Response(stream).blob();
  const link = document?.createElement("a");
  link.href = URL?.createObjectURL(blob);
  link.download = filename;
  link.click();
};

// Base query for API calls
const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.auth?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers?.set("Accept", "application/json");
    console.log("token", token);

    return headers;
  },
});

// Handle different response types (JSON or Blob)
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  const contentType = result.meta?.response?.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    return result;
  } else if (contentType?.includes("application/octet-stream")) {
    return { data: result?.meta?.response };
  } else {
    throw new Error("Unexpected content type received.");
  }
};

// API Slice
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["KeyName"], // Dynamic tag management
  endpoints: (builder) => ({
    // GET endpoint
    get: builder.query({
      query: ({ path, params }) => ({
        url: path,
        method: "GET",
        params,
      }),
      providesTags: (result, error, { path }) =>
        result ? [{ type: "KeyName", id: path }] : ["KeyName"],
      transformResponse: async (response, meta, { params }) => {
        const contentType = meta.response.headers.get("content-type");

        if (contentType?.includes("application/octet-stream")) {
          if (params?.filename) {
            await handleBlobDownload(meta.response, params.filename);
          }
          return;
        } else if (contentType?.includes("application/json")) {
          return response;
        } else {
          throw new Error("Unexpected content type received");
        }
      },
    }),
    // POST endpoint
    post: builder.mutation({
      query: ({ path, body }) => ({
        url: path,
        method: "POST",
        body,
      }),
      invalidatesTags: ["KeyName"],
    }),
    // PUT endpoint
    put: builder.mutation({
      query: ({ path, body }) => ({
        url: path,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["KeyName"],
    }),
    // DELETE endpoint
    delete: builder.mutation({
      query: ({ path }) => ({
        url: path,
        method: "DELETE",
      }),
      invalidatesTags: ["KeyName"],
    }),
    // PATCH endpoint
    patch: builder.mutation({
      query: ({ path, body }) => ({
        url: path,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["KeyName"],
    }),
  }),
});

// Hooks for usage in components
export const {
  useGetQuery,
  usePostMutation,
  usePutMutation,
  useDeleteMutation,
  usePatchMutation,
} = apiSlice;

export default apiSlice.reducer;

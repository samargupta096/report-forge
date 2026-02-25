# QueryApi

All URIs are relative to *http://localhost:8085/api/v1/data-sources*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**idQueryPost**](QueryApi.md#idquerypostoperation) | **POST** /{id}/query | Execute a query against a remote data source |



## idQueryPost

> Array&lt;object&gt; idQueryPost(id, idQueryPostRequest)

Execute a query against a remote data source

### Example

```ts
import {
  Configuration,
  QueryApi,
} from '';
import type { IdQueryPostOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new QueryApi(config);

  const body = {
    // number
    id: 56,
    // IdQueryPostRequest
    idQueryPostRequest: ...,
  } satisfies IdQueryPostOperationRequest;

  try {
    const data = await api.idQueryPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `number` |  | [Defaults to `undefined`] |
| **idQueryPostRequest** | [IdQueryPostRequest](IdQueryPostRequest.md) |  | |

### Return type

**Array<object>**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Query results |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


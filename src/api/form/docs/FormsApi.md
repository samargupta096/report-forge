# FormsApi

All URIs are relative to *http://localhost:8084/api/v1/forms*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**rootGet**](FormsApi.md#rootget) | **GET** / | Get all forms |
| [**rootPost**](FormsApi.md#rootpost) | **POST** / | Create a new dynamic form |



## rootGet

> Array&lt;FormDefinition&gt; rootGet()

Get all forms

### Example

```ts
import {
  Configuration,
  FormsApi,
} from '';
import type { RootGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FormsApi();

  try {
    const data = await api.rootGet();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**Array&lt;FormDefinition&gt;**](FormDefinition.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## rootPost

> rootPost(formRequest)

Create a new dynamic form

### Example

```ts
import {
  Configuration,
  FormsApi,
} from '';
import type { RootPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new FormsApi(config);

  const body = {
    // FormRequest
    formRequest: ...,
  } satisfies RootPostRequest;

  try {
    const data = await api.rootPost(body);
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
| **formRequest** | [FormRequest](FormRequest.md) |  | |

### Return type

`void` (Empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Created |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


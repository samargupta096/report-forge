# SubmissionsApi

All URIs are relative to *http://localhost:8084/api/v1/forms*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**formIdSubmissionsGet**](SubmissionsApi.md#formidsubmissionsget) | **GET** /{formId}/submissions | Get responses for a specific form |
| [**formIdSubmissionsPost**](SubmissionsApi.md#formidsubmissionspost) | **POST** /{formId}/submissions | Submit a response to a form |



## formIdSubmissionsGet

> Array&lt;object&gt; formIdSubmissionsGet(formId)

Get responses for a specific form

### Example

```ts
import {
  Configuration,
  SubmissionsApi,
} from '';
import type { FormIdSubmissionsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SubmissionsApi(config);

  const body = {
    // string
    formId: formId_example,
  } satisfies FormIdSubmissionsGetRequest;

  try {
    const data = await api.formIdSubmissionsGet(body);
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
| **formId** | `string` |  | [Defaults to `undefined`] |

### Return type

**Array<object>**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## formIdSubmissionsPost

> formIdSubmissionsPost(formId, body)

Submit a response to a form

### Example

```ts
import {
  Configuration,
  SubmissionsApi,
} from '';
import type { FormIdSubmissionsPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SubmissionsApi();

  const body = {
    // string
    formId: formId_example,
    // object
    body: Object,
  } satisfies FormIdSubmissionsPostRequest;

  try {
    const data = await api.formIdSubmissionsPost(body);
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
| **formId** | `string` |  | [Defaults to `undefined`] |
| **body** | `object` |  | |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Submission saved |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


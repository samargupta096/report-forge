# ReportsApi

All URIs are relative to *http://localhost:8083/api/v1/reports*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**executeIdPost**](ReportsApi.md#executeidpost) | **POST** /execute/{id} | Execute a report template |
| [**rootGet**](ReportsApi.md#rootget) | **GET** / | Get all report templates |
| [**rootPost**](ReportsApi.md#rootpost) | **POST** / | Create a new report template |



## executeIdPost

> executeIdPost(id)

Execute a report template

### Example

```ts
import {
  Configuration,
  ReportsApi,
} from '';
import type { ExecuteIdPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ReportsApi(config);

  const body = {
    // number
    id: 56,
  } satisfies ExecuteIdPostRequest;

  try {
    const data = await api.executeIdPost(body);
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

### Return type

`void` (Empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Report execution triggered |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## rootGet

> Array&lt;ReportTemplate&gt; rootGet()

Get all report templates

### Example

```ts
import {
  Configuration,
  ReportsApi,
} from '';
import type { RootGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ReportsApi(config);

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

[**Array&lt;ReportTemplate&gt;**](ReportTemplate.md)

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


## rootPost

> rootPost(templateRequest)

Create a new report template

### Example

```ts
import {
  Configuration,
  ReportsApi,
} from '';
import type { RootPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ReportsApi(config);

  const body = {
    // TemplateRequest
    templateRequest: ...,
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
| **templateRequest** | [TemplateRequest](TemplateRequest.md) |  | |

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


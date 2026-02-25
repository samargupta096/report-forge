# DashboardsApi

All URIs are relative to *http://localhost:8082/api/v1/dashboards*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**idGet**](DashboardsApi.md#idget) | **GET** /{id} | Get a specific dashboard config |
| [**rootGet**](DashboardsApi.md#rootget) | **GET** / | Get all dashboards for user |
| [**rootPost**](DashboardsApi.md#rootpost) | **POST** / | Create a new dashboard |



## idGet

> Dashboard idGet(id)

Get a specific dashboard config

### Example

```ts
import {
  Configuration,
  DashboardsApi,
} from '';
import type { IdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new DashboardsApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies IdGetRequest;

  try {
    const data = await api.idGet(body);
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
| **id** | `string` |  | [Defaults to `undefined`] |

### Return type

[**Dashboard**](Dashboard.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## rootGet

> Array&lt;Dashboard&gt; rootGet()

Get all dashboards for user

### Example

```ts
import {
  Configuration,
  DashboardsApi,
} from '';
import type { RootGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new DashboardsApi(config);

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

[**Array&lt;Dashboard&gt;**](Dashboard.md)

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

> rootPost(dashboardRequest)

Create a new dashboard

### Example

```ts
import {
  Configuration,
  DashboardsApi,
} from '';
import type { RootPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new DashboardsApi(config);

  const body = {
    // DashboardRequest
    dashboardRequest: ...,
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
| **dashboardRequest** | [DashboardRequest](DashboardRequest.md) |  | |

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


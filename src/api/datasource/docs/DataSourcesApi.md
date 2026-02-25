# DataSourcesApi

All URIs are relative to *http://localhost:8085/api/v1/data-sources*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**rootGet**](DataSourcesApi.md#rootget) | **GET** / | Get configured data sources |
| [**rootPost**](DataSourcesApi.md#rootpost) | **POST** / | Configure a new data source |



## rootGet

> Array&lt;DataSourceConfig&gt; rootGet()

Get configured data sources

### Example

```ts
import {
  Configuration,
  DataSourcesApi,
} from '';
import type { RootGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new DataSourcesApi(config);

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

[**Array&lt;DataSourceConfig&gt;**](DataSourceConfig.md)

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

> rootPost(dataSourceRequest)

Configure a new data source

### Example

```ts
import {
  Configuration,
  DataSourcesApi,
} from '';
import type { RootPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new DataSourcesApi(config);

  const body = {
    // DataSourceRequest
    dataSourceRequest: ...,
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
| **dataSourceRequest** | [DataSourceRequest](DataSourceRequest.md) |  | |

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


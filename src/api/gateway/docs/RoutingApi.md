# RoutingApi

All URIs are relative to *http://localhost:8080/api/v1*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**authGet**](RoutingApi.md#authget) | **GET** /auth/** | Routes to Auth Service |
| [**dashboardsGet**](RoutingApi.md#dashboardsget) | **GET** /dashboards/** | Routes to Dashboard Service |
| [**dataSourceGet**](RoutingApi.md#datasourceget) | **GET** /data-source/** | Routes to Data Source Service |
| [**formsGet**](RoutingApi.md#formsget) | **GET** /forms/** | Routes to Form Service |
| [**reportsGet**](RoutingApi.md#reportsget) | **GET** /reports/** | Routes to Report Service |



## authGet

> authGet()

Routes to Auth Service

### Example

```ts
import {
  Configuration,
  RoutingApi,
} from '';
import type { AuthGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new RoutingApi();

  try {
    const data = await api.authGet();
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

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful routing |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## dashboardsGet

> dashboardsGet()

Routes to Dashboard Service

### Example

```ts
import {
  Configuration,
  RoutingApi,
} from '';
import type { DashboardsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new RoutingApi();

  try {
    const data = await api.dashboardsGet();
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

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful routing |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## dataSourceGet

> dataSourceGet()

Routes to Data Source Service

### Example

```ts
import {
  Configuration,
  RoutingApi,
} from '';
import type { DataSourceGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new RoutingApi();

  try {
    const data = await api.dataSourceGet();
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

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful routing |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## formsGet

> formsGet()

Routes to Form Service

### Example

```ts
import {
  Configuration,
  RoutingApi,
} from '';
import type { FormsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new RoutingApi();

  try {
    const data = await api.formsGet();
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

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful routing |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## reportsGet

> reportsGet()

Routes to Report Service

### Example

```ts
import {
  Configuration,
  RoutingApi,
} from '';
import type { ReportsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new RoutingApi();

  try {
    const data = await api.reportsGet();
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

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful routing |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


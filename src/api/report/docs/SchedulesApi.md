# SchedulesApi

All URIs are relative to *http://localhost:8083/api/v1/reports*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**schedulesPost**](SchedulesApi.md#schedulespost) | **POST** /schedules | Create a new report schedule |



## schedulesPost

> schedulesPost(scheduleRequest)

Create a new report schedule

### Example

```ts
import {
  Configuration,
  SchedulesApi,
} from '';
import type { SchedulesPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SchedulesApi(config);

  const body = {
    // ScheduleRequest
    scheduleRequest: ...,
  } satisfies SchedulesPostRequest;

  try {
    const data = await api.schedulesPost(body);
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
| **scheduleRequest** | [ScheduleRequest](ScheduleRequest.md) |  | |

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
| **201** | Scheduled |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


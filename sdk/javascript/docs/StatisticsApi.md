# DevJokesApi.StatisticsApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiStatisticsGet**](StatisticsApi.md#apiStatisticsGet) | **GET** /api/statistics | Get API usage statistics



## apiStatisticsGet

> Statistics apiStatisticsGet()

Get API usage statistics

### Example

```javascript
import DevJokesApi from 'dev_jokes_api';

let apiInstance = new DevJokesApi.StatisticsApi();
apiInstance.apiStatisticsGet((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**Statistics**](Statistics.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


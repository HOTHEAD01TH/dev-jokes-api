# DevJokesApi.CategoriesApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiCategoriesGet**](CategoriesApi.md#apiCategoriesGet) | **GET** /api/categories | Get all joke categories



## apiCategoriesGet

> apiCategoriesGet()

Get all joke categories

### Example

```javascript
import DevJokesApi from 'dev_jokes_api';

let apiInstance = new DevJokesApi.CategoriesApi();
apiInstance.apiCategoriesGet((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


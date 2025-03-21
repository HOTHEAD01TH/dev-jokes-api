# DevJokesApi.JokesApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiJokesCategoryCategoryGet**](JokesApi.md#apiJokesCategoryCategoryGet) | **GET** /api/jokes/category/{category} | Get jokes by category
[**apiJokesDifficultyLevelGet**](JokesApi.md#apiJokesDifficultyLevelGet) | **GET** /api/jokes/difficulty/{level} | Get jokes by difficulty
[**apiJokesGet**](JokesApi.md#apiJokesGet) | **GET** /api/jokes | Returns jokes with pagination
[**apiJokesIdGet**](JokesApi.md#apiJokesIdGet) | **GET** /api/jokes/{id} | Get a joke by ID
[**apiJokesRandomGet**](JokesApi.md#apiJokesRandomGet) | **GET** /api/jokes/random | Get a random joke



## apiJokesCategoryCategoryGet

> apiJokesCategoryCategoryGet(category)

Get jokes by category

### Example

```javascript
import DevJokesApi from 'dev_jokes_api';

let apiInstance = new DevJokesApi.JokesApi();
let category = "category_example"; // String | Joke category
apiInstance.apiJokesCategoryCategoryGet(category, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **category** | **String**| Joke category | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## apiJokesDifficultyLevelGet

> apiJokesDifficultyLevelGet(level)

Get jokes by difficulty

### Example

```javascript
import DevJokesApi from 'dev_jokes_api';

let apiInstance = new DevJokesApi.JokesApi();
let level = "level_example"; // String | Difficulty level
apiInstance.apiJokesDifficultyLevelGet(level, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **level** | **String**| Difficulty level | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## apiJokesGet

> apiJokesGet(opts)

Returns jokes with pagination

### Example

```javascript
import DevJokesApi from 'dev_jokes_api';

let apiInstance = new DevJokesApi.JokesApi();
let opts = {
  'page': 1, // Number | Page number
  'limit': 10, // Number | Number of items per page
  'category': "category_example", // String | Filter by category
  'difficulty': "difficulty_example" // String | Filter by difficulty
};
apiInstance.apiJokesGet(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **page** | **Number**| Page number | [optional] [default to 1]
 **limit** | **Number**| Number of items per page | [optional] [default to 10]
 **category** | **String**| Filter by category | [optional] 
 **difficulty** | **String**| Filter by difficulty | [optional] 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## apiJokesIdGet

> apiJokesIdGet(id)

Get a joke by ID

### Example

```javascript
import DevJokesApi from 'dev_jokes_api';

let apiInstance = new DevJokesApi.JokesApi();
let id = 56; // Number | Joke ID
apiInstance.apiJokesIdGet(id, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Number**| Joke ID | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## apiJokesRandomGet

> apiJokesRandomGet()

Get a random joke

### Example

```javascript
import DevJokesApi from 'dev_jokes_api';

let apiInstance = new DevJokesApi.JokesApi();
apiInstance.apiJokesRandomGet((error, data, response) => {
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


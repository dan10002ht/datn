## API Reference

#### Generate Token before make request

```http
  POST /api/token
```

| Parameter | Type     | Description                 |
| :-------- | :------- | :-------------------------- |
| `apiKey`  | `string` | **Required**. datn-dan-tran |

#### Generate userId via raspberry

```http
  POST /api/user
```

| Parameter | Type     | Description                                   |
| :-------- | :------- | :-------------------------------------------- |
| `userId`  | `string` | **Required**. userId generated from raspberry |

#### Send request after time keeping on raspberry

```http
  POST /api/time/:userId
```

| Parameter | Type     | Description                                  |
| :-------- | :------- | :------------------------------------------- |
| `image`   | `string` | formData.image for getting time keeper image |

#### Get time keeping data of users

```http
  GET /api/user/list-time-keeping
```

| Query          | Type     | Description                                                                             |
| :------------- | :------- | :-------------------------------------------------------------------------------------- | ----- | ---- |
| `selectedDate` | `string` | **Required**. selected date for getting information of week/month of that selected date |
| `period`       | `string` | **Required**. "week                                                                     | month | day" |

#### Get user data

```http
  GET /api/user/:userId
```

| Parameter | Type | Description |
| :-------- | :--- | :---------- |

#### Update user data

```http
  PUT /api/user/:userId
  parameter will be userData
```

| Parameter | Type | Description |
| :-------- | :--- | :---------- |

#### get daily analytics

```http
  GET /api/time/daily
```

| Parameter | Type | Description |
| :-------- | :--- | :---------- |

#### get monthly analytics

```http
  GET /api/time/monthly
```

| Parameter | Type | Description |
| :-------- | :--- | :---------- |

#### get list of logging

```http
  GET /api/logs

```

#### get excel downloaded file of specific period

```http
  GET /api/logs/excel
  This api will get monthly excel file of timekeeping
```

| Parameter  | Type     | Description                                                                                                   |
| :--------- | :------- | :------------------------------------------------------------------------------------------------------------ |
| `previous` | `number` | **Default: 0**. This parameter will let server know how many period(s) will excel file generate from database |

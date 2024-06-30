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

```http
  POST /api/time/:userId
```

| Parameter | Type     | Description                                  |
| :-------- | :------- | :------------------------------------------- |
| `image`   | `string` | formData.image for getting time keeper image |

# Orbe Urbano Trees backend

## To install

Run `npm install`

## To run

Run `node .`

## Endpoints

Working locally, API calls should be made to `http://localhost:5000`.

The PROD API is `https://ou-back-trees.vercel.app`.

| Endpoint          | Description                                                                                                                                                                                                                                                        |
|-------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| GET /tree/<id>    | Returns data of a tree element given its ID.                                                                                                                                                                                                                       |
| GET /all-trees    | Returns data of all tree elements in the database.                                                                                                                                                                                                                 |
| POST /tree        | Posts a new tree element into the database. ***|
| DELETE /tree/<id> | Deletes data of a tree element given its ID.                                                                                                                                                                                                                       |
| GET /names-list   | Returns an alphabetically sorted list of all unique names from all trees.                                                                                                                                                                                          |

*** Body format for DELETE call:
```json
{
    "tree": {
        "name": "<name of tree (String)>",
        "lat": <latitude (Float)>,
        "long": <longitude (Float)>,
        "reg_date_time": "<datetime of registry (String)>"
    }
}
``` 
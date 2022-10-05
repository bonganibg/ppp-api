# PC Part Price API

This is the API used for getting product information from the database.

## Get Category Products And Filters

### Request

`GET /category/:id`

#### Example 
    curl -i -H 'Accept: application/json' http:localhost:8080/category/graphics

### Response

    Status: 200 Ok
    Content-Type: application/json
    Data:  {
        products: [
            {
                category: number,
                externalID: string,
                seriesExternalID: string,
                store: number,
                name: string,
                price: number,
                manufacturer: number
            }
        ],
        searchFilters: {
            priceRange: {
                min: number,
                max: number
            },
            filters: [
                {
                    name: string,
                    options: [
                        {
                            name: string,
                            selected: boolean
                        }
                    ]
                }
            ]
        }
    }

## Get Series in a Category

`GET /category/:id/series`

#### example
    curl -i -H 'Accept: application/json' http://localhost:8080/category/graphics/series

### Response 
    Status: 200 Ok
    Content-Type: application/json
    Data: {
        series: [
            {
                id: string,
                name: string
            }
        ]
    }    


## Get Filtered Series in a Category

### Request 

`GET /category/:id/series/filter?=`

#### example
    curl -i -H 'Accept: application/json' http://localhost:8080/category/graphics/series/filter?make=rtx2060&make=rtx3060

### Response 
    Status: 200 Ok
    Content-Type: application/json
    Data: {
        seriesExternalIDs: [
            {
                id: string
            }
        ]
    }    

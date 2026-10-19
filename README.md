# Product REST API

A small API for creating, viewing, updating, and deleting products. It uses TypeScript, Express, and Zod. Products are kept in memory, so they reset when the server restarts.

## Run the API

You’ll need Node.js and npm. In a terminal at the project folder, run:

```powershell
cd code\start
npm install
$env:PORT = "3001"
npm run dev
```

Leave that terminal running while you use the API.

## Try it out

- **Bruno:** Install the [Bruno VS Code extension](https://marketplace.visualstudio.com/items?itemName=bruno-api-client.bruno). The collection uses Bruno's YAML format. Open `bruno\Product API` as a collection; its `Local` environment is set as the default. If you already had the collection open, close it and reopen it so Bruno reloads the YAML files.
- **Swagger:** Visit [http://localhost:3001/api-docs](http://localhost:3001/api-docs).

The Bruno collection includes examples for creating, viewing, updating, and deleting a product, plus a couple of error cases. The create request saves the product ID for the later requests.

## Endpoints

| Method | Path | What it does |
| --- | --- | --- |
| `GET` | `/api/v1/products` | List products |
| `GET` | `/api/v1/products/:id` | View a product |
| `POST` | `/api/v1/products` | Create a product |
| `PUT` | `/api/v1/products/:id` | Update a product |
| `DELETE` | `/api/v1/products/:id` | Delete a product |

Before submitting, add your screenshots and any class or repository details you want to include.

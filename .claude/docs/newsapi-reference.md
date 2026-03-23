# NewsAPI.ai Reference (Offline Copy)

Base URL: `https://eventregistry.org/api/v1`
Auth: All requests require `apiKey` as a query parameter.
Use: `process.env.NEXT_PUBLIC_NEWS_API_KEY`

## Key Endpoints

### Get Top Headlines
GET /article/getArticles
Params:
  - apiKey: string (required)
  - keyword: string
  - lang: string (e.g., "eng")
  - categoryUri: string
  - page: number (default: 1)
  - count: number (max 200, default 100)
  - sortBy: "date" | "rel" | "sourceImportance"

Response shape:
```json
{
  "articles": {
    "results": "Article[]",
    "totalResults": "number",
    "page": "number",
    "count": "number",
    "pages": "number"
  }
}
```

### Article Object Shape
```json
{
  "uri": "string",
  "title": "string",
  "body": "string",
  "url": "string",
  "image": "string | null",
  "date": "string (YYYY-MM-DD)",
  "time": "string (HH:MM:SS)",
  "source": { "uri": "string", "title": "string" },
  "category": { "uri": "string", "label": "string" }
}
```

### Search Articles
GET /article/getArticles
Additional params:
  - keyword: string
  - keywordSearchMode: "simple" | "exact" | "phrase"
  - dateStart: string (YYYY-MM-DD)
  - dateEnd: string (YYYY-MM-DD)

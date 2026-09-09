# InvenFlow Client — Final Demo Workflow

## Included lifecycle

Login → Dashboard → Inventory → Purchase Request → Approval → Supplier → Quotation → Purchase Order → Goods Receipt → Invoice → Payment → Reports

## Setup

1. Copy `.env-example` to `.env.local`.
2. Set `NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api`.
3. Run `npm install`.
4. Run `npm run dev`.

## Requirements

- Backend runs at `http://localhost:5000`.
- CORS allows `http://localhost:3000` and the `Authorization` header.
- `GET /api/auth/me` should be implemented for future current-user verification.

The archive deliberately excludes `node_modules`, `.next`, `.env.local`, tokens, and credentials.

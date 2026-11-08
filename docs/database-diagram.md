# Penny Pal Database Diagram

This diagram shows the three tables and how they connect. GitHub renders the
Mermaid block below as a picture.

```mermaid
erDiagram
    profiles ||--o{ budgets : "has many"
    profiles ||--o{ transactions : "has many"

    profiles {
        uuid id PK
        text display_name
        timestamptz created_at
    }
    budgets {
        uuid id PK
        uuid user_id FK
        numeric amount
        date month
        timestamptz created_at
    }
    transactions {
        uuid id PK
        uuid user_id FK
        numeric amount
        text type
        text category
        date occurred_on
        text note
        timestamptz created_at
    }
```

Reading it: one person (profiles) can have many budgets and many transactions.
Each budget and each transaction belongs to exactly one person, linked by
`user_id`. `PK` means the row's own unique id; `FK` means a link to the owner.

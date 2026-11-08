# Penny Pal Database Design

## What does the app need to save?

- **People (accounts):** who each user is, so they can log in and so their data
  belongs only to them. Supabase handles the login; we keep a small profile
  record per person.
- **Budgets:** each person's monthly budget amount, and which month it is for.
- **Transactions:** every money-in or money-out entry a person logs, with the
  amount, whether it is income or an expense, its category, and its date.
- **Categories:** the spending buckets (Food, Rent, Fun) a transaction is tagged
  with. For MVP #1 these are a shared default list defined in the app and stored
  as plain text on each transaction. Custom categories are a later (Epic 4) feature.
- **Note:** weekly amounts are calculated from the monthly budget and the
  transactions, so they are not stored.

## Tables

### Table: profiles
**What it stores:** a small record for each person. The login is handled by
Supabase; this holds anything extra.

| Column | Type | Required? | What it means |
| --- | --- | --- | --- |
| id | uuid | Yes | The person (same id as their login account) |
| display_name | text | No | A name to greet them by |
| created_at | timestamp | Yes (auto) | When the account was made |

**Who can see it?** Only the person themselves.
**Who can add, change, or delete it?** Only the person themselves.

### Table: budgets
**What it stores:** each person's monthly budget.

| Column | Type | Required? | What it means |
| --- | --- | --- | --- |
| id | uuid | Yes | Unique id for this budget |
| user_id | uuid | Yes | Whose budget it is |
| amount | numeric | Yes | The monthly budget amount |
| month | date | Yes | Which month it is for |
| created_at | timestamp | Yes (auto) | When it was saved |

**Who can see it?** Only the owner.
**Who can add, change, or delete it?** Only the owner.

### Table: transactions
**What it stores:** every money-in or money-out entry.

| Column | Type | Required? | What it means |
| --- | --- | --- | --- |
| id | uuid | Yes | Unique id for this entry |
| user_id | uuid | Yes | Whose entry it is |
| amount | numeric | Yes | How much |
| type | text | Yes | "income" or "expense" |
| category | text | No | The bucket (Food, Rent, Fun), or blank for uncategorized |
| occurred_on | date | Yes | The date of the transaction |
| note | text | No | An optional short memo |
| created_at | timestamp | Yes (auto) | When it was logged |

**Who can see it?** Only the owner.
**Who can add, change, or delete it?** Only the owner.

## How the tables connect

- One person can have many budgets. Each budget belongs to one person.
- One person can have many transactions. Each transaction belongs to one person.
- The link is the `user_id` column on budgets and transactions, which holds the
  id of the person who owns that row.

## Access rules (Row Level Security)

Supabase calls these Row Level Security, or RLS. Turn RLS on for every table.

- [ ] RLS is turned on for every table (profiles, budgets, transactions).
- [ ] Each table has a rule that lets people see only their own rows.
- [ ] Tested with two accounts; one person could not see the other person's information.

(These get checked off when we create the tables in Supabase and test them.)

## Database diagram

See `docs/database-diagram.md`, which GitHub renders as a picture.

## Migration files

- [ ] Every change to the database is saved as a SQL migration file in the repo.
- [ ] Each migration file's name says what it does.

(Added when we create the tables in Supabase.)

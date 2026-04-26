---
title: 🔌 Core concept
group: Guides
---

# 🔌 Core concept

This page explains the core concepts behind the BlocksDirecte client.

## 🧱 Client

The {@link Client} is the main entry point of the library.

It handles:
- authentication
- account selection
- access to all API modules

You can init them with just :
```ts
import { Client } from "@blockshub/blocksdirecte";

const client = new Client();
```

## 👤 Accounts
ÉcoleDirecte can return multiple accounts (for example, if you are in a family).

After logging in, you must select which account to use:
```ts
await client.auth.loginUsername(username, password);

client.auth.setAccount(0);
```

You can access the selected account:
```ts
const account = client.auth.getAccount();
```

If no account is selected, this will throw an error.

> ⚠️ You must select an account before making API calls, or an error will be thrown.

## 🧩 Modules

The client is divided into modules, each representing a part of the ÉcoleDirecte. This models follows ÉcoleDirecte principles.

Examples of modules:
- `auth`: authentification & accounts
- `marks`: grades
- `timetable`: schedule
- `schoollife`: absences, delays, etc.

> [!NOTE]
> Some modules may not be available depending on the establishment. If a module is not supported, calling it will throw an error.
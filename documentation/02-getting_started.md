---
title: 🚀 Getting started
group: Guides
---

# 🚀 Getting started

Now that your client is set up, let's authenticate with your ÉcoleDirecte account and make your first API call.

## 🔐 Authentication

You can authenticate in two ways:

> [!NOTE]
> If you're establishment has the 2FA enabled, you can look at these docs about advanced authentification.

### 1. Username / password

```ts

import { Client } from "@blockshub/blocksdirecte";

const client = new Client();
const tokens = await client.auth.loginUsername(username, password);

client.auth.setAccount(0); // Select the account that will be used in your API call.
```

> [!NOTE]
> ÉcoleDirecte may return multiple accounts (e.g. family). You must select one before making API calls.

### 2. Access Token

> [!NOTE]
> Your access token isn't verified by the librairies, make sure you enter good credentials.

```ts
import { Client } from "@blockshub/blocksdirecte";

const client = new Client({
  token: `{{YOUR_ED_TOKEN_HERE}}`,
  accounts: {...YOUR_SAVED_ED_ACCOUNT_HERE},
  selectedAccounts: 1,
});

client.auth.setAccount(0); // Select the account that will be used in your API call.
```

> [!CAUTION]
> Your credentials are private. Always store them in environment variables and never expose them in client-side code.

## ⚡️ Your first API call
Now that you’re authenticated, let’s fetch your account information:

```ts
// Get selected account info.
const account = client.auth.getAccount();

// Log the first name of the users.
console.log(`Hello, ${account.prenom} !`);
```

## 📚 Try something more useful

### Fetch your grades
```ts
const grades = await client.marks.getMark()

for (const grade of grades.notes) {
  console.log(`${grade.devoir} - ${grade.valeur}/${grade.noteSur}`);
}
```

### Get your timetable
```ts
const timetable = await client.timetable.getTimetableBetweenDates(
  new Date("2026-01-10"),
  new Date("2026-01-17")
)

for (const course of timetable) {
  console.log(`${course.matiere} - ${course.start_date} to ${course.end_date}`);
}
```

## ➡️ Next steps

- Learn more about the core concept of BlocksDirecte.
- Handle errors properly.
- Read the references.
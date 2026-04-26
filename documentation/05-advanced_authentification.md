---
title: 🔐 Advanced authentification
group: Guides
---

# 🔐 Advanced authentification
This page explains the full authentication lifecycle of the BlocksDirecte client:

- Login
- Two-Factor Authentication (2FA)
- Account selection

## 🔑 1. Login
Start by logging in with your credentials:

```ts
import { Client } from "@blockshub/blocksdirecte";

const client = new Client();
const session = await client.auth.loginUsername(username, password);
```

At this stage, the client is authenticated but not fully usable until an account is selected.

## 🔐 2. Two-Factor Authentication (2FA)
If the account requires 2FA, the login will throw a Require2FA error.

### Step 1 — Catch the challenge
```ts
import { Require2FA } from "@blockshub/blocksdirecte";

let session;

try {
  session = await client.auth.loginUsername(username, password);
} catch (error) {
  if (error instanceof Require2FA) {
    console.log("2FA required");
  }
}
```

### Step 2 - Get the challenge
```ts
const challenge = await client.auth.get2FAQuestion(error.token);

console.log(challenge.question);
for (const [index, proposition] of questions.propositions.entries()) {
  console.log(`${index} - ${proposition}`);
}
```

### Step 3 - Validate 2FA
```ts
let keys2FA = await client.auth.send2FAQuestion(questions.propositions[0], e.token);
```

### Step 4 - Relogin with 2FA keys
```ts
session = await client.auth.loginUsername(username, password, keys2FA.cn, keys2FA.cv);
```

## 👤 3. Account selection
ÉcoleDirecte accounts may contain multiple profiles (student, parent, etc.).

You must select one before using the API:
```ts
client.auth.setAccount(0);

const account = client.auth.getAccount();
console.log(account.prenom);
```

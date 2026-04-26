---
title: ❗️ Handle errors
group: Guides
---

# ❗️ Handle errors

All errors thrown by the BlocksDirecte client are standard JavaScript errors with additional context when available.

## ⚠️ Common error cases

### Invalid Account Selected

Thrown when no account are selected. To learn more, read the [Getting started guide](02-getting_started.md).

```ts
try {
  const grades = await client.marks.getMark();
} catch (error) {
  if (error instanceof InvalidAccountSelected) {
	console.log('No account selected at this point.')
  }
}
```

### Require2FAKey

Thrown when the current account require 2FA. To learn more, read the [Advanced authentification guide](05-advanced_authentification.md).

```ts
try {
  tokens = await client.auth.loginUsername(username, password);
} catch (e) {
  if (e instanceof Require2FA) {
	console.log("This account require 2FA.")

	const questions = await client.auth.get2FAQuestion(e.token);

	console.log(questions.question + "\n");

	for (const [index, proposition] of questions.propositions.entries()) {
	  console.log(`${index} - ${proposition}`);
	}
  }
}
```

## 🧠 Best practices

* Always wrap API calls in try/catch
* Check for specific error types using instanceof
* Handle authentication errors before calling modules
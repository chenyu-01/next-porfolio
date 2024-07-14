---
title: JWT and the whole process of authentication and authorization
toc: true
---

# The Process of JWT Authentication

I was always confused about the term `JWT` and now I understands it better. I will try to explain to myself in case I forget it in the future. Most of the content here is based on my conversation with ChatGPT and some other resources on the internet. I will try to explain it in a simple way.

## An overview of authentication and authorization

Imagine we are using a e-commerse website like Amazon and we want to authenticate the user. The traditional way is to use a session cookie. The server will create a session cookie and send it to the client. The client will store the cookie and send it back to the server in every request. The server will then check the cookie to see if the user is authenticated.

However, this method has some drawbacks. For example, the server needs to store the session in the database, which is not efficient in a distributed environment. Also, the server needs to send the cookie in every request, which is not secure. If the cookie is stolen, the attacker can impersonate the user.

To solve these problems, we can use `JWT`, which stands for **JSON Web Token**. `JWT` is a stateless authentication method, which means the server does not need to store the session in the database. Instead, the server will create a `JWT` token and send it to the client. The client will store the token and send it back to the server in every request. The server will then verify the token to see if the user is authenticated. It contains 3 parts: `header`, `payload`, and `signature`. `header` and `payload` is signed using a secret or a public/private key pair and generate out a `signature`, which means the verifier do not need to store the token in the database. That's why we think it as one of stateless auth methods and can be used in a distributed environment.

## The process of authentication and authorization using `JWT`

In the process of authentication and authorization, there are 3 parties involved: the client, the server, and the verifier. The client is the user who wants to access the resources. The server is the entity that provides the resources. The verifier is the entity that checks if the user is authenticated.

Still using the e-commerce website as an example, let's say Brett wants to see all transactions on his Amazon account. As we introduced, Amazon server will create a `JWT` token and send it to the client, Brett's browser, after he correctly typed in his email and password. The client will store the token and send it back to the server in every request, when he goes to the transaction history page. The server will then verify the token to see if the user is authenticated.

But wait, how does the server know if the token is valid? The answer is the secret key. The server will use the secret key to sign the token when creating it. When the client sends the `JWT` back to the server, the server will use the secret key to verify the token. If the token is valid, the server will allow the user to access the resources.

## OK, but what exactly happened behind the scenes?

To explain this, we need to break down all stpes of generating `JWT`:

1. Get `Header`: It contains the type of token and the algorithm used to sign the token. Here is an example of a `header`:

```json
{
  "alg": "HS256", // algorithm used to sign the token
  "typ": "`JWT`" // type of token
}
```

2. Get `Payload`: It contains the claims. Claims are statements about an entity (typically, the user) and additional data. There are three types of claims: registered, public, and private claims. Here is an example of a `payload`:

```json
{
  "sub": "1234567890", // subject of the token
  "name": "Brett", // name of the user
  "admin": true // admin status of the user
}
```

3. Encode `header` and `payload` in `base64` and concatinate them with a period `.` character between them.

```bash
`Header`.`Payload`
```

4. Hashing and Signing:

- Hashing: A hash of this concatenated string (`header`.`payload`) is typically generated as part of the signing process. This hash is what actually gets signed, ensuring that any change in either the `header` or the `payload` would result in a different hash, thereby invalidating the `signature`.
- Signing: In the symmetric method, this hash is then signed using a secret key known only to the issuer and the verifying parties. The signing algorithm specified in the `JWT`'s `header` (such as HS256 for HMAC SHA-256) dictates how the hash is processed with the secret key to produce the `signature`.

5. Encode the `signature` in `base64` and concatinate it with the previous result with a period `.` character between them.

```bash
`Header`.`Payload`.`Signature`
```

Where `header`, `payload`, and `Signature` are `base64` encoded. The real token will look like this:

The real token will look like this:

```bash
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkJyZXR0IiwiYWRtaW4iOnRydWV9.TU9vZG9vQ2FyZQ
```

When `JWT` is sent to server, the server will decode the token and we can get these three parts. The server concatenates the encoded `header` and encoded `payload` just like step 3.

Then, the server uses the same secret key and the same algorithm specified in the `JWT`’s `header` to generate a verification `signature` from this concatenated string. If the generated `signature` matches the `signature` in the `JWT`, the server will allow the user to access the resources.

## Going futher: the asymetric way of signing the `JWT`

The previous explaination is based on the symmetric way of signing the `JWT`. However, there is another way to sign the `JWT`, which is the asymmetric way. In the asymmetric way, there are two keys: public key and private key.

We need to understand the concept of asymmetric encryption first before we dive deep in. However, I am not going to explain all these concepts. Here is an online link resources to help you understand it better, but with the example of ssl in websites: [A Gentle Introduction to Asymmetric Encryption and SSL Certificates](https://dzone.com/articles/a-gentle-introduction-to-asymmetric-encryption-and)

If you know how this works, then you can understand the concept of the asymmetric way of signing the `JWT`. In the asymmetric way, the server will use the private key to sign the token when creating it. When the client sends the `JWT` back to the server, the server will use the public key to verify the token. If the token is valid, the server will allow the user to access the resources. Sounds exactly the same as the symmetric way, right? But not exactly the same.

## The issuing and verifying process in the asymmetric way

In the asymmetric wayk, the server indeed encode `header`, `payload`, then sign out `signature` just like we have explained in symmetric way. The difference is not only the public key that is used to verify the token, but also the process of verification is different. Here is the process:

1. When generating the `JWT`, the `issuer` will use the private key to sign the hash of the `header` and `payload` with algorithm specified in `header`. The `signature` is encoded together with the `header` and `payload` using `base64`, resulting in a Json Web Token that sends to client.

2. When recieving `JWT`, the `verifier` will decode the `JWT` using `base64`. The verifier will get the `header`, `payload`, and `signature` from this process.

3. The `verifier` will get the original hash by decrypting the `signature` with the specified algorithm in `header` with private key.

4. The `verifier` will calculate the original hash of the `header` and `payload` again.

5. The `verifier` will compare the original hash with the revealed hash to verify if this is a valid `signature`.

The main difference between the symmetric and asymmetric way is that the `verifier` is trying to compare hash. And they are using different algorithms to sign the `JWT`.

Notice how we switched our terminology from `server` and `client` to `issuer` and `verifier`. This is because the `issuer` is the one who creates the `JWT` and the `verifier` is the one who verifies the `JWT`. The `issuer` and `verifier` can be the same entity or different entities. When in distributed environment, the `issuer` and `verifier` are usually different entities.

## A clarification on the concept of asymmetric encryption

Usually when people talk about the asymmetric encryption like on [Wikipedia - Public-key cryptography](https://en.wikipedia.org/wiki/Public-key_cryptography), the public key is used to encrypt the data and the private key is used to decrypt the data. In this article, we describe the asymmetric way to sign the `JWT` conceptually reversed: the private key is used to sign the data and the public key is used to verify the `signature`.

In the context of encrypting data for confidentiality, the public key is used to encrypt data, and the corresponding private key is used to decrypt it. This ensures that only the holder of the private key can access the original data, making it a secure way to send sensitive information. If something is encrypted with a public key, indeed, only the matching private key can decrypt it.

For digital `signature`s, which are used with `JWT`s, the roles are conceptually reversed:

- The private key is used to sign data (or a hash of the data), producing a digital `signature`. This proves the identity of the sender and ensures the data hasn't been tampered with after being signed.
- The public key is used to verify the `signature`. If the `signature` checks out, it confirms the data was signed by the matching private key and hasn't been altered.

## Additional resources

- [JWT.io](https://jwt.io/) a playground to decode, verify, and generate `JWT`s.
- [Base-64-Decode](https://www.base64decode.org/) a tool to decode `base64` encoded strings.

# How it works

{% hint style="warning" %}
Under construction! This page isn't fully fleshed out just yet.
{% endhint %}

{% hint style="info" %}
This page contains information about the implementation of this specific demo. It might be helpful for users who want to fork the demo and make modifications.
{% endhint %}

Authenticating a visitor happens in 3 steps.

1. An unauthorized user attempts to view our GitBook docs and is sent to our fallback URL
2. We put them through our OAuth procedure
3. We send the user back to our GitBook docs with a signed jwt, proving their authorization

Lets go through the steps.

## Step 1: Unauthorized user attempts to access docs.

Lets say a user clicks a link to your documentation, which is protected by visitor authentication, and that user is not already authenticated. GitBook will check whether the user is authenticated, and if not, will send the user to your defined fallback URL. Make sure to set the fallback URL in GitBook to wherever you publicly serve your visitor auth flow handler. This corresponds to the `/gitbook-visitor-auth-endpoint`, as implemented in the demo. We'll talk about what that route handler does in the next step.

## Step 2: The OAuth procedure

We'll use the OAuth Authorization Code flow to check with our OAuth server that the user is signed in. We won't cover the 

{% hint style="info" %}
In this demo, we're using the OAuth 2.0 Authorization Code flow, since we have a back-end, and therefore can keep our client secret confidential. Per the OAuth 2.0 specification, this means our OAuth Client can be a "Confidential" client, rather than a "Public" client. This gives us a little added security, in that we can disable flows that do not require the client secret, such as the Authorization Code With PKCE flow, and the Implicit Grant flow.

GitBook does expect you to use any specific OAuth flow. You could implement a Visitor Auth handler entirely in the client side either using one of the public app OAuth flows, or some other auth mechanism entirely - but this demo is focused on authorizing users on the server using OAuth.
{% endhint %}

To begin the OAuth Authorization Code flow, we will redirect the user to our OAuth authorization URL with all the necessary information.

## Step 3: Sending the user back to the docs with the signed JWT.

Now that the visitor is logged in, and we have confirmed their identity with our OAuth provider, we can send them back to our GitBook documentation. However, we need to prove to GitBook that 


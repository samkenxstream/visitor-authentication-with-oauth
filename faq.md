# FAQ

### Can I make my docs available based on stricter criteria?

Yes. In the OAuth Redirect URI endpoint, \(`/oauth-verification`\), you can make the decision on whether to issue a signed JWT based on whatever criteria you like. At this point you have an access token for your user - you could use this to make a request to an API to get information to use in your decision.

### Can I restrict certain pages to certain users?

No, all pages in a space are accessible to users who have been granted access with a JWT. If you would like to make certain documentation available to a certain subset of users, you need to put those docs in their own space, and have your Visitor Auth implementation manage who can see which space.


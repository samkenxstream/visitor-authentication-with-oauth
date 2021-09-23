# Setup

## Gathering prerequisites

### From GitBook

This demo requires information from your GitBook space, as well as some information from your OAuth server. Begin by enabling Visitor Authentication in the Share menu of your GitBook space. Make note of your signing key and redirect URI - you'll need these later.

### From Your OAuth 2.0 Provider

A second prerequisite is the information about your OAuth Client. You should set up a dedicated OAuth Client with your OAuth Provider for use with GitBook Visitor Auth. You'll need to get and keep your Client ID, and Client Secret, which will be provided to our code via Environmental Variables. You'll also need to know the OAuth Provider's authorize URL and token exchange endpoint, which our code will use during the OAuth process. These are not usually specific to your client, so they're most likely to be found in the auth guide for your OAuth API.

You'll also need to associate a Redirect URI with your OAuth Client. This is for when the OAuth server redirects your visitor back to your Visitor Auth handler once the visitor has logged in. For security reasons, OAuth servers only allow the user to be redirected to predefined URLs, which is why you have to set this first. Your Redirect URI is the `/oauth-verification` endpoint of this demo app. It should look like:`https://{the-domain-where-you-host-your-visitor-auth-handler}/oauth-verification`

Keep track of this Redirect URI, because you'll need to provide it as an environmental variable later.

## Deploying

{% hint style="info" %}
This code should be treated as a reference implementation, and is not guaranteed to be suitable for production.
{% endhint %}

This demo is a Node.JS application, suitable for deployment to your favorite Node.JS app host. While it hasn't been tested, it should be compatible with services like Heroku, Google App Engine, Glitch, and it's relatively trivial to port it to a serverless system like Google Cloud Functions, Netlify functions, or similar.

The app requires several secrets, though, which it reads from environmental variables. You'll need to provide these environmental variables to the handler.

| Environment Variable | Description |
| :--- | :--- |
| OAUTH\_CLIENT\_ID | The client ID of your application, provided by your OAuth Provider |
| OAUTH\_CLIENT\_SECRET | The client secret associated with your client ID |
| OAUTH\_AUTHORIZATION\_ENDPOINT | The URL your users log in at. This is usually on the OAuth Server |
| OAUTH\_TOKEN\_ENDPOINT | The API endpoint your OAuth Server provides to facilitate your exchanging an OAuth authorization code for an Access Token, finishing the OAuth process |
| OAUTH\_REDIRECT\_URI | The Redirect URI you defined earlier. It's the `/oauth-verification` endpoint of this demo app, but as a fully qualified URL including protocol, and hostname, etc. |
| GITBOOK\_DOCUMENTATION\_URL | The URL of your documentation on GitBook. For this page, that's `https://gitbook.gitbook.com/visitor-auth-oauth-guide` |
| GITBOOK\_SIGNING\_SECRET | The secret key that GitBook provides. You will use this to sign your JWT, which proves to GitBook that the user is authorized to view your docs. |

Once you've deployed your site to your host \(or if you're running the demo locally for testing\), copy the URL of your deployed auth handler, with the path `/gitbook-visitor-auth-endpoint`. In the Visitor Authentication section of the Share panel of your GitBook space, you should insert this URL as the "Fallback URL". This is where GitBook will send users who are not already authenticated, or whose auth session has expired. If you're running the demo locally, this URL is `http://localhost:3000/gitbook-visitor-auth-endpoint`, but in production you should use your deployed endpoint with your host. This URL does not have to use that exact path - but if you want to rename it, make sure to update the route in the source code as well as the fallback URL in the GitBook Visitor Auth configuration section.

## Testing it out

At this point, try visiting your docs in a private browser window. You should be redirected first to your auth handler, and then to your OAuth Authorization endpoint. When you log in, you should be redirected back to your auth handler to get a signed JWT, and then on to the documentation in GitBook. Now, your documentation is protected with Visitor Authentication, and you are good to go!


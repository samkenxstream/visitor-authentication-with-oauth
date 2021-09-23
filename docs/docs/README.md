# GitBook Visitor Authentication with OAuth

This is a demo implementation of an authentication implementation for use in [GitBook Visitor Authentication](https://docs.gitbook.com/features/visitor-authentication). It aims to provide a reference for how to use an OAuth server to grant visitors access to your documentation.

In this demo, we will allow visitors to our documentation to see our docs, only if they successfully authenticate with our OAuth server. This way, we can use an existing log in system to protect our documentation, speeding us up, and integrating with our existing user logins, and without having to implement a password system from scratch.

{% hint style="warning" %}
We don't recommend using an arbitrary 3rd party OAuth system to manage access without further restrictions. This demo allows any user of the chosen OAuth system to access the documentation. It could be extended to restrict access further.
{% endhint %}

If your organization doesn't have an existing OAuth 2.0 implementation that you can use to identify customers, you could use a service such as Auth0 to set up your own OAuth 2.0 server, and manage your users. Auth0 allows you to set up an OAuth Client, which is required to go through the Authorization Code flow that this demo uses.

See the code on our [GitHub repository](https://github.com/GitbookIO/visitor-authentication-with-oauth/).

Check out our [visual overview of the authorization procedure](https://miro.com/app/board/o9J_lvwgIFE=/).

When you're ready, dive into the setup instructions.

{% page-ref page="../setup.md" %}

## License

This demo code is licensed under the [Apache-2.0 license](https://github.com/GitbookIO/visitor-authentication-with-oauth/blob/main/LICENSE).


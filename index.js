import express from "express";
import jwt from "jsonwebtoken";
import fetch from "node-fetch";

const app = express();
const port = process.env.PORT || 3000;

const {
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  OAUTH_API_REDIRECT_URL,
  OAUTH_TOKEN_EXCHANGE_URL,
  GITBOOK_REDIRECT_URL,
  GITBOOK_SIGNING_SECRET,
} = process.env;

/*
 * TODO: Set the URL to your Visitor Auth Flow Handler
 */
const OAUTH_INBOUND_REDIRECT_URI = "http://localhost:3000/oauth-verification";

/*
 * Here is where your Auth Implementation starts the OAuth procedure
 */
app.get("/gitbook-visitor-auth-endpoint", (req, res) => {
  console.log("Inbound visitor authentication request");
  const authParameters = {
    client_id: OAUTH_CLIENT_ID,
    client_secret: OAUTH_CLIENT_SECRET,
    response_type: "code",
    redirect_uri: OAUTH_INBOUND_REDIRECT_URI,
  };
  const outboundRedirectURI = `${OAUTH_API_REDIRECT_URL}?${new URLSearchParams(
    authParameters
  ).toString()}`;

  res.redirect(outboundRedirectURI);
});

/*
 * Here is where your Auth Implementation receives a code. It checks with the
 * OAuth server that the code is valid. If it is, it will send the user back
 * to GitBook with a signed token, so that they can view your docs.
 */
app.get("/oauth-verification", async (req, res) => {
  if (req.query["access_denied"] || !req.query["code"]) {
    console.log(
      `The visitor likely rejected permission in our oauth provider's dialog`
    );
    // You could return your own error page here if you like.
    res.status("401");
    res.send("Forbidden");
  } else {
    const isValidCode = await verifyCode(req.query["code"]);
    if (!isValidCode) {
      console.log("Could not exchange oauth code for oauth access token");
      res.status("401");
      res.send("Forbidden");
      return;
    }
    const signedJWT = jwt.sign({}, GITBOOK_SIGNING_SECRET);
    const gitBookRedirectParams = {
      jwt_token: signedJWT,
    };
    res.redirect(
      `${GITBOOK_REDIRECT_URL}?${new URLSearchParams(
        gitBookRedirectParams
      ).toString()}`
    );
    console.log("Successful visitor authentication token sign");
  }
});

/*
 * This function checks with the OAuth server that the code we received is valid.
 * This step is known as "Access Token Request" in the OAuth 2.0 spec
 * (IETF RFC 6749)
 */
async function verifyCode(code) {
  const tokenVerificationResponse = await fetch(OAUTH_TOKEN_EXCHANGE_URL, {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      // Some OAuth servers require client information in the authorization header,
      // rather than in the request body as below.
      // authorization: `Bearer ${Buffer.from(
      //   `${OAUTH_CLIENT_ID}:${OAUTH_CLIENT_SECRET}`
      // ).toString("base64")}`,
    },
    method: "POST",
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: OAUTH_CLIENT_ID,
      client_secret: OAUTH_CLIENT_SECRET,
      code,
      redirect_uri: OAUTH_INBOUND_REDIRECT_URI,
    }).toString(),
  });

  const data = await tokenVerificationResponse.json();

  return data.hasOwnProperty("access_token");
}

app.listen(port, () => {
  console.log(
    `GitBook Visitor Auth Demo app listening at http://localhost:${port}`
  );
});

export function buildConfirmationEmail(confirmUrl: string, baseUrl: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Confirm your Corki waitlist spot</title>
  <!--[if !mso]><!-->
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
  <!--<![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#0D0906;font-family:'DM Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0D0906">
    <tr>
      <td align="center" style="padding:48px 24px">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px">

          <!-- Logo + Wordmark -->
          <tr>
            <td align="center" style="padding-bottom:36px">
              <img src="${baseUrl}/icon/CorkiLogo.png" alt="Corki" width="36" height="36" style="display:inline-block;vertical-align:middle;margin-right:10px;width:36px;height:36px" />
              <span style="font-family:'Playfair Display',Georgia,serif;font-size:32px;font-weight:500;color:#F9F6F4;letter-spacing:-0.5px;vertical-align:middle">Corki</span>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background-color:#1E1511;border:1px solid rgba(123,51,70,0.2);border-radius:16px;padding:44px 32px">

              <!-- Burgundy accent line -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-bottom:28px">
                    <div style="width:48px;height:3px;border-radius:2px;background:linear-gradient(90deg,#7B3346,#9C4B61)"></div>
                  </td>
                </tr>
              </table>

              <h1 style="margin:0 0 12px;font-family:'Playfair Display',Georgia,serif;font-size:24px;font-weight:500;letter-spacing:-0.3px;color:#F9F6F4;text-align:center">
                Confirm your spot
              </h1>

              <p style="margin:0 0 32px;font-family:'DM Sans',-apple-system,sans-serif;font-size:15px;line-height:1.65;color:#A39B95;text-align:center">
                You signed up for the Corki waitlist. Click below to confirm your email and secure your spot.
              </p>

              <!-- CTA button -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <!--[if mso]>
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" href="${confirmUrl}" style="height:48px;v-text-anchor:middle;width:220px;" arcsize="25%" fillcolor="#C27B2E">
                      <w:anchorlock/>
                      <center style="color:#120D0A;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:600;">Confirm my email</center>
                    </v:roundrect>
                    <![endif]-->
                    <!--[if !mso]><!-->
                    <a href="${confirmUrl}"
                       target="_blank"
                       style="display:inline-block;padding:14px 36px;background:linear-gradient(135deg,#D4944A 0%,#C27B2E 100%);color:#120D0A;font-family:'DM Sans',-apple-system,sans-serif;font-size:15px;font-weight:600;text-decoration:none;border-radius:12px;box-shadow:0 4px 24px rgba(194,123,46,0.35)">
                      Confirm my email
                    </a>
                    <!--<![endif]-->
                  </td>
                </tr>
              </table>

              <p style="margin:32px 0 0;font-family:'DM Sans',-apple-system,sans-serif;font-size:13px;line-height:1.5;color:#6B6460;text-align:center">
                If you didn&rsquo;t sign up for Corki, you can safely ignore this email.
              </p>

            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td align="center" style="padding:24px 0 16px">
              <div style="width:100%;height:1px;background:linear-gradient(to right,transparent,rgba(123,51,70,0.25) 30%,rgba(194,123,46,0.15) 50%,rgba(123,51,70,0.25) 70%,transparent)"></div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="text-align:center">
              <p style="margin:0;font-family:'DM Sans',-apple-system,sans-serif;font-size:12px;color:#4A4541">
                &copy; ${new Date().getFullYear()} Corki &middot; Wine&rsquo;s Best Friend
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

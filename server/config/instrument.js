// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node"

Sentry.init({
  dsn: "https://da91f198c1a2ae66b85c2a36a0ee501b@o4509864617771008.ingest.us.sentry.io/4509864629239808",
  integrations:
   [Sentry.mongooseIntegration()],
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});
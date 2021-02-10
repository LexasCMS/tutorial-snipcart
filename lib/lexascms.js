import Base64 from 'base-64';
import { GraphQLClient } from "graphql-request";

export function request({ query, variables, requestContext }) {
  // Define space ID
  const spaceId = process.env.LEXASCMS_SPACE_ID;
  // Define API key
  const apiKey = null;
  // Define headers
  const headers = {};
  // Add Authorization header if required
  if (apiKey !== null) {
    headers['Authorization'] = `Bearer ${apiKey}`;
  }
  // Handle LexasCMS request context
  if (requestContext !== undefined) {
    let lexascmsRequestContext = requestContext;
    if (typeof lexascmsRequestContext !== 'string') {
      lexascmsRequestContext = Base64.encode(JSON.stringify(requestContext));
    }
    headers['x-lexascms-context'] = lexascmsRequestContext;
  }
  // Create client
  const client = new GraphQLClient(`https://${spaceId}.spaces.lexascms.com/delivery/graphql`);
  // Send request
  return client.request(query, variables, headers);
}
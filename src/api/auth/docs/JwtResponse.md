
# JwtResponse


## Properties

Name | Type
------------ | -------------
`token` | string
`type` | string
`id` | number
`username` | string
`roles` | Array&lt;string&gt;

## Example

```typescript
import type { JwtResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "token": null,
  "type": Bearer,
  "id": null,
  "username": null,
  "roles": null,
} satisfies JwtResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JwtResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



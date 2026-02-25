
# ScheduleRequest


## Properties

Name | Type
------------ | -------------
`reportId` | number
`cronExpression` | string
`emails` | Array&lt;string&gt;

## Example

```typescript
import type { ScheduleRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "reportId": null,
  "cronExpression": null,
  "emails": null,
} satisfies ScheduleRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ScheduleRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



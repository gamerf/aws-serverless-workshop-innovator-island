// Invoked by an SNS topic, publishes events to EventBridge default bus:
// 1. DetailType "waitTimes" - individual ride times per event
// 2. DetailType "waitTimesSummary" - aggregated ride times

const AWS = require('aws-sdk')
AWS.config.region = process.env.AWS_REGION 
const eventbridge = new AWS.EventBridge()
const MAX_ENTRIES = 10

exports.handler = async (event) => {

  const sns = event.Records[0].Sns
  const time = sns.Timestamp
  const message = JSON.parse(sns.Message)

  // Only interested in ride time summaries
  if (message.type !== 'summary') return

  // Convert stringified message into JSON object
  const msg = JSON.parse(message.msg)

  let params = {
    Entries: []
  }

  // Interate through in batches and push to EventBridge
  for (let i = 0; i < msg.length; i++) {
    const ride = msg[i]

    params.Entries.push({
      // Event envelope fields
      //TODO Implementation
  
      // Main event body
      //TODO Implementation
    })
    
    // Maximum size of Entries for EventBridge is 10    
    if (params.Entries.length === MAX_ENTRIES) {
      //TODO Implementation
      params.Entries = []
    }
  }

  // Clear anything left in the batch
  if (params.Entries.length > 0 ) {
    console.log(params)
    console.log(await eventbridge.putEvents(params).promise())
  } 
  
  // Post summary messsage to EventBridge with all contents
  //TODO Implementation
}
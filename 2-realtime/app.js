/*! Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: MIT-0
 */

const AWS = require('aws-sdk')
const ddb = new AWS.DynamoDB.DocumentClient()
const iotdata = new AWS.IotData({ endpoint: process.env.IOT_DATA_ENDPOINT })

/* MODULE 2 - Real-time ride wait times

   This function listens to an SNS topic published by the Flow & Traffic Controller
   which provides ride waiting times throughout the park. The handler stores the 
   latest message in DynamoDB and publishes the message to the IoT topic, which
   will then publish to the front end. */

// Commits the latest message to DynamoDB
const saveToDDB = async function (message) {
// TO DO - use DDB_TABLE_NAME as environment variable to refer to the DynamoDB table
}

// Publishes the message to the IoT topic
const iotPublish = async function (topic, message) {
// TO DO
};

// The handler invoked by Lambda.
exports.handler = async (event) => {
    const message = JSON.parse(event.Records[0].Sns.Message)
    console.log('From SNS:', message)

    // Save ride time summary to DDB
    if (message.type === 'summary') {
        await saveToDDB(message.msg)
    }
    await iotPublish(process.env.IOT_TOPIC, message)

    return message
}

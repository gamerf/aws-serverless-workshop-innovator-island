/*! Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: MIT-0
 */

// Libraries
const AWS = require('aws-sdk')
AWS.config.update({region: process.env.AWS_REGION})
const firehose = new AWS.Firehose()

const DeliveryStreamName = process.env.streamName || 'theme-park-streaming-data'
const BATCH_LIMIT = 500
let batch = []
let sequenceId = 1

// Simple mechanism for dispatching messages to Kinesis

// Adds a new message to the current Kinesis batch
const addToBatch = async (message) => {
  // console.log(message)
  batch.push(JSON.stringify(message))
  // console.log('Added msg - ', batch.length)
  if (batch.length === BATCH_LIMIT) {
    await flushBatch()
    batch = []
  }
}

// Flushes the batch to Kinesis
const flushBatch = async () => {
  const params = {
    DeliveryStreamName,
    Records: []
  }

  if (batch.length === 0) {
    return console.log('Empty batch - exiting')
  }

  batch.forEach(function (msg) {
    params.Records.push({"Data": msg})
  })

  console.log(params)
  //TODO implementation - put record on Kinesis Firehose
}

// Exports
module.exports = {
  addToBatch,
  flushBatch
}

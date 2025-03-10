/*! Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: MIT-0
 */


'use strict'

const AWS = require('aws-sdk')
AWS.config.update({ region: process.argv[2] })

const translate = new AWS.Translate()
const fs = require('fs')
const messages = require('./translations-input.json')

// A support list of languages and short codes is found here: https://docs.aws.amazon.com/translate/latest/dg/how-it-works.html#how-it-works-language-codes
const possibleLanguages = ['ar','zh','zh-TW','cs','da','nl','fi','fr','de','he','hi','id','it','ja','ko','ms','no','fa','pl','pt','ru','es','sv','tr']

// The maximum number of characters you can submit in a single Translate request.
// This truncates the input, so only the first MAX_LENGTH characters will be translated.
const MAX_LENGTH = 5000   

// MODIFY THIS LINE - The language list for translation
const targetLanguages = ['fr','es','ja']
const outputFileName = './translations.json'

const translateText = async (originalText, targetLanguageCode) => {
    const params = {
      Text: originalText.substring(0, MAX_LENGTH),
      SourceLanguageCode: "auto",
      TargetLanguageCode: targetLanguageCode
  }

  try {
    console.log(`Translating to ${targetLanguageCode}: ${originalText} `)
    const result = await translate.translateText(params).promise()

    // Introduce a slight delay to avoid throttling on the AWS Translate service
    // In production systems, you can raise your throttling limits as needed
    return new Promise((resolve) => {
      setTimeout(() => resolve(result.TranslatedText), 500)
    })

  } catch (err) {
    console.error(err)
  }
}

// main()
const main = async () => {

  // Make sure list entered matches allowed language codes
  //TO DO

  // Initialize translations array
  //TO DO

  // For each language selected...
  //TO DO
    // For each category...
    //TO DO
      // For each phrases
      //TO DO

  // Await for all promises to resolve
  await Promise.all(pArray)

  // Here are the results
  console.log(translations)  

  // Write to the local file system.
  fs.writeFileSync(outputFileName, JSON.stringify(translations, null, 2))
}

if(!process.argv[2])
  return console.error('Missing REGION in command line parameters.')

main()

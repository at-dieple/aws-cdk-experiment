#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AwsCdkExperimentStack } from '../lib/aws-cdk-experiment-stack';

const app = new cdk.App();
new AwsCdkExperimentStack(app, 'AwsCdkExperimentStack');

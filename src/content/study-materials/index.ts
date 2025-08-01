
import { introToProgramming } from './intro-to-programming';
import { discreteMathematics } from './discrete-mathematics';
import { dataStructures } from './data-structures';
import { algorithms } from './algorithms';
import { objectOrientedProgramming } from './object-oriented-programming';
import { operatingSystems } from './operating-systems';
import { computerNetworks } from './computer-networks';
import { databaseSystems } from './database-systems';
import { softwareEngineering } from './software-engineering';
import { webDevelopment } from './web-development';
import { cybersecurity } from './cybersecurity';
import { compilerDesign } from './compiler-design';
import { machineLearning } from './machine-learning';
import { artificialIntelligence } from './artificial-intelligence';
import { blockchain } from './blockchain';

export const studyTopics = [
  introToProgramming,
  discreteMathematics,
  dataStructures,
  algorithms,
  objectOrientedProgramming,
  operatingSystems,
  computerNetworks,
  databaseSystems,
  softwareEngineering,
  webDevelopment,
  cybersecurity,
  compilerDesign,
  machineLearning,
  artificialIntelligence,
  blockchain,
];

export const getTopicBySlug = (slug: string) => {
    return studyTopics.find(topic => topic.slug === slug);
}

import VelocityRepository from 'domain/interfaces/velocityRepository';
import velocityOptions from './velocityOptions';

export default function velocityRepository(): VelocityRepository {
  return {
    getAvailableOptions() {
      return velocityOptions;
    },
  };
}

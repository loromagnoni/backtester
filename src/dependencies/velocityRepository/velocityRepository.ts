import VelocityRepository from 'domain/dependencies/repositories/velocityRepository';
import velocityOptions from './velocityOptions';

export default function velocityRepository(): VelocityRepository {
  return {
    getAvailableOptions() {
      return velocityOptions;
    },
  };
}

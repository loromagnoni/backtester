import VelocityOption from './velocity';

export default interface VelocityRepository {
  getAvailableOptions(): VelocityOption[];
}

import VelocityOption from 'domain/models/velocity';

export default interface VelocityRepository {
  getAvailableOptions(): VelocityOption[];
}

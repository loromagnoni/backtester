import VelocityRepository from 'domain/dependencies/repositories/velocityRepository';

interface GetAvailableVelocitiesDependencies {
  velocityRepository: VelocityRepository;
}

export default function getAvailableVelocities({
  velocityRepository,
}: GetAvailableVelocitiesDependencies) {
  return velocityRepository.getAvailableOptions();
}

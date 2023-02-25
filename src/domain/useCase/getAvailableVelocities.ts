import VelocityRepository from 'domain/interfaces/velocityRepository';

interface GetAvailableVelocitiesDependencies {
  velocityRepository: VelocityRepository;
}

export default function getAvailableVelocities({
  velocityRepository,
}: GetAvailableVelocitiesDependencies) {
  return velocityRepository.getAvailableOptions();
}

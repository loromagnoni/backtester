import TimeframeRepository from 'domain/dependencies/repositories/timeframeRepository';

interface GetAvailableTimeframesDependencies {
  timeframeRepository: TimeframeRepository;
}

export default function getAvailableTimeframes({
  timeframeRepository,
}: GetAvailableTimeframesDependencies) {
  return timeframeRepository.getAvailableTimeframes();
}

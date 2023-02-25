import TimeframeRepository from 'domain/interfaces/timeframeRepository';

interface GetAvailableTimeframesDependencies {
  timeframeRepository: TimeframeRepository;
}

export default function getAvailableTimeframes({
  timeframeRepository,
}: GetAvailableTimeframesDependencies) {
  return timeframeRepository.getAvailableTimeframes();
}

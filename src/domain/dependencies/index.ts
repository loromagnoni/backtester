import ChartManager from 'domain/dependencies/managers/chartManager';
import MessageManager from 'domain/dependencies/managers/messageManager';
import ReplayManager from 'domain/dependencies/managers/replayManager';
import AssetRepository from 'domain/dependencies/repositories/assetRepository/assetRepository';
import TimeframeRepository from 'domain/dependencies/repositories/timeframeRepository';
import VelocityRepository from 'domain/dependencies/repositories/velocityRepository';

export default interface Dependencies {
  chartManager: ChartManager;
  messageManager: MessageManager;
  replayManager: ReplayManager;
  assetRepository: AssetRepository;
  timeframeRepository: TimeframeRepository;
  velocityRepository: VelocityRepository;
}

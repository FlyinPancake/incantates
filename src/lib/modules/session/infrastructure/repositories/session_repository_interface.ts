import type { RpgCampaign, RpgSession } from '@prisma/client';

export interface SessionRepositoryInterface {
	createSession(session: RpgSession, campaign: RpgCampaign): Promise<RpgSession>;
}

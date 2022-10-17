import type { RpgCampaign, RpgEncounter, RpgPlayer, RpgSession } from '@prisma/client';

export type RpgCampaignRelations = RpgCampaign & {
	players?: RpgPlayer[];
	sessions?: RpgSessionRelations[];
};

export type RpgSessionRelations = RpgSession & {
	encounters?: RpgEncounter[];
};

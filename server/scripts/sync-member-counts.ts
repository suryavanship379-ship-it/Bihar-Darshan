/**
 * One-off script: sync membersCount on the Community table by counting
 * actual rows in CommunityMember for each community.
 *
 * Run with:
 *   npx ts-node --project tsconfig.json scripts/sync-member-counts.ts
 */

import { prisma as db } from '../src/db';

async function main() {
  const communities = await db.community.findMany({ select: { id: true, name: true } });

  for (const community of communities) {
    const count = await db.communityMember.count({
      where: { communityId: community.id },
    });

    await db.community.update({
      where: { id: community.id },
      data: { membersCount: count },
    });

    console.log(`✅  "${community.name}" → membersCount = ${count}`);
  }

  console.log('\nAll community member counts synced successfully.');
}

main()
  .catch((err) => {
    console.error('Error syncing member counts:', err);
    process.exit(1);
  })
  .finally(() => db.$disconnect());

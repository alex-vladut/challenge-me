import EntityId from '../entity_id';

interface Challenge {
    id: EntityId,
    ownerId: EntityId,
    opponentId: EntityId,
    refereeId: EntityId,
    title: string,
    deadline: string,
    version: number
};

export default Challenge;
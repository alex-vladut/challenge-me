import EntityId from '../../entity_id';
import entityIdService from '../../entity_id_service';
import Challenge from '../Challenge';

//TODO Vaidate the input
const create = ({
    ownerId,
    opponentId,
    refereeId,
    title,
    deadline
}: {
    ownerId: EntityId,
    opponentId: EntityId,
    refereeId: EntityId,
    title: string,
    deadline: string
}): {
    aggregate: Challenge,
    events: Array<any>
} => ({
    aggregate: {
        id: entityIdService.createEntityId(),
        ownerId,
        opponentId,
        refereeId,
        title,
        deadline,
        version: 0
    },
    events: []
});

module.exports = {
    create
}
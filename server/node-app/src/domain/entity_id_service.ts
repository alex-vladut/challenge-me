const uuidv4 = require('uuid/v4');
import EntityId from './entity_id';

const createEntityId = (): EntityId => uuidv4();

export default {
    createEntityId
};
import { Create } from "../store/actions/notifications.actions";

export type Level = "success" | "error";

export const createNotification = (message: string, level: Level = "error") => Create.create({ message, level });

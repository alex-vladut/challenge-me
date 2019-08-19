import { action, actionWithoutPayload, payload } from "./actions";

export const FetchChallenges = actionWithoutPayload("FETCH_CHALLENGES");
export const FetchChallengesSuccess = action("FETCH_CHALLENGES_SUCCESS", payload<any>());
export const FetchChallengesFail = action("FETCH_CHALLENGES_FAIL", payload<any>());

export const FetchChallenge = action("FETCH_CHALLENGE", payload<string>());
export const FetchChallengeSuccess = action("FETCH_CHALLENGE_SUCCESS", payload<any>());
export const FetchChallengeFail = action("FETCH_CHALLENGE_FAIL", payload<any>());

export const AcceptChallenge = action("ACCEPT_CHALLENGE", payload<any>());
export const AcceptChallengeSuccess = action("ACCEPT_CHALLENGE_SUCCESS", payload<any>());
export const AcceptChallengeFail = action("ACCEPT_CHALLENGE_FAIL", payload<any>());

export const RejectChallenge = action("REJECT_CHALLENGE", payload<any>());
export const RejectChallengeSuccess = action("REJECT_CHALLENGE_SUCCESS", payload<any>());
export const RejectChallengeFail = action("REJECT_CHALLENGE_FAIL", payload<any>());

export const SetChallengeWinner = action("SET_CHALLENGE_WINNER", payload<any>());
export const SetChallengeWinnerSuccess = action("SET_CHALLENGE_WINNER_SUCCESS", payload<any>());
export const SetChallengeWinnerFail = action("SET_CHALLENGE_WINNER_FAIL", payload<any>());

export const CreateChallengeInit = actionWithoutPayload("CREATE_CHALLENGE_INIT");
export const CreateChallenge = action("CREATE_CHALLENGE", payload<any>());
export const CreateChallengeSuccess = action("CREATE_CHALLENGE_SUCCESS", payload<any>());
export const CreateChallengeFail = action("CREATE_CHALLENGE_FAIL", payload<any>());

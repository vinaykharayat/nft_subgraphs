import {
  ClaimRewards as ClaimRewardsEvent,
} from "../generated/BIBK/BIBK"
import { User } from "../generated/schema"

export function handleClaimRewards(event: ClaimRewardsEvent):void {
  let user = User.load(event.params.claimer.toHexString());
  if(user && event.params.earnedRewards.isI32()) {
    user.rewardsByBibkStaking += event.params.earnedRewards.toI32();
    user.save();
  }
}
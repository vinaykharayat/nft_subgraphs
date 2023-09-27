import {
  ClaimRewards as ClaimRewardsEvent,
} from "../generated/BIBK/BIBK"
import { User } from "../generated/schema"

export function handleClaimRewards(event: ClaimRewardsEvent):void {
  let user = User.load(event.params.claimer.toHexString());
  if(user) {
    user.rewardsByBibkStaking = user.rewardsByBibkStaking.plus(event.params.earnedRewards);
    user.save();
  }
}
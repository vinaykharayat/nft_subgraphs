import {
  ClaimRewards as ClaimRewardsEvent,
  Staked as StakedEvent,
  Transfer as TransferEvent,
  Unstaked as UnstakedEvent
} from "../generated/binaryblock/binaryblock"
import { BinaryBlockGenesis, User } from "../generated/schema";

export function handleStaked(event: StakedEvent): void {
  let binaryBlockGenesis = BinaryBlockGenesis.load(event.params.tokenId.toString());
  binaryBlockGenesis!.staked = true;
  binaryBlockGenesis!.stakedBy = event.params.from.toHexString();
  binaryBlockGenesis!.save();
}

export function handleTransfer(event: TransferEvent): void {
  let binaryBlockGenesis = BinaryBlockGenesis.load(event.params.tokenId.toString());
  if(!binaryBlockGenesis) {
    binaryBlockGenesis = new BinaryBlockGenesis(event.params.tokenId.toString());
    if(event.params.tokenId.isI32()) {
      binaryBlockGenesis.tokenId = event.params.tokenId.toI32();
    } else {
      binaryBlockGenesis.tokenId = 0;
    }
    binaryBlockGenesis.creator = event.params.to.toHexString();
    binaryBlockGenesis.createdAtTimestamp = event.block.timestamp;
    binaryBlockGenesis.staked = false;
    binaryBlockGenesis.totalEarnedRewards = 0;
    // let binaryBlockGenesisContract = BinaryBlockGenesisContract.bind(event.address);
    // log.debug("tokenURI {}", [binaryBlockGenesisContract.tokenURI(event.params.tokenId)]);
    // binaryBlockGenesis.contentUri = binaryBlockGenesisContract.tokenURI(event.params.tokenId);
  }
  binaryBlockGenesis.owner = event.params.to.toHexString();
  binaryBlockGenesis.save();

  let user = User.load(event.params.to.toHexString());
  if(!user) {
    user = new User(event.params.to.toHexString());
    user.rewardsByBibkStaking = 0;
    user.rewardsByNftStaking = 0;
    user.save();
  }
}

export function handleUnstaked(event: UnstakedEvent): void {
  let binaryBlockGenesis = BinaryBlockGenesis.load(event.params.tokenId.toString());
  if(binaryBlockGenesis) {
    binaryBlockGenesis.staked = false;
    binaryBlockGenesis.stakedBy = null;
    binaryBlockGenesis.save();
  }  
}

export function handleClaimRewards(event: ClaimRewardsEvent): void {
  let binaryBlockGenesis = BinaryBlockGenesis.load(event.params.tokenId.toString());
  if(binaryBlockGenesis && event.params.claimedRewards.isI32()) {
    binaryBlockGenesis.totalEarnedRewards += event.params.claimedRewards.toI32();
    binaryBlockGenesis.save();
  } 
  
  let user = User.load(event.params.claimer.toHexString());
  if(user && event.params.claimedRewards.isI32()) {
    user.rewardsByNftStaking += event.params.claimedRewards.toI32();
    user.save();
  }
}

import { ethereum } from "@graphprotocol/graph-ts";
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
    binaryBlockGenesis.totalEarnedRewards = ethereum.Value.fromI32(0).toBigInt();
    // let binaryBlockGenesisContract = BinaryBlockGenesisContract.bind(event.address);
    // log.debug("tokenURI {}", [binaryBlockGenesisContract.tokenURI(event.params.tokenId)]);
    // binaryBlockGenesis.contentUri = binaryBlockGenesisContract.tokenURI(event.params.tokenId);
  }
  binaryBlockGenesis.owner = event.params.to.toHexString();
  binaryBlockGenesis.save();

  let user = User.load(event.params.to.toHexString());
  if(!user) {
    user = new User(event.params.to.toHexString());
    user.rewardsByBibkStaking = ethereum.Value.fromI32(0).toBigInt();
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
  if(binaryBlockGenesis) {
    binaryBlockGenesis.totalEarnedRewards = binaryBlockGenesis.totalEarnedRewards.plus(event.params.claimedRewards);
    binaryBlockGenesis.save();
  } 
}

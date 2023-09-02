import {
  Transfer as TransferEvent,
  BinaryBlock_Genesis as BinaryBlockGenesisContract
} from "../generated/BinaryBlock_Genesis/BinaryBlock_Genesis";
import {
  BinaryBlockGenesis,
  User
} from "../generated/schema";

export function handleTransfer(event: TransferEvent): void {
  let binaryBlockGenesis = BinaryBlockGenesis.load(event.params.tokenId.toString());
  if(!binaryBlockGenesis) {
    binaryBlockGenesis = new BinaryBlockGenesis(event.params.tokenId.toString());
    binaryBlockGenesis.tokenId = event.params.tokenId;
    binaryBlockGenesis.creator = event.params.to.toHexString();
    binaryBlockGenesis.createdAtTimestamp = event.block.timestamp;
    
    let binaryBlockGenesisContract = BinaryBlockGenesisContract.bind(event.address);
    binaryBlockGenesis.contentUri = binaryBlockGenesisContract.tokenURI(event.params.tokenId);
  }
  binaryBlockGenesis.owner = event.params.to.toHexString();
  binaryBlockGenesis.save();

  let user = User.load(event.params.to.toHexString());
  if(!user) {
    user = new User(event.params.to.toHexString());
    user.save();
  }
}

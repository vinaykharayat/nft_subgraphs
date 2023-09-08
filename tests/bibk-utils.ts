import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  AddedAllowedContract,
  Approval,
  ClaimRewards,
  OwnershipTransferred,
  Purchase,
  RemovedAllowedContract,
  Sell,
  Staked,
  Transfer,
  Unlocked,
  Unstaked,
  UpdatePrice
} from "../generated/BIBK/BIBK"

export function createAddedAllowedContractEvent(
  _address: Address
): AddedAllowedContract {
  let addedAllowedContractEvent = changetype<AddedAllowedContract>(
    newMockEvent()
  )

  addedAllowedContractEvent.parameters = new Array()

  addedAllowedContractEvent.parameters.push(
    new ethereum.EventParam("_address", ethereum.Value.fromAddress(_address))
  )

  return addedAllowedContractEvent
}

export function createApprovalEvent(
  owner: Address,
  spender: Address,
  value: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("spender", ethereum.Value.fromAddress(spender))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return approvalEvent
}

export function createClaimRewardsEvent(
  claimer: Address,
  earnedRewards: BigInt
): ClaimRewards {
  let claimRewardsEvent = changetype<ClaimRewards>(newMockEvent())

  claimRewardsEvent.parameters = new Array()

  claimRewardsEvent.parameters.push(
    new ethereum.EventParam("claimer", ethereum.Value.fromAddress(claimer))
  )
  claimRewardsEvent.parameters.push(
    new ethereum.EventParam(
      "earnedRewards",
      ethereum.Value.fromUnsignedBigInt(earnedRewards)
    )
  )

  return claimRewardsEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPurchaseEvent(
  buyer: Address,
  amount: BigInt,
  price: BigInt
): Purchase {
  let purchaseEvent = changetype<Purchase>(newMockEvent())

  purchaseEvent.parameters = new Array()

  purchaseEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  purchaseEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  purchaseEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return purchaseEvent
}

export function createRemovedAllowedContractEvent(
  _address: Address
): RemovedAllowedContract {
  let removedAllowedContractEvent = changetype<RemovedAllowedContract>(
    newMockEvent()
  )

  removedAllowedContractEvent.parameters = new Array()

  removedAllowedContractEvent.parameters.push(
    new ethereum.EventParam("_address", ethereum.Value.fromAddress(_address))
  )

  return removedAllowedContractEvent
}

export function createSellEvent(
  seller: Address,
  amount: BigInt,
  price: BigInt
): Sell {
  let sellEvent = changetype<Sell>(newMockEvent())

  sellEvent.parameters = new Array()

  sellEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  sellEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  sellEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return sellEvent
}

export function createStakedEvent(from: Address, amount: BigInt): Staked {
  let stakedEvent = changetype<Staked>(newMockEvent())

  stakedEvent.parameters = new Array()

  stakedEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  stakedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return stakedEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  value: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return transferEvent
}

export function createUnlockedEvent(
  messageUnlocked: string,
  amountUnlocked: BigInt
): Unlocked {
  let unlockedEvent = changetype<Unlocked>(newMockEvent())

  unlockedEvent.parameters = new Array()

  unlockedEvent.parameters.push(
    new ethereum.EventParam(
      "messageUnlocked",
      ethereum.Value.fromString(messageUnlocked)
    )
  )
  unlockedEvent.parameters.push(
    new ethereum.EventParam(
      "amountUnlocked",
      ethereum.Value.fromUnsignedBigInt(amountUnlocked)
    )
  )

  return unlockedEvent
}

export function createUnstakedEvent(from: Address, amount: BigInt): Unstaked {
  let unstakedEvent = changetype<Unstaked>(newMockEvent())

  unstakedEvent.parameters = new Array()

  unstakedEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  unstakedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return unstakedEvent
}

export function createUpdatePriceEvent(
  priceType: string,
  oldPrice: BigInt,
  newPrice: BigInt
): UpdatePrice {
  let updatePriceEvent = changetype<UpdatePrice>(newMockEvent())

  updatePriceEvent.parameters = new Array()

  updatePriceEvent.parameters.push(
    new ethereum.EventParam("priceType", ethereum.Value.fromString(priceType))
  )
  updatePriceEvent.parameters.push(
    new ethereum.EventParam(
      "oldPrice",
      ethereum.Value.fromUnsignedBigInt(oldPrice)
    )
  )
  updatePriceEvent.parameters.push(
    new ethereum.EventParam(
      "newPrice",
      ethereum.Value.fromUnsignedBigInt(newPrice)
    )
  )

  return updatePriceEvent
}

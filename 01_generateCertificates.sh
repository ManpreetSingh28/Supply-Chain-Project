# Generate crypto materials for organizations (orderer and peer)

echo "============================== Generating Crypto Material (Certificates) =============================="
./bin/cryptogen generate --config=./crypto-config.yaml
if [ "$?" -ne 0 ]; then
    echo "Failed to generate Crypto Material"
    exit 1
fi

echo "=========================== Changing _sk file to key ============================"
find $PWD -type f -name *_sk -execdir mv {} key \;

# Generate Genesis Block

export FABRIC_CFG_PATH=$PWD
export SYS_CHANNEL=byfn-sys-channel
mkdir channel-artifacts
echo "============================== Generating Genesis Block =============================="
./bin/configtxgen -profile SampleMultiNodeEtcdRaft -outputBlock ./channel-artifacts/genesis.block -channelID $SYS_CHANNEL
if [ "$?" -ne 0 ]; then
    echo "Failed to generate Genesis Block"
    exit 1
fi

# Generate Channel Tx

export CHANNEL_NAME=mychannel
echo "================================ Generating Channel Tx ================================"
./bin/configtxgen -profile MultiOrgsChannel -outputCreateChannelTx ./channel-artifacts/channel.tx -channelID $CHANNEL_NAME
if [ "$?" -ne 0 ]; then
  echo "Failed to generate channel tx"
  exit 1
fi

# Generating Anchor Peer update for Org1

echo "================================ Generating Anchor Peer Update for Org1 ================================"
./bin/configtxgen -profile MultiOrgsChannel -outputAnchorPeersUpdate ./channel-artifacts/Org1MSPanchors.tx -channelID $CHANNEL_NAME -asOrg Org1MSP
if [ "$?" -ne 0 ]; then
  echo "Failed to update Anchor peers for Org1"
  exit 1
fi

# Generating Anchor Peer update for Org2

echo "================================ Generating Anchor Peer Update for Org2 ================================"
./bin/configtxgen -profile MultiOrgsChannel -outputAnchorPeersUpdate ./channel-artifacts/Org2MSPanchors.tx -channelID $CHANNEL_NAME -asOrg Org2MSP
if [ "$?" -ne 0 ]; then
  echo "Failed to update Anchor peers for Org2"
  exit 1
fi

# Generating Anchor Peer update for Org3

echo "================================ Generating Anchor Peer Update for Org3 ================================"
./bin/configtxgen -profile MultiOrgsChannel -outputAnchorPeersUpdate ./channel-artifacts/Org3MSPanchors.tx -channelID $CHANNEL_NAME -asOrg Org3MSP
if [ "$?" -ne 0 ]; then
  echo "Failed to update Anchor peers for Org3"
  exit 1
fi

# Generating Anchor Peer update for Org4

echo "================================ Generating Anchor Peer Update for Org4 ================================"
./bin/configtxgen -profile MultiOrgsChannel -outputAnchorPeersUpdate ./channel-artifacts/Org4MSPanchors.tx -channelID $CHANNEL_NAME -asOrg Org4MSP
if [ "$?" -ne 0 ]; then
  echo "Failed to update Anchor peers for Org4"
  exit 1
fi
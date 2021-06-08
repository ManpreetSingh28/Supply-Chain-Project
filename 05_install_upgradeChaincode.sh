export VERSION="$1"
export CHANNEL_NAME="$2"

echo "==================================================== Installing Chaincode on Peer0 Org1  ============================================================= "
# Install chiancode on peer0.org1.example.com
docker exec -e "CORE_PEER_LOCALMSPID=Org1MSP" -e "CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp" -e "CORE_PEER_ADDRESS=peer0.org1.example.com:7051" -e "CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" cli  peer chaincode install -n cc1 -v "${VERSION}" -l node -p /opt/gopath/src/github.com/chaincode/chaincode_example02/node/

echo "==================================================== Installing Chaincode on Peer0 Org2  ============================================================= "
# Install chaincode on peer0.org2.example.com.com
docker exec -e "CORE_PEER_LOCALMSPID=Org2MSP" -e "CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp" -e "CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" -e "CORE_PEER_ADDRESS=peer0.org2.example.com:9051" cli  peer chaincode install -n cc1 -v "${VERSION}" -l node -p /opt/gopath/src/github.com/chaincode/chaincode_example02/node/

echo "==================================================== Installing Chaincode on Peer0 Org3  ============================================================= "
# Install chaincode on peer0.org3.example.com.com
docker exec -e "CORE_PEER_LOCALMSPID=Org3MSP" -e "CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.example.com/users/Admin@org3.example.com/msp" -e "CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.example.com/peers/peer0.org3.example.com/tls/ca.crt" -e "CORE_PEER_ADDRESS=peer0.org3.example.com:11051" cli  peer chaincode install -n cc1 -v "${VERSION}" -l node -p /opt/gopath/src/github.com/chaincode/chaincode_example02/node/

echo "==================================================== Installing Chaincode on Peer0 Org4  ============================================================= "
# Install chaincode on peer0.org3.example.com.com
docker exec -e "CORE_PEER_LOCALMSPID=Org4MSP" -e "CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org4.example.com/users/Admin@org4.example.com/msp" -e "CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org4.example.com/peers/peer0.org4.example.com/tls/ca.crt" -e "CORE_PEER_ADDRESS=peer0.org4.example.com:13051" cli  peer chaincode install -n cc1 -v "${VERSION}" -l node -p /opt/gopath/src/github.com/chaincode/chaincode_example02/node/

echo "==================================================== Upgrading Chaincode from Peer0 Org1  ============================================================ "
# Upgrading chiancode from peer0.org1.example.com
docker exec -e "CORE_PEER_LOCALMSPID=Org1MSP" -e "CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp" -e "CORE_PEER_ADDRESS=peer0.org1.example.com:7051" -e "CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" cli  peer chaincode upgrade -o orderer.example.com:7050 --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C "${CHANNEL_NAME}" -n cc1 -l node -v "${VERSION}" -c '{"Args":["init","a", "100", "b","200"]}' -P "OR ('Org1MSP.peer','Org2MSP.peer')"

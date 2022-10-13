/**
 *
 * Copyright (c) 2022 - FuixLabs
 *
 * @author Tran Quoc Khang / tkhang@ferdon.io
 */

const MS = require('@emurgo/cardano-message-signing-nodejs');
const S = require('@emurgo/cardano-serialization-lib-nodejs');

/**
 * Copied from https://github.com/Berry-Pool/nami-wallet/blob/main/MessageSigning.md
 * @param {string} address - hex encoded
 * @param {string} payload - hex encoded
 * @param {string} coseSign1Hex - hex encoded
 */
const verify = (address, payload, coseSign1Hex) => {
    const coseSign1 = MS.COSESign1.from_bytes(Buffer.from(coseSign1Hex, 'hex'));
    const payloadCose = coseSign1.payload();
    if (!verifyPayload(payload, payloadCose)) {
        throw new Error('Payload does not match');
    }
    const protectedHeaders = coseSign1.headers().protected().deserialized_headers();
    const addressCose = S.Address.from_bytes(protectedHeaders.header(MS.Label.new_text('address')).as_bytes());
    const publicKeyCose = S.PublicKey.from_bytes(protectedHeaders.key_id());
    if (!verifyAddress(address, addressCose, publicKeyCose)) {
        throw new Error('Could not verify because of address mismatch');
    }
    const signature = S.Ed25519Signature.from_bytes(coseSign1.signature());
    const data = coseSign1.signed_data().to_bytes();
    return publicKeyCose.verify(data, signature);
};

// Modified by tkhang@ferdon.io
const verifyPayload = (payload, payloadCose) => {
    // return Buffer.from(payloadCose, 'hex').compare(Buffer.from(payload, 'hex'));
    const hexMessage = Buffer.from(payloadCose, 'hex').toString();
    return hexMessage == payload;
};

const verifyAddress = (address, addressCose, publicKeyCose) => {
    const checkAddress = S.Address.from_bytes(Buffer.from(address, 'hex'));
    if (addressCose.to_bech32() !== checkAddress.to_bech32()) return false;
    // Check if BaseAddress
    try {
        const baseAddress = S.BaseAddress.from_address(addressCose);
        // Reconstruct address
        const paymentKeyHash = publicKeyCose.hash();
        const stakeKeyHash = baseAddress.stake_cred().to_keyhash();
        const reconstructedAddress = S.BaseAddress.new(
            checkAddress.network_id(),
            S.StakeCredential.from_keyhash(paymentKeyHash),
            S.StakeCredential.from_keyhash(stakeKeyHash)
        );
        if (checkAddress.to_bech32() !== reconstructedAddress.to_address().to_bech32()) {
            return false;
        }
        return true;
    } catch (e) {}
    // Check if RewardAddress
    try {
        // Reconstruct address
        const stakeKeyHash = publicKeyCose.hash();
        const reconstructedAddress = S.RewardAddress.new(
            checkAddress.network_id(),
            S.StakeCredential.from_keyhash(stakeKeyHash)
        );
        if (checkAddress.to_bech32() !== reconstructedAddress.to_address().to_bech32()) {
            return false;
        }
        return true;
    } catch (e) {}
    return false;
};

const getAddressFromHexEncoded = (hexAddress) => {
    return S.Address.from_bytes(Buffer.from(hexAddress, 'hex')).to_bech32();
};

const verifySignedMessage = (address, payload, signedMessage) => {
    let result = false;
    try {
        result = verify(address, payload, signedMessage);
    } catch (error) {
        result = false;
    }
    return result;
};

module.exports = {
    getAddressFromHexEncoded,
    verifySignedMessage,
};

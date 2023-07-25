import * as crypto from "expo-crypto";

const Crypto = {
    generateRandomUUID: () => {
        return crypto.randomUUID()
    }
}

export default Crypto;



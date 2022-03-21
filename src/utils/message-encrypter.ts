import forge from "node-forge";
import { Buffer } from "buffer";
export class MessageEncrypter {
  private key: string;
  private iv: string;
  constructor(key: string, iv: string) {
    this.key = key;
    this.iv = iv;
  }

  encrypt(data: string): string {
    const cipher = forge.cipher.createCipher("AES-CBC", this.key);
    cipher.start({ iv: this.iv });
    cipher.update(forge.util.createBuffer(data));
    cipher.finish();
    const encrypted = cipher.output;
    return Buffer.from(encrypted.toHex(), "hex").toString("base64");
  }

  decrypt(data: string): string {
    const decipher = forge.cipher.createDecipher("AES-CBC", this.key);
    decipher.start({ iv: this.iv });
    decipher.update(forge.util.createBuffer(Buffer.from(data, "base64")));
    const result = decipher.finish();
    return decipher.output.toString();
  }
}

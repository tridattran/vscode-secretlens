export interface ISecretLensFunction {
    encrypt(inputText: string, cryptoMetho: string): string;
    decrypt(inputText: string): string;
    askPassword(): void;
    shouldAskForPassword: boolean;
}

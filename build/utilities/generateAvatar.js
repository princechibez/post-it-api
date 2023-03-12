"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// @_learnable
const avatarStyles = [
    'adventurer',
    'adventurer-neutral',
    'avataaars',
    'avataaars-neutral',
    'big-ears',
    'big-ears-neutral',
    'big-smile',
    'bottts',
    'bottts-neutral',
    'croodles',
    'croodles-neutral',
    'fun-emoji',
    'icons',
    'identicon',
    'initials',
    'lorelei',
    'lorelei-neutral',
    'micah',
    'miniavs',
    'open-peeps',
    'personas',
    'pixel-art',
    'pixel-art-neutral',
    'shapes',
    'thumbs'
];
const getRandomAvatarStyle = () => {
    // Your code here
    return avatarStyles[Math.floor(Math.random() * avatarStyles.length)];
};
const generateRandomAvatar = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const _email = email.replaceAll(' ', '');
    const isValidEmail = emailRegex.test(_email);
    if (!isValidEmail) {
        throw new Error('Invalid email');
    }
    const entropySource = () => Math.random().toString(36).substring(2, 7);
    const replaceAt = `-${entropySource()}-`;
    const replaceDot = `-${entropySource()}-`;
    const seed = _email.replace('@', replaceAt).replaceAll('.', replaceDot);
    const randomAvatarStyle = getRandomAvatarStyle();
    if (!randomAvatarStyle || !avatarStyles.includes(randomAvatarStyle)) {
        throw Error('Invalid avatar style'); // log this error to the console
    }
    const avatarUrl = `https://api.dicebear.com/5.x/${randomAvatarStyle}/svg?seed=${seed}&size=200&radius=50`;
    const imgageTag = `<img src="${avatarUrl}" alt="Avatar image for profile picture" />`;
    return { avatarUrl, imgageTag };
});
// @_learnable
exports.default = generateRandomAvatar;

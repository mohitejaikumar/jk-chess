import { atom } from "recoil";
import {teamType} from "@repo/models";


export const myTeam = atom<teamType|null>({
    key:"myTeam",
    default:null
})
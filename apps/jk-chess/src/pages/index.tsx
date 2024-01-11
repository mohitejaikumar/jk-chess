import { useSetRecoilState } from "recoil"
import { myTeam } from "../../store/atoms/myTeam"
import { teamType } from "@repo/models";
import { useRouter } from "next/router";




export default function TeamSelection(){
    const setmyTeam = useSetRecoilState(myTeam);
    const router = useRouter();
    return (
       <input type="text" onChange={(e)=>{
        if(e.target.value === 'white'){
            setmyTeam(teamType.WHITE);
            router.push("/MainPage");
        }
        if(e.target.value === 'black'){
            setmyTeam(teamType.BLACK);
            router.push("/MainPage");
        }
       }}/>
    )
}
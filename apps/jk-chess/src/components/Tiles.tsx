
interface Props {
    number: number;
    image?: string;
    highlight: boolean;
}
export default function Tiles(props: Props) {

    const classname: string = ['tile',
        props.number % 2 !== 0 && 'black-tile',
        props.number % 2 == 0 && 'white-tile',
        props.highlight && 'tile-highlight',
        props.image && 'chess-piece-tile'].filter(Boolean).join(' ');
    
    return <div className= {classname}>
        {props.image && <div style={{ backgroundImage: `url(${props.image})` }} className='chess-piece'></div>}
    </div>

}